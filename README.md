# PharmaSaaS - 薬局・店舗向けマルチテナントSaaS管理プラットフォーム

PharmaSaaS は、薬局や店舗における「在庫管理」「来店予測（需要予測）」「LINE BOT連携」をひとつのシステムで行うことができる、高性能なマルチテナントSaaS型プラットフォームです。

## 🌟 主な特徴と改修ポイント

1. **DB-per-Tenant（SQLite動的分離）**
   - テナントごとに独立した SQLite データベースファイル（`/data/tenants/[tenantId]/dev.db`）を自動的に作成・分離します。データ流出リスクを根本から遮断し、完全なデータ分離を実現しています。
2. **パスベースURL分離**
   - 1つのアプリケーションで全テナントを処理します。URLは `/tenant/[tenantId]/dashboard` の形で分かりやすく分離されます。
3. **スーパー管理者画面（日本語）**
   - 環境変数で認証する安心のスーパー管理者画面（`/admin`）から、直感的にテナントの「追加」「一時停止（無効化）」「完全削除」が行えます。追加時にはデータベーススキーマの構築と初期管理者ユーザーが自動登録されます。
4. **小数点在庫 ＆ マイナス在庫対応**
   - 在庫数・仕入れ数・実売数において小数点以下2桁の数値に対応。グラム（g）やミリリットル（ml）などの単位にも対応し、マイナス値も許容するように設計されています。
5. **周期0による「来店不要（非アクティブ）」フラグ**
   - 顧客ごとに来店予定の周期繰り返し表示を行います。来店不要な顧客（手動売上用の一般顧客など）は周期を「0」に設定することで、カレンダー表示や需要予測から完璧に除外されます。
6. **希望商品の訂正（追加・更新・削除）UI**
   - 顧客との「希望商品紐付け」画面にて、既存の希望数量を直接その場で訂正したり、紐付けを削除したりできる直感的なUIを新規実装しました。
7. **カレンダー基準日シフト機能**
   - カレンダー画面に「前週へ」「翌週へ」「今週に戻る」ボタンを配置し、基準日を1週間単位で前後させて未来や過去のスケジュールをいつでも確認できるようにしました。
8. **LINE BOT 接続の確実化**
   - 1つのプロセスで各テナント固有の LINE BOT 認証情報を `systemDb` から動的にルックアップして応答します。
   - Webhook 処理エラー時の自動再試行機能（2回リトライ）、Webhook一時停止を防ぐエラー処理、および `/health` によるヘルスチェックエンドポイントを提供しています。

---

## 🛠 ディレクトリ構成

```
pharmacy-saas/
├── apps/
│   ├── web/               # Next.js 15 Webポータル（管理者・テナント画面）
│   └── linebot/           # LINE BOT Express サーバー
├── scripts/
│   ├── create-tenant.js   # コマンドラインからの新規テナント追加
│   └── migrate-existing.js# 既存の1店舗版 dev.db からのデータ移行
├── docker-compose.yml     # 統合コンテナオーケストレーション
└── README.md              # 本書（日本語）
```

---

## 🚀 ローカル起動方法

### 1. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成し、スーパー管理者のログイン情報を設定します。

```env
ADMIN_EMAIL=admin@pharmacy-saas.local
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=a_very_long_random_string_for_session_encryption_32chars
```

### 2. Docker Compose による一括起動

Docker Compose を使用して、Next.js アプリケーションと LINE BOT を一括ビルド・起動します。

```bash
docker-compose up -d --build
```

- **Webポータル**: `http://localhost:3000`
- **LINE BOT ゲートウェイ**: `http://localhost:3005`
- **データ領域**: ボリューム `saas-data-volume` を通じて `/data` ディレクトリが両コンテナにマウントされます。

---

## 🏬 テナントの追加方法

### 方法A: スーパー管理者ポータルから追加（推奨）

1. `http://localhost:3000/login` にアクセスします。
2. 環境変数に設定した `ADMIN_EMAIL` と `ADMIN_PASSWORD` を使用してログインします。
3. 自動的にスーパー管理者画面（`/admin`）に遷移します。
4. 「新規店舗（テナント）追加」フォームに店舗ID（スラッグ）、店舗名、初期管理者アカウント情報を入力し「店舗を作成して初期構築」ボタンをクリックします。
5. 数秒でテナント用データベースの構築、マイグレーションの実行、管理者アカウント登録がすべて自動完了します。

### 方法B: コマンドライン（CLI）から追加

サーバーコンソールから直接テナントを作成できます。

```bash
# 使い方: node scripts/create-tenant.js <店舗ID(slug)> <店舗表示名> <管理者メール> <パスワード> [<管理者名>]
node scripts/create-tenant.js yanagiya-pharmacy "柳屋薬局" admin@yanagiya.com password123 "柳屋 太郎"
```

---

## 💾 既存データの移行手順（SaaS化移行）

既存の「薬局向け在庫管理・来店予測アプリ（1店舗版）」で利用していた `dev.db` から、データを完全に引き継いでマルチテナントSaaSへ移行できます。

```bash
# 使い方: node scripts/migrate-existing.js <既存のdev.dbパス> <移行先店舗ID(slug)>
node scripts/migrate-existing.js ../demand-forecast-app/dev.db yanagiya-pharmacy
```

- **処理内容**:
  1. 移行先店舗が登録されていない場合、自動的にシステムDBへ初期登録されます。
  2. 既存の `Product` (在庫 Float), `Customer` (予定・周期), `CustomerRequirement`, `VisitRecord` (売上), `PurchaseRecord` (仕入れ), `DisposalRecord` (廃棄) のすべてのデータが新しい分離データベースへ安全にコピーされます。

---

## 💬 LINE BOT 連携方法

各テナントが独自の公式LINEアカウントを運用可能です。

### 1. Webhook URL の登録

各店舗の設定画面（`/tenant/[tenantId]/settings`）を開くと、その店舗固有の Webhook URL が表示されます。

```text
http://<あなたのドメインまたはIP>:3005/webhook/yanagiya-pharmacy
```

この URL を LINE Developers コンソールの **「Messaging API設定」** ＞ **「Webhook URL」** に登録し、**「Webhookの送信」をオン（Enabled）**に設定します。

### 2. アクセストークン・シークレットの設定

1. 店舗管理者のメール・パスワードで `http://localhost:3000/login` からログインします。
2. 左メニューの「LINE BOT設定」を開きます。
3. LINE Developers から取得した **Channel Secret** と **Channel Access Token（長期）** を入力して保存します。
4. これで、この店舗専用の LINE BOT 連携が即座に開始されます！

---

## 📈 LINE BOT 利用可能コマンド一覧

店舗の公式LINEアカウント宛に送信することで動作します。

- **疎通テスト**:
  - `こんにちは` -> 店舗名を含めた自動挨拶を返します。
- **欠品管理**:
  - `欠品` または `欠品リスト` -> 現在欠品中の商品リストを表示します。
  - `欠品登録 [商品名]` -> 指定された商品を欠品リストに記録します。
  - `欠品解消 [商品名]` -> 指定された商品をリストから消去します。
- **不動在庫**:
  - `不動在庫` -> 今後6ヶ月間、顧客予定に基づく需要予測が 0 である在庫あり商品の一覧を表示します。
- **来局・来店スケジュール**:
  - `来局` または `来局予定` -> 直近4週間（日曜始まり）のカレンダー（Flex Message形式）と予定リストをスマートに表示します。
  - `来局登録 [名前] [周期(日)]` -> 今日から指定された日数後に次回来店予定を自動計算して登録します。
  - `来局周期変更 [名前] [新周期(日)]` -> 周期を変更し、予定日を再計算します（周期を「0」にすると来店不要に設定されます）。
  - `来局削除 [名前]` -> 来店スケジュールから対象顧客を完全削除します。

---

## 🛡️ システム保守とトラブルシューティング

### LINE BOT ヘルスチェック

LINE BOT サーバーの稼働状態と System DB への接続状態を確認できます。
```bash
curl http://localhost:3005/health
# レスポンス例: {"status":"healthy","systemDb":"connected"}
```

### データベースの手動操作

コンテナに入って SQLite を操作する場合：
- **システムDB**: `sqlite3 /data/system/tenants.db`
- **テナントDB**: `sqlite3 /data/tenants/[テナントID]/dev.db`
