const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// テナントディレクトリ内の stock.json ファイルパスを取得
function getStockFilePath(tenantId) {
  const dataRoot = process.env.DATA_ROOT || '/data';
  return path.join(dataRoot, 'tenants', tenantId, 'stock.json');
}

// テナント用のDB接続を取得
function getTenantDb(tenantId) {
  const dataRoot = process.env.DATA_ROOT || '/data';
  const dbPath = path.join(dataRoot, 'tenants', tenantId, 'dev.db');
  return new Database(dbPath, { fileMustExist: true });
}

// 欠品リストの読込
function readStock(tenantId) {
  const filePath = getStockFilePath(tenantId);
  try {
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (error) {
    console.error(`Error reading stock for tenant ${tenantId}:`, error);
    return [];
  }
}

// 欠品リストの書込
function writeStock(tenantId, stockList) {
  const filePath = getStockFilePath(tenantId);
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(stockList, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing stock for tenant ${tenantId}:`, error);
    return false;
  }
}

// Floatを丸めるヘルパー
function formatFloat(value) {
  return parseFloat(value.toFixed(2)).toString();
}

/**
 * 在庫関連コマンドの処理
 */
async function handleStockMessage(text, tenantId) {
  if (!text) return null;

  const trimmedText = text.trim();

  // 1. 欠品登録
  const addMatch = trimmedText.match(/^(?:欠品登録|欠品追加)\s+(.+)$/);
  if (addMatch) {
    const itemName = addMatch[1].trim();
    if (!itemName) return '商品名を入力してください。例: 欠品登録 アムロジピン錠';
    
    const stockList = readStock(tenantId);
    if (stockList.includes(itemName)) {
      return `「${itemName}」は既に欠品リストに登録されています。`;
    }
    
    stockList.push(itemName);
    if (writeStock(tenantId, stockList)) {
      return `欠品リストに「${itemName}」を追加しました。`;
    } else {
      return '欠品データの保存に失敗しました。';
    }
  }

  // 2. 欠品解消
  const removeMatch = trimmedText.match(/^(?:欠品解消|欠品削除)\s+(.+)$/);
  if (removeMatch) {
    const itemName = removeMatch[1].trim();
    if (!itemName) return '商品名を入力してください。例: 欠品解消 アムロジピン錠';
    
    let stockList = readStock(tenantId);
    if (!stockList.includes(itemName)) {
      return `「${itemName}」は欠品リストにありません。`;
    }
    
    stockList = stockList.filter(item => item !== itemName);
    if (writeStock(tenantId, stockList)) {
      return `欠品リストから「${itemName}」を削除しました（解消済み）。`;
    } else {
      return '欠品データの保存に失敗しました。';
    }
  }

  // 3. 欠品リスト一覧表示
  if (trimmedText === '欠品リスト' || trimmedText === '欠品') {
    const stockList = readStock(tenantId);
    if (stockList.length === 0) {
      return '現在、欠品している商品はありません。';
    }
    const listStr = stockList.map((item, index) => `${index + 1}. ${item}`).join('\n');
    return `【現在欠品中の商品リスト】\n${listStr}\n\n※「欠品登録 [商品名]」で追加、「欠品解消 [商品名]」で削除できます。`;
  }

  // 4. 不動在庫
  if (trimmedText === '不動在庫') {
    let db;
    try {
      db = getTenantDb(tenantId);

      // 半年間 (180日) の期間定義
      const now = new Date();
      now.setUTCHours(0, 0, 0, 0);
      const startDate = new Date(now);
      const endDate = new Date(now);
      endDate.setDate(endDate.getDate() + 180);

      // 商品データの取得
      const products = db.prepare('SELECT * FROM "Product"').all();
      const deadStocks = [];

      for (const product of products) {
        // 在庫がないものは除外
        if (product.currentStock <= 0) continue;

        // この商品に対するすべての需要紐付けを取得
        const requirements = db.prepare(`
          SELECT cr.*, c.visitInterval, c.lastVisitDate, c.nextVisitDate 
          FROM "CustomerRequirement" cr
          JOIN "Customer" c ON cr.customerId = c.id
          WHERE cr.productId = ?
        `).all(product.id);

        let totalDemand = 0;

        for (const req of requirements) {
          const interval = req.visitInterval;

          // visitInterval = 0 (来店不要) は除外
          if (interval === 0) continue;

          // 繰り返しシミュレーション
          let tempVisitDate;
          if (req.lastVisitDate) {
            tempVisitDate = new Date(req.lastVisitDate);
            tempVisitDate.setUTCHours(0, 0, 0, 0);
            while (tempVisitDate < startDate) {
              tempVisitDate.setDate(tempVisitDate.getDate() + interval);
            }
          } else {
            tempVisitDate = new Date(req.nextVisitDate);
            tempVisitDate.setUTCHours(0, 0, 0, 0);
            if (tempVisitDate < startDate) {
              tempVisitDate = new Date(startDate);
            }
          }

          while (tempVisitDate <= endDate) {
            if (tempVisitDate >= startDate) {
              totalDemand += req.quantity;
            }
            tempVisitDate.setDate(tempVisitDate.getDate() + interval);
          }
        }

        if (totalDemand === 0) {
          deadStocks.push({
            name: product.name,
            stock: product.currentStock,
            unit: product.unit || '個'
          });
        }
      }

      if (deadStocks.length === 0) {
        return '現在、不動在庫はありません。在庫はすべて半年以内に使用される予定です。';
      }

      const listStr = deadStocks
        .map((item, index) => `${index + 1}. ${item.name} (在庫: ${formatFloat(item.stock)}${item.unit})`)
        .join('\n');

      return `【半年先まで需要予測のない不動在庫リスト】\n${listStr}\n\n※在庫があるにも関わらず、今後6ヶ月間顧客予定による使用予測がない商品です。`;

    } catch (error) {
      console.error(`Error in dead stock calc for tenant ${tenantId}:`, error);
      return '不動在庫の算出中にエラーが発生しました。';
    } finally {
      if (db) db.close();
    }
  }

  return null;
}

module.exports = {
  readStock,
  writeStock,
  handleStockMessage
};
