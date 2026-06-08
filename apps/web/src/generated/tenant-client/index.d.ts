
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model CustomerRequirement
 * 
 */
export type CustomerRequirement = $Result.DefaultSelection<Prisma.$CustomerRequirementPayload>
/**
 * Model PurchaseRecord
 * 
 */
export type PurchaseRecord = $Result.DefaultSelection<Prisma.$PurchaseRecordPayload>
/**
 * Model VisitRecord
 * 
 */
export type VisitRecord = $Result.DefaultSelection<Prisma.$VisitRecordPayload>
/**
 * Model VisitRecordItem
 * 
 */
export type VisitRecordItem = $Result.DefaultSelection<Prisma.$VisitRecordItemPayload>
/**
 * Model DisposalRecord
 * 
 */
export type DisposalRecord = $Result.DefaultSelection<Prisma.$DisposalRecordPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.customerRequirement`: Exposes CRUD operations for the **CustomerRequirement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerRequirements
    * const customerRequirements = await prisma.customerRequirement.findMany()
    * ```
    */
  get customerRequirement(): Prisma.CustomerRequirementDelegate<ExtArgs>;

  /**
   * `prisma.purchaseRecord`: Exposes CRUD operations for the **PurchaseRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PurchaseRecords
    * const purchaseRecords = await prisma.purchaseRecord.findMany()
    * ```
    */
  get purchaseRecord(): Prisma.PurchaseRecordDelegate<ExtArgs>;

  /**
   * `prisma.visitRecord`: Exposes CRUD operations for the **VisitRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VisitRecords
    * const visitRecords = await prisma.visitRecord.findMany()
    * ```
    */
  get visitRecord(): Prisma.VisitRecordDelegate<ExtArgs>;

  /**
   * `prisma.visitRecordItem`: Exposes CRUD operations for the **VisitRecordItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VisitRecordItems
    * const visitRecordItems = await prisma.visitRecordItem.findMany()
    * ```
    */
  get visitRecordItem(): Prisma.VisitRecordItemDelegate<ExtArgs>;

  /**
   * `prisma.disposalRecord`: Exposes CRUD operations for the **DisposalRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DisposalRecords
    * const disposalRecords = await prisma.disposalRecord.findMany()
    * ```
    */
  get disposalRecord(): Prisma.DisposalRecordDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Customer: 'Customer',
    Product: 'Product',
    CustomerRequirement: 'CustomerRequirement',
    PurchaseRecord: 'PurchaseRecord',
    VisitRecord: 'VisitRecord',
    VisitRecordItem: 'VisitRecordItem',
    DisposalRecord: 'DisposalRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "customer" | "product" | "customerRequirement" | "purchaseRecord" | "visitRecord" | "visitRecordItem" | "disposalRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      CustomerRequirement: {
        payload: Prisma.$CustomerRequirementPayload<ExtArgs>
        fields: Prisma.CustomerRequirementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerRequirementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerRequirementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload>
          }
          findFirst: {
            args: Prisma.CustomerRequirementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerRequirementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload>
          }
          findMany: {
            args: Prisma.CustomerRequirementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload>[]
          }
          create: {
            args: Prisma.CustomerRequirementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload>
          }
          createMany: {
            args: Prisma.CustomerRequirementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerRequirementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload>[]
          }
          delete: {
            args: Prisma.CustomerRequirementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload>
          }
          update: {
            args: Prisma.CustomerRequirementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload>
          }
          deleteMany: {
            args: Prisma.CustomerRequirementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerRequirementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerRequirementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerRequirementPayload>
          }
          aggregate: {
            args: Prisma.CustomerRequirementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerRequirement>
          }
          groupBy: {
            args: Prisma.CustomerRequirementGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerRequirementGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerRequirementCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerRequirementCountAggregateOutputType> | number
          }
        }
      }
      PurchaseRecord: {
        payload: Prisma.$PurchaseRecordPayload<ExtArgs>
        fields: Prisma.PurchaseRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload>
          }
          findFirst: {
            args: Prisma.PurchaseRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload>
          }
          findMany: {
            args: Prisma.PurchaseRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload>[]
          }
          create: {
            args: Prisma.PurchaseRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload>
          }
          createMany: {
            args: Prisma.PurchaseRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PurchaseRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload>[]
          }
          delete: {
            args: Prisma.PurchaseRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload>
          }
          update: {
            args: Prisma.PurchaseRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload>
          }
          deleteMany: {
            args: Prisma.PurchaseRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PurchaseRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseRecordPayload>
          }
          aggregate: {
            args: Prisma.PurchaseRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchaseRecord>
          }
          groupBy: {
            args: Prisma.PurchaseRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseRecordCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseRecordCountAggregateOutputType> | number
          }
        }
      }
      VisitRecord: {
        payload: Prisma.$VisitRecordPayload<ExtArgs>
        fields: Prisma.VisitRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VisitRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VisitRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload>
          }
          findFirst: {
            args: Prisma.VisitRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VisitRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload>
          }
          findMany: {
            args: Prisma.VisitRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload>[]
          }
          create: {
            args: Prisma.VisitRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload>
          }
          createMany: {
            args: Prisma.VisitRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VisitRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload>[]
          }
          delete: {
            args: Prisma.VisitRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload>
          }
          update: {
            args: Prisma.VisitRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload>
          }
          deleteMany: {
            args: Prisma.VisitRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VisitRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VisitRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordPayload>
          }
          aggregate: {
            args: Prisma.VisitRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVisitRecord>
          }
          groupBy: {
            args: Prisma.VisitRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<VisitRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.VisitRecordCountArgs<ExtArgs>
            result: $Utils.Optional<VisitRecordCountAggregateOutputType> | number
          }
        }
      }
      VisitRecordItem: {
        payload: Prisma.$VisitRecordItemPayload<ExtArgs>
        fields: Prisma.VisitRecordItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VisitRecordItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VisitRecordItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload>
          }
          findFirst: {
            args: Prisma.VisitRecordItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VisitRecordItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload>
          }
          findMany: {
            args: Prisma.VisitRecordItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload>[]
          }
          create: {
            args: Prisma.VisitRecordItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload>
          }
          createMany: {
            args: Prisma.VisitRecordItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VisitRecordItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload>[]
          }
          delete: {
            args: Prisma.VisitRecordItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload>
          }
          update: {
            args: Prisma.VisitRecordItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload>
          }
          deleteMany: {
            args: Prisma.VisitRecordItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VisitRecordItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VisitRecordItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VisitRecordItemPayload>
          }
          aggregate: {
            args: Prisma.VisitRecordItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVisitRecordItem>
          }
          groupBy: {
            args: Prisma.VisitRecordItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<VisitRecordItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.VisitRecordItemCountArgs<ExtArgs>
            result: $Utils.Optional<VisitRecordItemCountAggregateOutputType> | number
          }
        }
      }
      DisposalRecord: {
        payload: Prisma.$DisposalRecordPayload<ExtArgs>
        fields: Prisma.DisposalRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DisposalRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DisposalRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload>
          }
          findFirst: {
            args: Prisma.DisposalRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DisposalRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload>
          }
          findMany: {
            args: Prisma.DisposalRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload>[]
          }
          create: {
            args: Prisma.DisposalRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload>
          }
          createMany: {
            args: Prisma.DisposalRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DisposalRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload>[]
          }
          delete: {
            args: Prisma.DisposalRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload>
          }
          update: {
            args: Prisma.DisposalRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload>
          }
          deleteMany: {
            args: Prisma.DisposalRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DisposalRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DisposalRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisposalRecordPayload>
          }
          aggregate: {
            args: Prisma.DisposalRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDisposalRecord>
          }
          groupBy: {
            args: Prisma.DisposalRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisposalRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.DisposalRecordCountArgs<ExtArgs>
            result: $Utils.Optional<DisposalRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    requirements: number
    visitRecords: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requirements?: boolean | CustomerCountOutputTypeCountRequirementsArgs
    visitRecords?: boolean | CustomerCountOutputTypeCountVisitRecordsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountRequirementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerRequirementWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountVisitRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitRecordWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    requirements: number
    purchases: number
    visitItems: number
    disposals: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requirements?: boolean | ProductCountOutputTypeCountRequirementsArgs
    purchases?: boolean | ProductCountOutputTypeCountPurchasesArgs
    visitItems?: boolean | ProductCountOutputTypeCountVisitItemsArgs
    disposals?: boolean | ProductCountOutputTypeCountDisposalsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountRequirementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerRequirementWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountPurchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseRecordWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVisitItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitRecordItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountDisposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisposalRecordWhereInput
  }


  /**
   * Count Type VisitRecordCountOutputType
   */

  export type VisitRecordCountOutputType = {
    items: number
  }

  export type VisitRecordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | VisitRecordCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * VisitRecordCountOutputType without action
   */
  export type VisitRecordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordCountOutputType
     */
    select?: VisitRecordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VisitRecordCountOutputType without action
   */
  export type VisitRecordCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitRecordItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    visitInterval: number | null
  }

  export type CustomerSumAggregateOutputType = {
    visitInterval: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    nameKana: string | null
    visitInterval: number | null
    lastVisitDate: Date | null
    nextVisitDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nameKana: string | null
    visitInterval: number | null
    lastVisitDate: Date | null
    nextVisitDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    nameKana: number
    visitInterval: number
    lastVisitDate: number
    nextVisitDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    visitInterval?: true
  }

  export type CustomerSumAggregateInputType = {
    visitInterval?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    nameKana?: true
    visitInterval?: true
    lastVisitDate?: true
    nextVisitDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    nameKana?: true
    visitInterval?: true
    lastVisitDate?: true
    nextVisitDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    nameKana?: true
    visitInterval?: true
    lastVisitDate?: true
    nextVisitDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string
    nameKana: string
    visitInterval: number
    lastVisitDate: Date | null
    nextVisitDate: Date
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameKana?: boolean
    visitInterval?: boolean
    lastVisitDate?: boolean
    nextVisitDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requirements?: boolean | Customer$requirementsArgs<ExtArgs>
    visitRecords?: boolean | Customer$visitRecordsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameKana?: boolean
    visitInterval?: boolean
    lastVisitDate?: boolean
    nextVisitDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    nameKana?: boolean
    visitInterval?: boolean
    lastVisitDate?: boolean
    nextVisitDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requirements?: boolean | Customer$requirementsArgs<ExtArgs>
    visitRecords?: boolean | Customer$visitRecordsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      requirements: Prisma.$CustomerRequirementPayload<ExtArgs>[]
      visitRecords: Prisma.$VisitRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nameKana: string
      visitInterval: number
      lastVisitDate: Date | null
      nextVisitDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requirements<T extends Customer$requirementsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$requirementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "findMany"> | Null>
    visitRecords<T extends Customer$visitRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$visitRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */ 
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly nameKana: FieldRef<"Customer", 'String'>
    readonly visitInterval: FieldRef<"Customer", 'Int'>
    readonly lastVisitDate: FieldRef<"Customer", 'DateTime'>
    readonly nextVisitDate: FieldRef<"Customer", 'DateTime'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer.requirements
   */
  export type Customer$requirementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    where?: CustomerRequirementWhereInput
    orderBy?: CustomerRequirementOrderByWithRelationInput | CustomerRequirementOrderByWithRelationInput[]
    cursor?: CustomerRequirementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerRequirementScalarFieldEnum | CustomerRequirementScalarFieldEnum[]
  }

  /**
   * Customer.visitRecords
   */
  export type Customer$visitRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    where?: VisitRecordWhereInput
    orderBy?: VisitRecordOrderByWithRelationInput | VisitRecordOrderByWithRelationInput[]
    cursor?: VisitRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitRecordScalarFieldEnum | VisitRecordScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    currentStock: number | null
  }

  export type ProductSumAggregateOutputType = {
    currentStock: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    currentStock: number | null
    unit: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    currentStock: number | null
    unit: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    currentStock: number
    unit: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    currentStock?: true
  }

  export type ProductSumAggregateInputType = {
    currentStock?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    currentStock?: true
    unit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    currentStock?: true
    unit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    currentStock?: true
    unit?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    currentStock: number
    unit: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    currentStock?: boolean
    unit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requirements?: boolean | Product$requirementsArgs<ExtArgs>
    purchases?: boolean | Product$purchasesArgs<ExtArgs>
    visitItems?: boolean | Product$visitItemsArgs<ExtArgs>
    disposals?: boolean | Product$disposalsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    currentStock?: boolean
    unit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    currentStock?: boolean
    unit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requirements?: boolean | Product$requirementsArgs<ExtArgs>
    purchases?: boolean | Product$purchasesArgs<ExtArgs>
    visitItems?: boolean | Product$visitItemsArgs<ExtArgs>
    disposals?: boolean | Product$disposalsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      requirements: Prisma.$CustomerRequirementPayload<ExtArgs>[]
      purchases: Prisma.$PurchaseRecordPayload<ExtArgs>[]
      visitItems: Prisma.$VisitRecordItemPayload<ExtArgs>[]
      disposals: Prisma.$DisposalRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      currentStock: number
      unit: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requirements<T extends Product$requirementsArgs<ExtArgs> = {}>(args?: Subset<T, Product$requirementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "findMany"> | Null>
    purchases<T extends Product$purchasesArgs<ExtArgs> = {}>(args?: Subset<T, Product$purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "findMany"> | Null>
    visitItems<T extends Product$visitItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$visitItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "findMany"> | Null>
    disposals<T extends Product$disposalsArgs<ExtArgs> = {}>(args?: Subset<T, Product$disposalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly currentStock: FieldRef<"Product", 'Float'>
    readonly unit: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.requirements
   */
  export type Product$requirementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    where?: CustomerRequirementWhereInput
    orderBy?: CustomerRequirementOrderByWithRelationInput | CustomerRequirementOrderByWithRelationInput[]
    cursor?: CustomerRequirementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerRequirementScalarFieldEnum | CustomerRequirementScalarFieldEnum[]
  }

  /**
   * Product.purchases
   */
  export type Product$purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    where?: PurchaseRecordWhereInput
    orderBy?: PurchaseRecordOrderByWithRelationInput | PurchaseRecordOrderByWithRelationInput[]
    cursor?: PurchaseRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseRecordScalarFieldEnum | PurchaseRecordScalarFieldEnum[]
  }

  /**
   * Product.visitItems
   */
  export type Product$visitItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    where?: VisitRecordItemWhereInput
    orderBy?: VisitRecordItemOrderByWithRelationInput | VisitRecordItemOrderByWithRelationInput[]
    cursor?: VisitRecordItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitRecordItemScalarFieldEnum | VisitRecordItemScalarFieldEnum[]
  }

  /**
   * Product.disposals
   */
  export type Product$disposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    where?: DisposalRecordWhereInput
    orderBy?: DisposalRecordOrderByWithRelationInput | DisposalRecordOrderByWithRelationInput[]
    cursor?: DisposalRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisposalRecordScalarFieldEnum | DisposalRecordScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model CustomerRequirement
   */

  export type AggregateCustomerRequirement = {
    _count: CustomerRequirementCountAggregateOutputType | null
    _avg: CustomerRequirementAvgAggregateOutputType | null
    _sum: CustomerRequirementSumAggregateOutputType | null
    _min: CustomerRequirementMinAggregateOutputType | null
    _max: CustomerRequirementMaxAggregateOutputType | null
  }

  export type CustomerRequirementAvgAggregateOutputType = {
    quantity: number | null
    sortOrder: number | null
  }

  export type CustomerRequirementSumAggregateOutputType = {
    quantity: number | null
    sortOrder: number | null
  }

  export type CustomerRequirementMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    productId: string | null
    quantity: number | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerRequirementMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    productId: string | null
    quantity: number | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerRequirementCountAggregateOutputType = {
    id: number
    customerId: number
    productId: number
    quantity: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerRequirementAvgAggregateInputType = {
    quantity?: true
    sortOrder?: true
  }

  export type CustomerRequirementSumAggregateInputType = {
    quantity?: true
    sortOrder?: true
  }

  export type CustomerRequirementMinAggregateInputType = {
    id?: true
    customerId?: true
    productId?: true
    quantity?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerRequirementMaxAggregateInputType = {
    id?: true
    customerId?: true
    productId?: true
    quantity?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerRequirementCountAggregateInputType = {
    id?: true
    customerId?: true
    productId?: true
    quantity?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerRequirementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerRequirement to aggregate.
     */
    where?: CustomerRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerRequirements to fetch.
     */
    orderBy?: CustomerRequirementOrderByWithRelationInput | CustomerRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerRequirements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerRequirements
    **/
    _count?: true | CustomerRequirementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerRequirementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerRequirementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerRequirementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerRequirementMaxAggregateInputType
  }

  export type GetCustomerRequirementAggregateType<T extends CustomerRequirementAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerRequirement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerRequirement[P]>
      : GetScalarType<T[P], AggregateCustomerRequirement[P]>
  }




  export type CustomerRequirementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerRequirementWhereInput
    orderBy?: CustomerRequirementOrderByWithAggregationInput | CustomerRequirementOrderByWithAggregationInput[]
    by: CustomerRequirementScalarFieldEnum[] | CustomerRequirementScalarFieldEnum
    having?: CustomerRequirementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerRequirementCountAggregateInputType | true
    _avg?: CustomerRequirementAvgAggregateInputType
    _sum?: CustomerRequirementSumAggregateInputType
    _min?: CustomerRequirementMinAggregateInputType
    _max?: CustomerRequirementMaxAggregateInputType
  }

  export type CustomerRequirementGroupByOutputType = {
    id: string
    customerId: string
    productId: string
    quantity: number
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: CustomerRequirementCountAggregateOutputType | null
    _avg: CustomerRequirementAvgAggregateOutputType | null
    _sum: CustomerRequirementSumAggregateOutputType | null
    _min: CustomerRequirementMinAggregateOutputType | null
    _max: CustomerRequirementMaxAggregateOutputType | null
  }

  type GetCustomerRequirementGroupByPayload<T extends CustomerRequirementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerRequirementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerRequirementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerRequirementGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerRequirementGroupByOutputType[P]>
        }
      >
    >


  export type CustomerRequirementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    productId?: boolean
    quantity?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerRequirement"]>

  export type CustomerRequirementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    productId?: boolean
    quantity?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customerRequirement"]>

  export type CustomerRequirementSelectScalar = {
    id?: boolean
    customerId?: boolean
    productId?: boolean
    quantity?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerRequirementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CustomerRequirementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $CustomerRequirementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerRequirement"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      productId: string
      quantity: number
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customerRequirement"]>
    composites: {}
  }

  type CustomerRequirementGetPayload<S extends boolean | null | undefined | CustomerRequirementDefaultArgs> = $Result.GetResult<Prisma.$CustomerRequirementPayload, S>

  type CustomerRequirementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerRequirementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerRequirementCountAggregateInputType | true
    }

  export interface CustomerRequirementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerRequirement'], meta: { name: 'CustomerRequirement' } }
    /**
     * Find zero or one CustomerRequirement that matches the filter.
     * @param {CustomerRequirementFindUniqueArgs} args - Arguments to find a CustomerRequirement
     * @example
     * // Get one CustomerRequirement
     * const customerRequirement = await prisma.customerRequirement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerRequirementFindUniqueArgs>(args: SelectSubset<T, CustomerRequirementFindUniqueArgs<ExtArgs>>): Prisma__CustomerRequirementClient<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustomerRequirement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerRequirementFindUniqueOrThrowArgs} args - Arguments to find a CustomerRequirement
     * @example
     * // Get one CustomerRequirement
     * const customerRequirement = await prisma.customerRequirement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerRequirementFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerRequirementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerRequirementClient<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustomerRequirement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerRequirementFindFirstArgs} args - Arguments to find a CustomerRequirement
     * @example
     * // Get one CustomerRequirement
     * const customerRequirement = await prisma.customerRequirement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerRequirementFindFirstArgs>(args?: SelectSubset<T, CustomerRequirementFindFirstArgs<ExtArgs>>): Prisma__CustomerRequirementClient<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustomerRequirement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerRequirementFindFirstOrThrowArgs} args - Arguments to find a CustomerRequirement
     * @example
     * // Get one CustomerRequirement
     * const customerRequirement = await prisma.customerRequirement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerRequirementFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerRequirementFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerRequirementClient<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustomerRequirements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerRequirementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerRequirements
     * const customerRequirements = await prisma.customerRequirement.findMany()
     * 
     * // Get first 10 CustomerRequirements
     * const customerRequirements = await prisma.customerRequirement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerRequirementWithIdOnly = await prisma.customerRequirement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerRequirementFindManyArgs>(args?: SelectSubset<T, CustomerRequirementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustomerRequirement.
     * @param {CustomerRequirementCreateArgs} args - Arguments to create a CustomerRequirement.
     * @example
     * // Create one CustomerRequirement
     * const CustomerRequirement = await prisma.customerRequirement.create({
     *   data: {
     *     // ... data to create a CustomerRequirement
     *   }
     * })
     * 
     */
    create<T extends CustomerRequirementCreateArgs>(args: SelectSubset<T, CustomerRequirementCreateArgs<ExtArgs>>): Prisma__CustomerRequirementClient<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustomerRequirements.
     * @param {CustomerRequirementCreateManyArgs} args - Arguments to create many CustomerRequirements.
     * @example
     * // Create many CustomerRequirements
     * const customerRequirement = await prisma.customerRequirement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerRequirementCreateManyArgs>(args?: SelectSubset<T, CustomerRequirementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerRequirements and returns the data saved in the database.
     * @param {CustomerRequirementCreateManyAndReturnArgs} args - Arguments to create many CustomerRequirements.
     * @example
     * // Create many CustomerRequirements
     * const customerRequirement = await prisma.customerRequirement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerRequirements and only return the `id`
     * const customerRequirementWithIdOnly = await prisma.customerRequirement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerRequirementCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerRequirementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CustomerRequirement.
     * @param {CustomerRequirementDeleteArgs} args - Arguments to delete one CustomerRequirement.
     * @example
     * // Delete one CustomerRequirement
     * const CustomerRequirement = await prisma.customerRequirement.delete({
     *   where: {
     *     // ... filter to delete one CustomerRequirement
     *   }
     * })
     * 
     */
    delete<T extends CustomerRequirementDeleteArgs>(args: SelectSubset<T, CustomerRequirementDeleteArgs<ExtArgs>>): Prisma__CustomerRequirementClient<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustomerRequirement.
     * @param {CustomerRequirementUpdateArgs} args - Arguments to update one CustomerRequirement.
     * @example
     * // Update one CustomerRequirement
     * const customerRequirement = await prisma.customerRequirement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerRequirementUpdateArgs>(args: SelectSubset<T, CustomerRequirementUpdateArgs<ExtArgs>>): Prisma__CustomerRequirementClient<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustomerRequirements.
     * @param {CustomerRequirementDeleteManyArgs} args - Arguments to filter CustomerRequirements to delete.
     * @example
     * // Delete a few CustomerRequirements
     * const { count } = await prisma.customerRequirement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerRequirementDeleteManyArgs>(args?: SelectSubset<T, CustomerRequirementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerRequirements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerRequirementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerRequirements
     * const customerRequirement = await prisma.customerRequirement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerRequirementUpdateManyArgs>(args: SelectSubset<T, CustomerRequirementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustomerRequirement.
     * @param {CustomerRequirementUpsertArgs} args - Arguments to update or create a CustomerRequirement.
     * @example
     * // Update or create a CustomerRequirement
     * const customerRequirement = await prisma.customerRequirement.upsert({
     *   create: {
     *     // ... data to create a CustomerRequirement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerRequirement we want to update
     *   }
     * })
     */
    upsert<T extends CustomerRequirementUpsertArgs>(args: SelectSubset<T, CustomerRequirementUpsertArgs<ExtArgs>>): Prisma__CustomerRequirementClient<$Result.GetResult<Prisma.$CustomerRequirementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustomerRequirements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerRequirementCountArgs} args - Arguments to filter CustomerRequirements to count.
     * @example
     * // Count the number of CustomerRequirements
     * const count = await prisma.customerRequirement.count({
     *   where: {
     *     // ... the filter for the CustomerRequirements we want to count
     *   }
     * })
    **/
    count<T extends CustomerRequirementCountArgs>(
      args?: Subset<T, CustomerRequirementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerRequirementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerRequirement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerRequirementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerRequirementAggregateArgs>(args: Subset<T, CustomerRequirementAggregateArgs>): Prisma.PrismaPromise<GetCustomerRequirementAggregateType<T>>

    /**
     * Group by CustomerRequirement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerRequirementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerRequirementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerRequirementGroupByArgs['orderBy'] }
        : { orderBy?: CustomerRequirementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerRequirementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerRequirementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerRequirement model
   */
  readonly fields: CustomerRequirementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerRequirement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerRequirementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomerRequirement model
   */ 
  interface CustomerRequirementFieldRefs {
    readonly id: FieldRef<"CustomerRequirement", 'String'>
    readonly customerId: FieldRef<"CustomerRequirement", 'String'>
    readonly productId: FieldRef<"CustomerRequirement", 'String'>
    readonly quantity: FieldRef<"CustomerRequirement", 'Float'>
    readonly sortOrder: FieldRef<"CustomerRequirement", 'Int'>
    readonly createdAt: FieldRef<"CustomerRequirement", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomerRequirement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerRequirement findUnique
   */
  export type CustomerRequirementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CustomerRequirement to fetch.
     */
    where: CustomerRequirementWhereUniqueInput
  }

  /**
   * CustomerRequirement findUniqueOrThrow
   */
  export type CustomerRequirementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CustomerRequirement to fetch.
     */
    where: CustomerRequirementWhereUniqueInput
  }

  /**
   * CustomerRequirement findFirst
   */
  export type CustomerRequirementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CustomerRequirement to fetch.
     */
    where?: CustomerRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerRequirements to fetch.
     */
    orderBy?: CustomerRequirementOrderByWithRelationInput | CustomerRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerRequirements.
     */
    cursor?: CustomerRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerRequirements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerRequirements.
     */
    distinct?: CustomerRequirementScalarFieldEnum | CustomerRequirementScalarFieldEnum[]
  }

  /**
   * CustomerRequirement findFirstOrThrow
   */
  export type CustomerRequirementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CustomerRequirement to fetch.
     */
    where?: CustomerRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerRequirements to fetch.
     */
    orderBy?: CustomerRequirementOrderByWithRelationInput | CustomerRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerRequirements.
     */
    cursor?: CustomerRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerRequirements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerRequirements.
     */
    distinct?: CustomerRequirementScalarFieldEnum | CustomerRequirementScalarFieldEnum[]
  }

  /**
   * CustomerRequirement findMany
   */
  export type CustomerRequirementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    /**
     * Filter, which CustomerRequirements to fetch.
     */
    where?: CustomerRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerRequirements to fetch.
     */
    orderBy?: CustomerRequirementOrderByWithRelationInput | CustomerRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerRequirements.
     */
    cursor?: CustomerRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerRequirements.
     */
    skip?: number
    distinct?: CustomerRequirementScalarFieldEnum | CustomerRequirementScalarFieldEnum[]
  }

  /**
   * CustomerRequirement create
   */
  export type CustomerRequirementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomerRequirement.
     */
    data: XOR<CustomerRequirementCreateInput, CustomerRequirementUncheckedCreateInput>
  }

  /**
   * CustomerRequirement createMany
   */
  export type CustomerRequirementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerRequirements.
     */
    data: CustomerRequirementCreateManyInput | CustomerRequirementCreateManyInput[]
  }

  /**
   * CustomerRequirement createManyAndReturn
   */
  export type CustomerRequirementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CustomerRequirements.
     */
    data: CustomerRequirementCreateManyInput | CustomerRequirementCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomerRequirement update
   */
  export type CustomerRequirementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomerRequirement.
     */
    data: XOR<CustomerRequirementUpdateInput, CustomerRequirementUncheckedUpdateInput>
    /**
     * Choose, which CustomerRequirement to update.
     */
    where: CustomerRequirementWhereUniqueInput
  }

  /**
   * CustomerRequirement updateMany
   */
  export type CustomerRequirementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerRequirements.
     */
    data: XOR<CustomerRequirementUpdateManyMutationInput, CustomerRequirementUncheckedUpdateManyInput>
    /**
     * Filter which CustomerRequirements to update
     */
    where?: CustomerRequirementWhereInput
  }

  /**
   * CustomerRequirement upsert
   */
  export type CustomerRequirementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomerRequirement to update in case it exists.
     */
    where: CustomerRequirementWhereUniqueInput
    /**
     * In case the CustomerRequirement found by the `where` argument doesn't exist, create a new CustomerRequirement with this data.
     */
    create: XOR<CustomerRequirementCreateInput, CustomerRequirementUncheckedCreateInput>
    /**
     * In case the CustomerRequirement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerRequirementUpdateInput, CustomerRequirementUncheckedUpdateInput>
  }

  /**
   * CustomerRequirement delete
   */
  export type CustomerRequirementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
    /**
     * Filter which CustomerRequirement to delete.
     */
    where: CustomerRequirementWhereUniqueInput
  }

  /**
   * CustomerRequirement deleteMany
   */
  export type CustomerRequirementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerRequirements to delete
     */
    where?: CustomerRequirementWhereInput
  }

  /**
   * CustomerRequirement without action
   */
  export type CustomerRequirementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerRequirement
     */
    select?: CustomerRequirementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerRequirementInclude<ExtArgs> | null
  }


  /**
   * Model PurchaseRecord
   */

  export type AggregatePurchaseRecord = {
    _count: PurchaseRecordCountAggregateOutputType | null
    _avg: PurchaseRecordAvgAggregateOutputType | null
    _sum: PurchaseRecordSumAggregateOutputType | null
    _min: PurchaseRecordMinAggregateOutputType | null
    _max: PurchaseRecordMaxAggregateOutputType | null
  }

  export type PurchaseRecordAvgAggregateOutputType = {
    quantity: number | null
  }

  export type PurchaseRecordSumAggregateOutputType = {
    quantity: number | null
  }

  export type PurchaseRecordMinAggregateOutputType = {
    id: string | null
    productId: string | null
    quantity: number | null
    wholesaler: string | null
    purchasedAt: Date | null
    createdAt: Date | null
  }

  export type PurchaseRecordMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    quantity: number | null
    wholesaler: string | null
    purchasedAt: Date | null
    createdAt: Date | null
  }

  export type PurchaseRecordCountAggregateOutputType = {
    id: number
    productId: number
    quantity: number
    wholesaler: number
    purchasedAt: number
    createdAt: number
    _all: number
  }


  export type PurchaseRecordAvgAggregateInputType = {
    quantity?: true
  }

  export type PurchaseRecordSumAggregateInputType = {
    quantity?: true
  }

  export type PurchaseRecordMinAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    wholesaler?: true
    purchasedAt?: true
    createdAt?: true
  }

  export type PurchaseRecordMaxAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    wholesaler?: true
    purchasedAt?: true
    createdAt?: true
  }

  export type PurchaseRecordCountAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    wholesaler?: true
    purchasedAt?: true
    createdAt?: true
    _all?: true
  }

  export type PurchaseRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseRecord to aggregate.
     */
    where?: PurchaseRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseRecords to fetch.
     */
    orderBy?: PurchaseRecordOrderByWithRelationInput | PurchaseRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PurchaseRecords
    **/
    _count?: true | PurchaseRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseRecordMaxAggregateInputType
  }

  export type GetPurchaseRecordAggregateType<T extends PurchaseRecordAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchaseRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchaseRecord[P]>
      : GetScalarType<T[P], AggregatePurchaseRecord[P]>
  }




  export type PurchaseRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseRecordWhereInput
    orderBy?: PurchaseRecordOrderByWithAggregationInput | PurchaseRecordOrderByWithAggregationInput[]
    by: PurchaseRecordScalarFieldEnum[] | PurchaseRecordScalarFieldEnum
    having?: PurchaseRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseRecordCountAggregateInputType | true
    _avg?: PurchaseRecordAvgAggregateInputType
    _sum?: PurchaseRecordSumAggregateInputType
    _min?: PurchaseRecordMinAggregateInputType
    _max?: PurchaseRecordMaxAggregateInputType
  }

  export type PurchaseRecordGroupByOutputType = {
    id: string
    productId: string
    quantity: number
    wholesaler: string
    purchasedAt: Date
    createdAt: Date
    _count: PurchaseRecordCountAggregateOutputType | null
    _avg: PurchaseRecordAvgAggregateOutputType | null
    _sum: PurchaseRecordSumAggregateOutputType | null
    _min: PurchaseRecordMinAggregateOutputType | null
    _max: PurchaseRecordMaxAggregateOutputType | null
  }

  type GetPurchaseRecordGroupByPayload<T extends PurchaseRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseRecordGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseRecordGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    quantity?: boolean
    wholesaler?: boolean
    purchasedAt?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseRecord"]>

  export type PurchaseRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    quantity?: boolean
    wholesaler?: boolean
    purchasedAt?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseRecord"]>

  export type PurchaseRecordSelectScalar = {
    id?: boolean
    productId?: boolean
    quantity?: boolean
    wholesaler?: boolean
    purchasedAt?: boolean
    createdAt?: boolean
  }

  export type PurchaseRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type PurchaseRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $PurchaseRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PurchaseRecord"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      quantity: number
      wholesaler: string
      purchasedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["purchaseRecord"]>
    composites: {}
  }

  type PurchaseRecordGetPayload<S extends boolean | null | undefined | PurchaseRecordDefaultArgs> = $Result.GetResult<Prisma.$PurchaseRecordPayload, S>

  type PurchaseRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PurchaseRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PurchaseRecordCountAggregateInputType | true
    }

  export interface PurchaseRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PurchaseRecord'], meta: { name: 'PurchaseRecord' } }
    /**
     * Find zero or one PurchaseRecord that matches the filter.
     * @param {PurchaseRecordFindUniqueArgs} args - Arguments to find a PurchaseRecord
     * @example
     * // Get one PurchaseRecord
     * const purchaseRecord = await prisma.purchaseRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseRecordFindUniqueArgs>(args: SelectSubset<T, PurchaseRecordFindUniqueArgs<ExtArgs>>): Prisma__PurchaseRecordClient<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PurchaseRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PurchaseRecordFindUniqueOrThrowArgs} args - Arguments to find a PurchaseRecord
     * @example
     * // Get one PurchaseRecord
     * const purchaseRecord = await prisma.purchaseRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseRecordClient<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PurchaseRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseRecordFindFirstArgs} args - Arguments to find a PurchaseRecord
     * @example
     * // Get one PurchaseRecord
     * const purchaseRecord = await prisma.purchaseRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseRecordFindFirstArgs>(args?: SelectSubset<T, PurchaseRecordFindFirstArgs<ExtArgs>>): Prisma__PurchaseRecordClient<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PurchaseRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseRecordFindFirstOrThrowArgs} args - Arguments to find a PurchaseRecord
     * @example
     * // Get one PurchaseRecord
     * const purchaseRecord = await prisma.purchaseRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseRecordClient<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PurchaseRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PurchaseRecords
     * const purchaseRecords = await prisma.purchaseRecord.findMany()
     * 
     * // Get first 10 PurchaseRecords
     * const purchaseRecords = await prisma.purchaseRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseRecordWithIdOnly = await prisma.purchaseRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseRecordFindManyArgs>(args?: SelectSubset<T, PurchaseRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PurchaseRecord.
     * @param {PurchaseRecordCreateArgs} args - Arguments to create a PurchaseRecord.
     * @example
     * // Create one PurchaseRecord
     * const PurchaseRecord = await prisma.purchaseRecord.create({
     *   data: {
     *     // ... data to create a PurchaseRecord
     *   }
     * })
     * 
     */
    create<T extends PurchaseRecordCreateArgs>(args: SelectSubset<T, PurchaseRecordCreateArgs<ExtArgs>>): Prisma__PurchaseRecordClient<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PurchaseRecords.
     * @param {PurchaseRecordCreateManyArgs} args - Arguments to create many PurchaseRecords.
     * @example
     * // Create many PurchaseRecords
     * const purchaseRecord = await prisma.purchaseRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseRecordCreateManyArgs>(args?: SelectSubset<T, PurchaseRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PurchaseRecords and returns the data saved in the database.
     * @param {PurchaseRecordCreateManyAndReturnArgs} args - Arguments to create many PurchaseRecords.
     * @example
     * // Create many PurchaseRecords
     * const purchaseRecord = await prisma.purchaseRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PurchaseRecords and only return the `id`
     * const purchaseRecordWithIdOnly = await prisma.purchaseRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PurchaseRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, PurchaseRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PurchaseRecord.
     * @param {PurchaseRecordDeleteArgs} args - Arguments to delete one PurchaseRecord.
     * @example
     * // Delete one PurchaseRecord
     * const PurchaseRecord = await prisma.purchaseRecord.delete({
     *   where: {
     *     // ... filter to delete one PurchaseRecord
     *   }
     * })
     * 
     */
    delete<T extends PurchaseRecordDeleteArgs>(args: SelectSubset<T, PurchaseRecordDeleteArgs<ExtArgs>>): Prisma__PurchaseRecordClient<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PurchaseRecord.
     * @param {PurchaseRecordUpdateArgs} args - Arguments to update one PurchaseRecord.
     * @example
     * // Update one PurchaseRecord
     * const purchaseRecord = await prisma.purchaseRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseRecordUpdateArgs>(args: SelectSubset<T, PurchaseRecordUpdateArgs<ExtArgs>>): Prisma__PurchaseRecordClient<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PurchaseRecords.
     * @param {PurchaseRecordDeleteManyArgs} args - Arguments to filter PurchaseRecords to delete.
     * @example
     * // Delete a few PurchaseRecords
     * const { count } = await prisma.purchaseRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseRecordDeleteManyArgs>(args?: SelectSubset<T, PurchaseRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PurchaseRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PurchaseRecords
     * const purchaseRecord = await prisma.purchaseRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseRecordUpdateManyArgs>(args: SelectSubset<T, PurchaseRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PurchaseRecord.
     * @param {PurchaseRecordUpsertArgs} args - Arguments to update or create a PurchaseRecord.
     * @example
     * // Update or create a PurchaseRecord
     * const purchaseRecord = await prisma.purchaseRecord.upsert({
     *   create: {
     *     // ... data to create a PurchaseRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PurchaseRecord we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseRecordUpsertArgs>(args: SelectSubset<T, PurchaseRecordUpsertArgs<ExtArgs>>): Prisma__PurchaseRecordClient<$Result.GetResult<Prisma.$PurchaseRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PurchaseRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseRecordCountArgs} args - Arguments to filter PurchaseRecords to count.
     * @example
     * // Count the number of PurchaseRecords
     * const count = await prisma.purchaseRecord.count({
     *   where: {
     *     // ... the filter for the PurchaseRecords we want to count
     *   }
     * })
    **/
    count<T extends PurchaseRecordCountArgs>(
      args?: Subset<T, PurchaseRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PurchaseRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchaseRecordAggregateArgs>(args: Subset<T, PurchaseRecordAggregateArgs>): Prisma.PrismaPromise<GetPurchaseRecordAggregateType<T>>

    /**
     * Group by PurchaseRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PurchaseRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseRecordGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PurchaseRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PurchaseRecord model
   */
  readonly fields: PurchaseRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PurchaseRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PurchaseRecord model
   */ 
  interface PurchaseRecordFieldRefs {
    readonly id: FieldRef<"PurchaseRecord", 'String'>
    readonly productId: FieldRef<"PurchaseRecord", 'String'>
    readonly quantity: FieldRef<"PurchaseRecord", 'Float'>
    readonly wholesaler: FieldRef<"PurchaseRecord", 'String'>
    readonly purchasedAt: FieldRef<"PurchaseRecord", 'DateTime'>
    readonly createdAt: FieldRef<"PurchaseRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PurchaseRecord findUnique
   */
  export type PurchaseRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseRecord to fetch.
     */
    where: PurchaseRecordWhereUniqueInput
  }

  /**
   * PurchaseRecord findUniqueOrThrow
   */
  export type PurchaseRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseRecord to fetch.
     */
    where: PurchaseRecordWhereUniqueInput
  }

  /**
   * PurchaseRecord findFirst
   */
  export type PurchaseRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseRecord to fetch.
     */
    where?: PurchaseRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseRecords to fetch.
     */
    orderBy?: PurchaseRecordOrderByWithRelationInput | PurchaseRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseRecords.
     */
    cursor?: PurchaseRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseRecords.
     */
    distinct?: PurchaseRecordScalarFieldEnum | PurchaseRecordScalarFieldEnum[]
  }

  /**
   * PurchaseRecord findFirstOrThrow
   */
  export type PurchaseRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseRecord to fetch.
     */
    where?: PurchaseRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseRecords to fetch.
     */
    orderBy?: PurchaseRecordOrderByWithRelationInput | PurchaseRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseRecords.
     */
    cursor?: PurchaseRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseRecords.
     */
    distinct?: PurchaseRecordScalarFieldEnum | PurchaseRecordScalarFieldEnum[]
  }

  /**
   * PurchaseRecord findMany
   */
  export type PurchaseRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseRecords to fetch.
     */
    where?: PurchaseRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseRecords to fetch.
     */
    orderBy?: PurchaseRecordOrderByWithRelationInput | PurchaseRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PurchaseRecords.
     */
    cursor?: PurchaseRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseRecords.
     */
    skip?: number
    distinct?: PurchaseRecordScalarFieldEnum | PurchaseRecordScalarFieldEnum[]
  }

  /**
   * PurchaseRecord create
   */
  export type PurchaseRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a PurchaseRecord.
     */
    data: XOR<PurchaseRecordCreateInput, PurchaseRecordUncheckedCreateInput>
  }

  /**
   * PurchaseRecord createMany
   */
  export type PurchaseRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PurchaseRecords.
     */
    data: PurchaseRecordCreateManyInput | PurchaseRecordCreateManyInput[]
  }

  /**
   * PurchaseRecord createManyAndReturn
   */
  export type PurchaseRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PurchaseRecords.
     */
    data: PurchaseRecordCreateManyInput | PurchaseRecordCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PurchaseRecord update
   */
  export type PurchaseRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a PurchaseRecord.
     */
    data: XOR<PurchaseRecordUpdateInput, PurchaseRecordUncheckedUpdateInput>
    /**
     * Choose, which PurchaseRecord to update.
     */
    where: PurchaseRecordWhereUniqueInput
  }

  /**
   * PurchaseRecord updateMany
   */
  export type PurchaseRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PurchaseRecords.
     */
    data: XOR<PurchaseRecordUpdateManyMutationInput, PurchaseRecordUncheckedUpdateManyInput>
    /**
     * Filter which PurchaseRecords to update
     */
    where?: PurchaseRecordWhereInput
  }

  /**
   * PurchaseRecord upsert
   */
  export type PurchaseRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the PurchaseRecord to update in case it exists.
     */
    where: PurchaseRecordWhereUniqueInput
    /**
     * In case the PurchaseRecord found by the `where` argument doesn't exist, create a new PurchaseRecord with this data.
     */
    create: XOR<PurchaseRecordCreateInput, PurchaseRecordUncheckedCreateInput>
    /**
     * In case the PurchaseRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseRecordUpdateInput, PurchaseRecordUncheckedUpdateInput>
  }

  /**
   * PurchaseRecord delete
   */
  export type PurchaseRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
    /**
     * Filter which PurchaseRecord to delete.
     */
    where: PurchaseRecordWhereUniqueInput
  }

  /**
   * PurchaseRecord deleteMany
   */
  export type PurchaseRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseRecords to delete
     */
    where?: PurchaseRecordWhereInput
  }

  /**
   * PurchaseRecord without action
   */
  export type PurchaseRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseRecord
     */
    select?: PurchaseRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseRecordInclude<ExtArgs> | null
  }


  /**
   * Model VisitRecord
   */

  export type AggregateVisitRecord = {
    _count: VisitRecordCountAggregateOutputType | null
    _min: VisitRecordMinAggregateOutputType | null
    _max: VisitRecordMaxAggregateOutputType | null
  }

  export type VisitRecordMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    visitedAt: Date | null
    createdAt: Date | null
  }

  export type VisitRecordMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    visitedAt: Date | null
    createdAt: Date | null
  }

  export type VisitRecordCountAggregateOutputType = {
    id: number
    customerId: number
    visitedAt: number
    createdAt: number
    _all: number
  }


  export type VisitRecordMinAggregateInputType = {
    id?: true
    customerId?: true
    visitedAt?: true
    createdAt?: true
  }

  export type VisitRecordMaxAggregateInputType = {
    id?: true
    customerId?: true
    visitedAt?: true
    createdAt?: true
  }

  export type VisitRecordCountAggregateInputType = {
    id?: true
    customerId?: true
    visitedAt?: true
    createdAt?: true
    _all?: true
  }

  export type VisitRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VisitRecord to aggregate.
     */
    where?: VisitRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitRecords to fetch.
     */
    orderBy?: VisitRecordOrderByWithRelationInput | VisitRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VisitRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VisitRecords
    **/
    _count?: true | VisitRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VisitRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VisitRecordMaxAggregateInputType
  }

  export type GetVisitRecordAggregateType<T extends VisitRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateVisitRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVisitRecord[P]>
      : GetScalarType<T[P], AggregateVisitRecord[P]>
  }




  export type VisitRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitRecordWhereInput
    orderBy?: VisitRecordOrderByWithAggregationInput | VisitRecordOrderByWithAggregationInput[]
    by: VisitRecordScalarFieldEnum[] | VisitRecordScalarFieldEnum
    having?: VisitRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VisitRecordCountAggregateInputType | true
    _min?: VisitRecordMinAggregateInputType
    _max?: VisitRecordMaxAggregateInputType
  }

  export type VisitRecordGroupByOutputType = {
    id: string
    customerId: string
    visitedAt: Date
    createdAt: Date
    _count: VisitRecordCountAggregateOutputType | null
    _min: VisitRecordMinAggregateOutputType | null
    _max: VisitRecordMaxAggregateOutputType | null
  }

  type GetVisitRecordGroupByPayload<T extends VisitRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VisitRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VisitRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VisitRecordGroupByOutputType[P]>
            : GetScalarType<T[P], VisitRecordGroupByOutputType[P]>
        }
      >
    >


  export type VisitRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    visitedAt?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    items?: boolean | VisitRecord$itemsArgs<ExtArgs>
    _count?: boolean | VisitRecordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visitRecord"]>

  export type VisitRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    visitedAt?: boolean
    createdAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visitRecord"]>

  export type VisitRecordSelectScalar = {
    id?: boolean
    customerId?: boolean
    visitedAt?: boolean
    createdAt?: boolean
  }

  export type VisitRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    items?: boolean | VisitRecord$itemsArgs<ExtArgs>
    _count?: boolean | VisitRecordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VisitRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $VisitRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VisitRecord"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      items: Prisma.$VisitRecordItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      visitedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["visitRecord"]>
    composites: {}
  }

  type VisitRecordGetPayload<S extends boolean | null | undefined | VisitRecordDefaultArgs> = $Result.GetResult<Prisma.$VisitRecordPayload, S>

  type VisitRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VisitRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VisitRecordCountAggregateInputType | true
    }

  export interface VisitRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VisitRecord'], meta: { name: 'VisitRecord' } }
    /**
     * Find zero or one VisitRecord that matches the filter.
     * @param {VisitRecordFindUniqueArgs} args - Arguments to find a VisitRecord
     * @example
     * // Get one VisitRecord
     * const visitRecord = await prisma.visitRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VisitRecordFindUniqueArgs>(args: SelectSubset<T, VisitRecordFindUniqueArgs<ExtArgs>>): Prisma__VisitRecordClient<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VisitRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VisitRecordFindUniqueOrThrowArgs} args - Arguments to find a VisitRecord
     * @example
     * // Get one VisitRecord
     * const visitRecord = await prisma.visitRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VisitRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, VisitRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VisitRecordClient<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VisitRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordFindFirstArgs} args - Arguments to find a VisitRecord
     * @example
     * // Get one VisitRecord
     * const visitRecord = await prisma.visitRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VisitRecordFindFirstArgs>(args?: SelectSubset<T, VisitRecordFindFirstArgs<ExtArgs>>): Prisma__VisitRecordClient<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VisitRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordFindFirstOrThrowArgs} args - Arguments to find a VisitRecord
     * @example
     * // Get one VisitRecord
     * const visitRecord = await prisma.visitRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VisitRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, VisitRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__VisitRecordClient<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VisitRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VisitRecords
     * const visitRecords = await prisma.visitRecord.findMany()
     * 
     * // Get first 10 VisitRecords
     * const visitRecords = await prisma.visitRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const visitRecordWithIdOnly = await prisma.visitRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VisitRecordFindManyArgs>(args?: SelectSubset<T, VisitRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VisitRecord.
     * @param {VisitRecordCreateArgs} args - Arguments to create a VisitRecord.
     * @example
     * // Create one VisitRecord
     * const VisitRecord = await prisma.visitRecord.create({
     *   data: {
     *     // ... data to create a VisitRecord
     *   }
     * })
     * 
     */
    create<T extends VisitRecordCreateArgs>(args: SelectSubset<T, VisitRecordCreateArgs<ExtArgs>>): Prisma__VisitRecordClient<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VisitRecords.
     * @param {VisitRecordCreateManyArgs} args - Arguments to create many VisitRecords.
     * @example
     * // Create many VisitRecords
     * const visitRecord = await prisma.visitRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VisitRecordCreateManyArgs>(args?: SelectSubset<T, VisitRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VisitRecords and returns the data saved in the database.
     * @param {VisitRecordCreateManyAndReturnArgs} args - Arguments to create many VisitRecords.
     * @example
     * // Create many VisitRecords
     * const visitRecord = await prisma.visitRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VisitRecords and only return the `id`
     * const visitRecordWithIdOnly = await prisma.visitRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VisitRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, VisitRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VisitRecord.
     * @param {VisitRecordDeleteArgs} args - Arguments to delete one VisitRecord.
     * @example
     * // Delete one VisitRecord
     * const VisitRecord = await prisma.visitRecord.delete({
     *   where: {
     *     // ... filter to delete one VisitRecord
     *   }
     * })
     * 
     */
    delete<T extends VisitRecordDeleteArgs>(args: SelectSubset<T, VisitRecordDeleteArgs<ExtArgs>>): Prisma__VisitRecordClient<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VisitRecord.
     * @param {VisitRecordUpdateArgs} args - Arguments to update one VisitRecord.
     * @example
     * // Update one VisitRecord
     * const visitRecord = await prisma.visitRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VisitRecordUpdateArgs>(args: SelectSubset<T, VisitRecordUpdateArgs<ExtArgs>>): Prisma__VisitRecordClient<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VisitRecords.
     * @param {VisitRecordDeleteManyArgs} args - Arguments to filter VisitRecords to delete.
     * @example
     * // Delete a few VisitRecords
     * const { count } = await prisma.visitRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VisitRecordDeleteManyArgs>(args?: SelectSubset<T, VisitRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VisitRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VisitRecords
     * const visitRecord = await prisma.visitRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VisitRecordUpdateManyArgs>(args: SelectSubset<T, VisitRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VisitRecord.
     * @param {VisitRecordUpsertArgs} args - Arguments to update or create a VisitRecord.
     * @example
     * // Update or create a VisitRecord
     * const visitRecord = await prisma.visitRecord.upsert({
     *   create: {
     *     // ... data to create a VisitRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VisitRecord we want to update
     *   }
     * })
     */
    upsert<T extends VisitRecordUpsertArgs>(args: SelectSubset<T, VisitRecordUpsertArgs<ExtArgs>>): Prisma__VisitRecordClient<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VisitRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordCountArgs} args - Arguments to filter VisitRecords to count.
     * @example
     * // Count the number of VisitRecords
     * const count = await prisma.visitRecord.count({
     *   where: {
     *     // ... the filter for the VisitRecords we want to count
     *   }
     * })
    **/
    count<T extends VisitRecordCountArgs>(
      args?: Subset<T, VisitRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VisitRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VisitRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VisitRecordAggregateArgs>(args: Subset<T, VisitRecordAggregateArgs>): Prisma.PrismaPromise<GetVisitRecordAggregateType<T>>

    /**
     * Group by VisitRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VisitRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VisitRecordGroupByArgs['orderBy'] }
        : { orderBy?: VisitRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VisitRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisitRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VisitRecord model
   */
  readonly fields: VisitRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VisitRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VisitRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends VisitRecord$itemsArgs<ExtArgs> = {}>(args?: Subset<T, VisitRecord$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VisitRecord model
   */ 
  interface VisitRecordFieldRefs {
    readonly id: FieldRef<"VisitRecord", 'String'>
    readonly customerId: FieldRef<"VisitRecord", 'String'>
    readonly visitedAt: FieldRef<"VisitRecord", 'DateTime'>
    readonly createdAt: FieldRef<"VisitRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VisitRecord findUnique
   */
  export type VisitRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecord to fetch.
     */
    where: VisitRecordWhereUniqueInput
  }

  /**
   * VisitRecord findUniqueOrThrow
   */
  export type VisitRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecord to fetch.
     */
    where: VisitRecordWhereUniqueInput
  }

  /**
   * VisitRecord findFirst
   */
  export type VisitRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecord to fetch.
     */
    where?: VisitRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitRecords to fetch.
     */
    orderBy?: VisitRecordOrderByWithRelationInput | VisitRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VisitRecords.
     */
    cursor?: VisitRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VisitRecords.
     */
    distinct?: VisitRecordScalarFieldEnum | VisitRecordScalarFieldEnum[]
  }

  /**
   * VisitRecord findFirstOrThrow
   */
  export type VisitRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecord to fetch.
     */
    where?: VisitRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitRecords to fetch.
     */
    orderBy?: VisitRecordOrderByWithRelationInput | VisitRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VisitRecords.
     */
    cursor?: VisitRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VisitRecords.
     */
    distinct?: VisitRecordScalarFieldEnum | VisitRecordScalarFieldEnum[]
  }

  /**
   * VisitRecord findMany
   */
  export type VisitRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecords to fetch.
     */
    where?: VisitRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitRecords to fetch.
     */
    orderBy?: VisitRecordOrderByWithRelationInput | VisitRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VisitRecords.
     */
    cursor?: VisitRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitRecords.
     */
    skip?: number
    distinct?: VisitRecordScalarFieldEnum | VisitRecordScalarFieldEnum[]
  }

  /**
   * VisitRecord create
   */
  export type VisitRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a VisitRecord.
     */
    data: XOR<VisitRecordCreateInput, VisitRecordUncheckedCreateInput>
  }

  /**
   * VisitRecord createMany
   */
  export type VisitRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VisitRecords.
     */
    data: VisitRecordCreateManyInput | VisitRecordCreateManyInput[]
  }

  /**
   * VisitRecord createManyAndReturn
   */
  export type VisitRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VisitRecords.
     */
    data: VisitRecordCreateManyInput | VisitRecordCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VisitRecord update
   */
  export type VisitRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a VisitRecord.
     */
    data: XOR<VisitRecordUpdateInput, VisitRecordUncheckedUpdateInput>
    /**
     * Choose, which VisitRecord to update.
     */
    where: VisitRecordWhereUniqueInput
  }

  /**
   * VisitRecord updateMany
   */
  export type VisitRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VisitRecords.
     */
    data: XOR<VisitRecordUpdateManyMutationInput, VisitRecordUncheckedUpdateManyInput>
    /**
     * Filter which VisitRecords to update
     */
    where?: VisitRecordWhereInput
  }

  /**
   * VisitRecord upsert
   */
  export type VisitRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the VisitRecord to update in case it exists.
     */
    where: VisitRecordWhereUniqueInput
    /**
     * In case the VisitRecord found by the `where` argument doesn't exist, create a new VisitRecord with this data.
     */
    create: XOR<VisitRecordCreateInput, VisitRecordUncheckedCreateInput>
    /**
     * In case the VisitRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VisitRecordUpdateInput, VisitRecordUncheckedUpdateInput>
  }

  /**
   * VisitRecord delete
   */
  export type VisitRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
    /**
     * Filter which VisitRecord to delete.
     */
    where: VisitRecordWhereUniqueInput
  }

  /**
   * VisitRecord deleteMany
   */
  export type VisitRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VisitRecords to delete
     */
    where?: VisitRecordWhereInput
  }

  /**
   * VisitRecord.items
   */
  export type VisitRecord$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    where?: VisitRecordItemWhereInput
    orderBy?: VisitRecordItemOrderByWithRelationInput | VisitRecordItemOrderByWithRelationInput[]
    cursor?: VisitRecordItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VisitRecordItemScalarFieldEnum | VisitRecordItemScalarFieldEnum[]
  }

  /**
   * VisitRecord without action
   */
  export type VisitRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecord
     */
    select?: VisitRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordInclude<ExtArgs> | null
  }


  /**
   * Model VisitRecordItem
   */

  export type AggregateVisitRecordItem = {
    _count: VisitRecordItemCountAggregateOutputType | null
    _avg: VisitRecordItemAvgAggregateOutputType | null
    _sum: VisitRecordItemSumAggregateOutputType | null
    _min: VisitRecordItemMinAggregateOutputType | null
    _max: VisitRecordItemMaxAggregateOutputType | null
  }

  export type VisitRecordItemAvgAggregateOutputType = {
    quantity: number | null
  }

  export type VisitRecordItemSumAggregateOutputType = {
    quantity: number | null
  }

  export type VisitRecordItemMinAggregateOutputType = {
    id: string | null
    visitRecordId: string | null
    productId: string | null
    quantity: number | null
    createdAt: Date | null
  }

  export type VisitRecordItemMaxAggregateOutputType = {
    id: string | null
    visitRecordId: string | null
    productId: string | null
    quantity: number | null
    createdAt: Date | null
  }

  export type VisitRecordItemCountAggregateOutputType = {
    id: number
    visitRecordId: number
    productId: number
    quantity: number
    createdAt: number
    _all: number
  }


  export type VisitRecordItemAvgAggregateInputType = {
    quantity?: true
  }

  export type VisitRecordItemSumAggregateInputType = {
    quantity?: true
  }

  export type VisitRecordItemMinAggregateInputType = {
    id?: true
    visitRecordId?: true
    productId?: true
    quantity?: true
    createdAt?: true
  }

  export type VisitRecordItemMaxAggregateInputType = {
    id?: true
    visitRecordId?: true
    productId?: true
    quantity?: true
    createdAt?: true
  }

  export type VisitRecordItemCountAggregateInputType = {
    id?: true
    visitRecordId?: true
    productId?: true
    quantity?: true
    createdAt?: true
    _all?: true
  }

  export type VisitRecordItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VisitRecordItem to aggregate.
     */
    where?: VisitRecordItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitRecordItems to fetch.
     */
    orderBy?: VisitRecordItemOrderByWithRelationInput | VisitRecordItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VisitRecordItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitRecordItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitRecordItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VisitRecordItems
    **/
    _count?: true | VisitRecordItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VisitRecordItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VisitRecordItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VisitRecordItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VisitRecordItemMaxAggregateInputType
  }

  export type GetVisitRecordItemAggregateType<T extends VisitRecordItemAggregateArgs> = {
        [P in keyof T & keyof AggregateVisitRecordItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVisitRecordItem[P]>
      : GetScalarType<T[P], AggregateVisitRecordItem[P]>
  }




  export type VisitRecordItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VisitRecordItemWhereInput
    orderBy?: VisitRecordItemOrderByWithAggregationInput | VisitRecordItemOrderByWithAggregationInput[]
    by: VisitRecordItemScalarFieldEnum[] | VisitRecordItemScalarFieldEnum
    having?: VisitRecordItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VisitRecordItemCountAggregateInputType | true
    _avg?: VisitRecordItemAvgAggregateInputType
    _sum?: VisitRecordItemSumAggregateInputType
    _min?: VisitRecordItemMinAggregateInputType
    _max?: VisitRecordItemMaxAggregateInputType
  }

  export type VisitRecordItemGroupByOutputType = {
    id: string
    visitRecordId: string
    productId: string
    quantity: number
    createdAt: Date
    _count: VisitRecordItemCountAggregateOutputType | null
    _avg: VisitRecordItemAvgAggregateOutputType | null
    _sum: VisitRecordItemSumAggregateOutputType | null
    _min: VisitRecordItemMinAggregateOutputType | null
    _max: VisitRecordItemMaxAggregateOutputType | null
  }

  type GetVisitRecordItemGroupByPayload<T extends VisitRecordItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VisitRecordItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VisitRecordItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VisitRecordItemGroupByOutputType[P]>
            : GetScalarType<T[P], VisitRecordItemGroupByOutputType[P]>
        }
      >
    >


  export type VisitRecordItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    visitRecordId?: boolean
    productId?: boolean
    quantity?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    visitRecord?: boolean | VisitRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visitRecordItem"]>

  export type VisitRecordItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    visitRecordId?: boolean
    productId?: boolean
    quantity?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    visitRecord?: boolean | VisitRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["visitRecordItem"]>

  export type VisitRecordItemSelectScalar = {
    id?: boolean
    visitRecordId?: boolean
    productId?: boolean
    quantity?: boolean
    createdAt?: boolean
  }

  export type VisitRecordItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    visitRecord?: boolean | VisitRecordDefaultArgs<ExtArgs>
  }
  export type VisitRecordItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    visitRecord?: boolean | VisitRecordDefaultArgs<ExtArgs>
  }

  export type $VisitRecordItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VisitRecordItem"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      visitRecord: Prisma.$VisitRecordPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      visitRecordId: string
      productId: string
      quantity: number
      createdAt: Date
    }, ExtArgs["result"]["visitRecordItem"]>
    composites: {}
  }

  type VisitRecordItemGetPayload<S extends boolean | null | undefined | VisitRecordItemDefaultArgs> = $Result.GetResult<Prisma.$VisitRecordItemPayload, S>

  type VisitRecordItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VisitRecordItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VisitRecordItemCountAggregateInputType | true
    }

  export interface VisitRecordItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VisitRecordItem'], meta: { name: 'VisitRecordItem' } }
    /**
     * Find zero or one VisitRecordItem that matches the filter.
     * @param {VisitRecordItemFindUniqueArgs} args - Arguments to find a VisitRecordItem
     * @example
     * // Get one VisitRecordItem
     * const visitRecordItem = await prisma.visitRecordItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VisitRecordItemFindUniqueArgs>(args: SelectSubset<T, VisitRecordItemFindUniqueArgs<ExtArgs>>): Prisma__VisitRecordItemClient<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VisitRecordItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VisitRecordItemFindUniqueOrThrowArgs} args - Arguments to find a VisitRecordItem
     * @example
     * // Get one VisitRecordItem
     * const visitRecordItem = await prisma.visitRecordItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VisitRecordItemFindUniqueOrThrowArgs>(args: SelectSubset<T, VisitRecordItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VisitRecordItemClient<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VisitRecordItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordItemFindFirstArgs} args - Arguments to find a VisitRecordItem
     * @example
     * // Get one VisitRecordItem
     * const visitRecordItem = await prisma.visitRecordItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VisitRecordItemFindFirstArgs>(args?: SelectSubset<T, VisitRecordItemFindFirstArgs<ExtArgs>>): Prisma__VisitRecordItemClient<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VisitRecordItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordItemFindFirstOrThrowArgs} args - Arguments to find a VisitRecordItem
     * @example
     * // Get one VisitRecordItem
     * const visitRecordItem = await prisma.visitRecordItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VisitRecordItemFindFirstOrThrowArgs>(args?: SelectSubset<T, VisitRecordItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__VisitRecordItemClient<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VisitRecordItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VisitRecordItems
     * const visitRecordItems = await prisma.visitRecordItem.findMany()
     * 
     * // Get first 10 VisitRecordItems
     * const visitRecordItems = await prisma.visitRecordItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const visitRecordItemWithIdOnly = await prisma.visitRecordItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VisitRecordItemFindManyArgs>(args?: SelectSubset<T, VisitRecordItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VisitRecordItem.
     * @param {VisitRecordItemCreateArgs} args - Arguments to create a VisitRecordItem.
     * @example
     * // Create one VisitRecordItem
     * const VisitRecordItem = await prisma.visitRecordItem.create({
     *   data: {
     *     // ... data to create a VisitRecordItem
     *   }
     * })
     * 
     */
    create<T extends VisitRecordItemCreateArgs>(args: SelectSubset<T, VisitRecordItemCreateArgs<ExtArgs>>): Prisma__VisitRecordItemClient<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VisitRecordItems.
     * @param {VisitRecordItemCreateManyArgs} args - Arguments to create many VisitRecordItems.
     * @example
     * // Create many VisitRecordItems
     * const visitRecordItem = await prisma.visitRecordItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VisitRecordItemCreateManyArgs>(args?: SelectSubset<T, VisitRecordItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VisitRecordItems and returns the data saved in the database.
     * @param {VisitRecordItemCreateManyAndReturnArgs} args - Arguments to create many VisitRecordItems.
     * @example
     * // Create many VisitRecordItems
     * const visitRecordItem = await prisma.visitRecordItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VisitRecordItems and only return the `id`
     * const visitRecordItemWithIdOnly = await prisma.visitRecordItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VisitRecordItemCreateManyAndReturnArgs>(args?: SelectSubset<T, VisitRecordItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VisitRecordItem.
     * @param {VisitRecordItemDeleteArgs} args - Arguments to delete one VisitRecordItem.
     * @example
     * // Delete one VisitRecordItem
     * const VisitRecordItem = await prisma.visitRecordItem.delete({
     *   where: {
     *     // ... filter to delete one VisitRecordItem
     *   }
     * })
     * 
     */
    delete<T extends VisitRecordItemDeleteArgs>(args: SelectSubset<T, VisitRecordItemDeleteArgs<ExtArgs>>): Prisma__VisitRecordItemClient<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VisitRecordItem.
     * @param {VisitRecordItemUpdateArgs} args - Arguments to update one VisitRecordItem.
     * @example
     * // Update one VisitRecordItem
     * const visitRecordItem = await prisma.visitRecordItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VisitRecordItemUpdateArgs>(args: SelectSubset<T, VisitRecordItemUpdateArgs<ExtArgs>>): Prisma__VisitRecordItemClient<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VisitRecordItems.
     * @param {VisitRecordItemDeleteManyArgs} args - Arguments to filter VisitRecordItems to delete.
     * @example
     * // Delete a few VisitRecordItems
     * const { count } = await prisma.visitRecordItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VisitRecordItemDeleteManyArgs>(args?: SelectSubset<T, VisitRecordItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VisitRecordItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VisitRecordItems
     * const visitRecordItem = await prisma.visitRecordItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VisitRecordItemUpdateManyArgs>(args: SelectSubset<T, VisitRecordItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VisitRecordItem.
     * @param {VisitRecordItemUpsertArgs} args - Arguments to update or create a VisitRecordItem.
     * @example
     * // Update or create a VisitRecordItem
     * const visitRecordItem = await prisma.visitRecordItem.upsert({
     *   create: {
     *     // ... data to create a VisitRecordItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VisitRecordItem we want to update
     *   }
     * })
     */
    upsert<T extends VisitRecordItemUpsertArgs>(args: SelectSubset<T, VisitRecordItemUpsertArgs<ExtArgs>>): Prisma__VisitRecordItemClient<$Result.GetResult<Prisma.$VisitRecordItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VisitRecordItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordItemCountArgs} args - Arguments to filter VisitRecordItems to count.
     * @example
     * // Count the number of VisitRecordItems
     * const count = await prisma.visitRecordItem.count({
     *   where: {
     *     // ... the filter for the VisitRecordItems we want to count
     *   }
     * })
    **/
    count<T extends VisitRecordItemCountArgs>(
      args?: Subset<T, VisitRecordItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VisitRecordItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VisitRecordItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VisitRecordItemAggregateArgs>(args: Subset<T, VisitRecordItemAggregateArgs>): Prisma.PrismaPromise<GetVisitRecordItemAggregateType<T>>

    /**
     * Group by VisitRecordItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VisitRecordItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VisitRecordItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VisitRecordItemGroupByArgs['orderBy'] }
        : { orderBy?: VisitRecordItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VisitRecordItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisitRecordItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VisitRecordItem model
   */
  readonly fields: VisitRecordItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VisitRecordItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VisitRecordItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    visitRecord<T extends VisitRecordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VisitRecordDefaultArgs<ExtArgs>>): Prisma__VisitRecordClient<$Result.GetResult<Prisma.$VisitRecordPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VisitRecordItem model
   */ 
  interface VisitRecordItemFieldRefs {
    readonly id: FieldRef<"VisitRecordItem", 'String'>
    readonly visitRecordId: FieldRef<"VisitRecordItem", 'String'>
    readonly productId: FieldRef<"VisitRecordItem", 'String'>
    readonly quantity: FieldRef<"VisitRecordItem", 'Float'>
    readonly createdAt: FieldRef<"VisitRecordItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VisitRecordItem findUnique
   */
  export type VisitRecordItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecordItem to fetch.
     */
    where: VisitRecordItemWhereUniqueInput
  }

  /**
   * VisitRecordItem findUniqueOrThrow
   */
  export type VisitRecordItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecordItem to fetch.
     */
    where: VisitRecordItemWhereUniqueInput
  }

  /**
   * VisitRecordItem findFirst
   */
  export type VisitRecordItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecordItem to fetch.
     */
    where?: VisitRecordItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitRecordItems to fetch.
     */
    orderBy?: VisitRecordItemOrderByWithRelationInput | VisitRecordItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VisitRecordItems.
     */
    cursor?: VisitRecordItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitRecordItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitRecordItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VisitRecordItems.
     */
    distinct?: VisitRecordItemScalarFieldEnum | VisitRecordItemScalarFieldEnum[]
  }

  /**
   * VisitRecordItem findFirstOrThrow
   */
  export type VisitRecordItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecordItem to fetch.
     */
    where?: VisitRecordItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitRecordItems to fetch.
     */
    orderBy?: VisitRecordItemOrderByWithRelationInput | VisitRecordItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VisitRecordItems.
     */
    cursor?: VisitRecordItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitRecordItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitRecordItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VisitRecordItems.
     */
    distinct?: VisitRecordItemScalarFieldEnum | VisitRecordItemScalarFieldEnum[]
  }

  /**
   * VisitRecordItem findMany
   */
  export type VisitRecordItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    /**
     * Filter, which VisitRecordItems to fetch.
     */
    where?: VisitRecordItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VisitRecordItems to fetch.
     */
    orderBy?: VisitRecordItemOrderByWithRelationInput | VisitRecordItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VisitRecordItems.
     */
    cursor?: VisitRecordItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VisitRecordItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VisitRecordItems.
     */
    skip?: number
    distinct?: VisitRecordItemScalarFieldEnum | VisitRecordItemScalarFieldEnum[]
  }

  /**
   * VisitRecordItem create
   */
  export type VisitRecordItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    /**
     * The data needed to create a VisitRecordItem.
     */
    data: XOR<VisitRecordItemCreateInput, VisitRecordItemUncheckedCreateInput>
  }

  /**
   * VisitRecordItem createMany
   */
  export type VisitRecordItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VisitRecordItems.
     */
    data: VisitRecordItemCreateManyInput | VisitRecordItemCreateManyInput[]
  }

  /**
   * VisitRecordItem createManyAndReturn
   */
  export type VisitRecordItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VisitRecordItems.
     */
    data: VisitRecordItemCreateManyInput | VisitRecordItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VisitRecordItem update
   */
  export type VisitRecordItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    /**
     * The data needed to update a VisitRecordItem.
     */
    data: XOR<VisitRecordItemUpdateInput, VisitRecordItemUncheckedUpdateInput>
    /**
     * Choose, which VisitRecordItem to update.
     */
    where: VisitRecordItemWhereUniqueInput
  }

  /**
   * VisitRecordItem updateMany
   */
  export type VisitRecordItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VisitRecordItems.
     */
    data: XOR<VisitRecordItemUpdateManyMutationInput, VisitRecordItemUncheckedUpdateManyInput>
    /**
     * Filter which VisitRecordItems to update
     */
    where?: VisitRecordItemWhereInput
  }

  /**
   * VisitRecordItem upsert
   */
  export type VisitRecordItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    /**
     * The filter to search for the VisitRecordItem to update in case it exists.
     */
    where: VisitRecordItemWhereUniqueInput
    /**
     * In case the VisitRecordItem found by the `where` argument doesn't exist, create a new VisitRecordItem with this data.
     */
    create: XOR<VisitRecordItemCreateInput, VisitRecordItemUncheckedCreateInput>
    /**
     * In case the VisitRecordItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VisitRecordItemUpdateInput, VisitRecordItemUncheckedUpdateInput>
  }

  /**
   * VisitRecordItem delete
   */
  export type VisitRecordItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
    /**
     * Filter which VisitRecordItem to delete.
     */
    where: VisitRecordItemWhereUniqueInput
  }

  /**
   * VisitRecordItem deleteMany
   */
  export type VisitRecordItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VisitRecordItems to delete
     */
    where?: VisitRecordItemWhereInput
  }

  /**
   * VisitRecordItem without action
   */
  export type VisitRecordItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VisitRecordItem
     */
    select?: VisitRecordItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VisitRecordItemInclude<ExtArgs> | null
  }


  /**
   * Model DisposalRecord
   */

  export type AggregateDisposalRecord = {
    _count: DisposalRecordCountAggregateOutputType | null
    _avg: DisposalRecordAvgAggregateOutputType | null
    _sum: DisposalRecordSumAggregateOutputType | null
    _min: DisposalRecordMinAggregateOutputType | null
    _max: DisposalRecordMaxAggregateOutputType | null
  }

  export type DisposalRecordAvgAggregateOutputType = {
    quantity: number | null
  }

  export type DisposalRecordSumAggregateOutputType = {
    quantity: number | null
  }

  export type DisposalRecordMinAggregateOutputType = {
    id: string | null
    productId: string | null
    quantity: number | null
    reason: string | null
    disposedAt: Date | null
    createdAt: Date | null
  }

  export type DisposalRecordMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    quantity: number | null
    reason: string | null
    disposedAt: Date | null
    createdAt: Date | null
  }

  export type DisposalRecordCountAggregateOutputType = {
    id: number
    productId: number
    quantity: number
    reason: number
    disposedAt: number
    createdAt: number
    _all: number
  }


  export type DisposalRecordAvgAggregateInputType = {
    quantity?: true
  }

  export type DisposalRecordSumAggregateInputType = {
    quantity?: true
  }

  export type DisposalRecordMinAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    reason?: true
    disposedAt?: true
    createdAt?: true
  }

  export type DisposalRecordMaxAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    reason?: true
    disposedAt?: true
    createdAt?: true
  }

  export type DisposalRecordCountAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    reason?: true
    disposedAt?: true
    createdAt?: true
    _all?: true
  }

  export type DisposalRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DisposalRecord to aggregate.
     */
    where?: DisposalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DisposalRecords to fetch.
     */
    orderBy?: DisposalRecordOrderByWithRelationInput | DisposalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisposalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DisposalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DisposalRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DisposalRecords
    **/
    _count?: true | DisposalRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DisposalRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DisposalRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisposalRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisposalRecordMaxAggregateInputType
  }

  export type GetDisposalRecordAggregateType<T extends DisposalRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateDisposalRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisposalRecord[P]>
      : GetScalarType<T[P], AggregateDisposalRecord[P]>
  }




  export type DisposalRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisposalRecordWhereInput
    orderBy?: DisposalRecordOrderByWithAggregationInput | DisposalRecordOrderByWithAggregationInput[]
    by: DisposalRecordScalarFieldEnum[] | DisposalRecordScalarFieldEnum
    having?: DisposalRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisposalRecordCountAggregateInputType | true
    _avg?: DisposalRecordAvgAggregateInputType
    _sum?: DisposalRecordSumAggregateInputType
    _min?: DisposalRecordMinAggregateInputType
    _max?: DisposalRecordMaxAggregateInputType
  }

  export type DisposalRecordGroupByOutputType = {
    id: string
    productId: string
    quantity: number
    reason: string | null
    disposedAt: Date
    createdAt: Date
    _count: DisposalRecordCountAggregateOutputType | null
    _avg: DisposalRecordAvgAggregateOutputType | null
    _sum: DisposalRecordSumAggregateOutputType | null
    _min: DisposalRecordMinAggregateOutputType | null
    _max: DisposalRecordMaxAggregateOutputType | null
  }

  type GetDisposalRecordGroupByPayload<T extends DisposalRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisposalRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisposalRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisposalRecordGroupByOutputType[P]>
            : GetScalarType<T[P], DisposalRecordGroupByOutputType[P]>
        }
      >
    >


  export type DisposalRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    quantity?: boolean
    reason?: boolean
    disposedAt?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disposalRecord"]>

  export type DisposalRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    quantity?: boolean
    reason?: boolean
    disposedAt?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disposalRecord"]>

  export type DisposalRecordSelectScalar = {
    id?: boolean
    productId?: boolean
    quantity?: boolean
    reason?: boolean
    disposedAt?: boolean
    createdAt?: boolean
  }

  export type DisposalRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type DisposalRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $DisposalRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DisposalRecord"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      quantity: number
      reason: string | null
      disposedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["disposalRecord"]>
    composites: {}
  }

  type DisposalRecordGetPayload<S extends boolean | null | undefined | DisposalRecordDefaultArgs> = $Result.GetResult<Prisma.$DisposalRecordPayload, S>

  type DisposalRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DisposalRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DisposalRecordCountAggregateInputType | true
    }

  export interface DisposalRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DisposalRecord'], meta: { name: 'DisposalRecord' } }
    /**
     * Find zero or one DisposalRecord that matches the filter.
     * @param {DisposalRecordFindUniqueArgs} args - Arguments to find a DisposalRecord
     * @example
     * // Get one DisposalRecord
     * const disposalRecord = await prisma.disposalRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisposalRecordFindUniqueArgs>(args: SelectSubset<T, DisposalRecordFindUniqueArgs<ExtArgs>>): Prisma__DisposalRecordClient<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DisposalRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DisposalRecordFindUniqueOrThrowArgs} args - Arguments to find a DisposalRecord
     * @example
     * // Get one DisposalRecord
     * const disposalRecord = await prisma.disposalRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisposalRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, DisposalRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DisposalRecordClient<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DisposalRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisposalRecordFindFirstArgs} args - Arguments to find a DisposalRecord
     * @example
     * // Get one DisposalRecord
     * const disposalRecord = await prisma.disposalRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisposalRecordFindFirstArgs>(args?: SelectSubset<T, DisposalRecordFindFirstArgs<ExtArgs>>): Prisma__DisposalRecordClient<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DisposalRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisposalRecordFindFirstOrThrowArgs} args - Arguments to find a DisposalRecord
     * @example
     * // Get one DisposalRecord
     * const disposalRecord = await prisma.disposalRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisposalRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, DisposalRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__DisposalRecordClient<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DisposalRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisposalRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DisposalRecords
     * const disposalRecords = await prisma.disposalRecord.findMany()
     * 
     * // Get first 10 DisposalRecords
     * const disposalRecords = await prisma.disposalRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disposalRecordWithIdOnly = await prisma.disposalRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DisposalRecordFindManyArgs>(args?: SelectSubset<T, DisposalRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DisposalRecord.
     * @param {DisposalRecordCreateArgs} args - Arguments to create a DisposalRecord.
     * @example
     * // Create one DisposalRecord
     * const DisposalRecord = await prisma.disposalRecord.create({
     *   data: {
     *     // ... data to create a DisposalRecord
     *   }
     * })
     * 
     */
    create<T extends DisposalRecordCreateArgs>(args: SelectSubset<T, DisposalRecordCreateArgs<ExtArgs>>): Prisma__DisposalRecordClient<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DisposalRecords.
     * @param {DisposalRecordCreateManyArgs} args - Arguments to create many DisposalRecords.
     * @example
     * // Create many DisposalRecords
     * const disposalRecord = await prisma.disposalRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DisposalRecordCreateManyArgs>(args?: SelectSubset<T, DisposalRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DisposalRecords and returns the data saved in the database.
     * @param {DisposalRecordCreateManyAndReturnArgs} args - Arguments to create many DisposalRecords.
     * @example
     * // Create many DisposalRecords
     * const disposalRecord = await prisma.disposalRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DisposalRecords and only return the `id`
     * const disposalRecordWithIdOnly = await prisma.disposalRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DisposalRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, DisposalRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DisposalRecord.
     * @param {DisposalRecordDeleteArgs} args - Arguments to delete one DisposalRecord.
     * @example
     * // Delete one DisposalRecord
     * const DisposalRecord = await prisma.disposalRecord.delete({
     *   where: {
     *     // ... filter to delete one DisposalRecord
     *   }
     * })
     * 
     */
    delete<T extends DisposalRecordDeleteArgs>(args: SelectSubset<T, DisposalRecordDeleteArgs<ExtArgs>>): Prisma__DisposalRecordClient<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DisposalRecord.
     * @param {DisposalRecordUpdateArgs} args - Arguments to update one DisposalRecord.
     * @example
     * // Update one DisposalRecord
     * const disposalRecord = await prisma.disposalRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DisposalRecordUpdateArgs>(args: SelectSubset<T, DisposalRecordUpdateArgs<ExtArgs>>): Prisma__DisposalRecordClient<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DisposalRecords.
     * @param {DisposalRecordDeleteManyArgs} args - Arguments to filter DisposalRecords to delete.
     * @example
     * // Delete a few DisposalRecords
     * const { count } = await prisma.disposalRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DisposalRecordDeleteManyArgs>(args?: SelectSubset<T, DisposalRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DisposalRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisposalRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DisposalRecords
     * const disposalRecord = await prisma.disposalRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DisposalRecordUpdateManyArgs>(args: SelectSubset<T, DisposalRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DisposalRecord.
     * @param {DisposalRecordUpsertArgs} args - Arguments to update or create a DisposalRecord.
     * @example
     * // Update or create a DisposalRecord
     * const disposalRecord = await prisma.disposalRecord.upsert({
     *   create: {
     *     // ... data to create a DisposalRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DisposalRecord we want to update
     *   }
     * })
     */
    upsert<T extends DisposalRecordUpsertArgs>(args: SelectSubset<T, DisposalRecordUpsertArgs<ExtArgs>>): Prisma__DisposalRecordClient<$Result.GetResult<Prisma.$DisposalRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DisposalRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisposalRecordCountArgs} args - Arguments to filter DisposalRecords to count.
     * @example
     * // Count the number of DisposalRecords
     * const count = await prisma.disposalRecord.count({
     *   where: {
     *     // ... the filter for the DisposalRecords we want to count
     *   }
     * })
    **/
    count<T extends DisposalRecordCountArgs>(
      args?: Subset<T, DisposalRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisposalRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DisposalRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisposalRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisposalRecordAggregateArgs>(args: Subset<T, DisposalRecordAggregateArgs>): Prisma.PrismaPromise<GetDisposalRecordAggregateType<T>>

    /**
     * Group by DisposalRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisposalRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DisposalRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisposalRecordGroupByArgs['orderBy'] }
        : { orderBy?: DisposalRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DisposalRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisposalRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DisposalRecord model
   */
  readonly fields: DisposalRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DisposalRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisposalRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DisposalRecord model
   */ 
  interface DisposalRecordFieldRefs {
    readonly id: FieldRef<"DisposalRecord", 'String'>
    readonly productId: FieldRef<"DisposalRecord", 'String'>
    readonly quantity: FieldRef<"DisposalRecord", 'Float'>
    readonly reason: FieldRef<"DisposalRecord", 'String'>
    readonly disposedAt: FieldRef<"DisposalRecord", 'DateTime'>
    readonly createdAt: FieldRef<"DisposalRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DisposalRecord findUnique
   */
  export type DisposalRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisposalRecord to fetch.
     */
    where: DisposalRecordWhereUniqueInput
  }

  /**
   * DisposalRecord findUniqueOrThrow
   */
  export type DisposalRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisposalRecord to fetch.
     */
    where: DisposalRecordWhereUniqueInput
  }

  /**
   * DisposalRecord findFirst
   */
  export type DisposalRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisposalRecord to fetch.
     */
    where?: DisposalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DisposalRecords to fetch.
     */
    orderBy?: DisposalRecordOrderByWithRelationInput | DisposalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DisposalRecords.
     */
    cursor?: DisposalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DisposalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DisposalRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DisposalRecords.
     */
    distinct?: DisposalRecordScalarFieldEnum | DisposalRecordScalarFieldEnum[]
  }

  /**
   * DisposalRecord findFirstOrThrow
   */
  export type DisposalRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisposalRecord to fetch.
     */
    where?: DisposalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DisposalRecords to fetch.
     */
    orderBy?: DisposalRecordOrderByWithRelationInput | DisposalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DisposalRecords.
     */
    cursor?: DisposalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DisposalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DisposalRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DisposalRecords.
     */
    distinct?: DisposalRecordScalarFieldEnum | DisposalRecordScalarFieldEnum[]
  }

  /**
   * DisposalRecord findMany
   */
  export type DisposalRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisposalRecords to fetch.
     */
    where?: DisposalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DisposalRecords to fetch.
     */
    orderBy?: DisposalRecordOrderByWithRelationInput | DisposalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DisposalRecords.
     */
    cursor?: DisposalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DisposalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DisposalRecords.
     */
    skip?: number
    distinct?: DisposalRecordScalarFieldEnum | DisposalRecordScalarFieldEnum[]
  }

  /**
   * DisposalRecord create
   */
  export type DisposalRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a DisposalRecord.
     */
    data: XOR<DisposalRecordCreateInput, DisposalRecordUncheckedCreateInput>
  }

  /**
   * DisposalRecord createMany
   */
  export type DisposalRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DisposalRecords.
     */
    data: DisposalRecordCreateManyInput | DisposalRecordCreateManyInput[]
  }

  /**
   * DisposalRecord createManyAndReturn
   */
  export type DisposalRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DisposalRecords.
     */
    data: DisposalRecordCreateManyInput | DisposalRecordCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DisposalRecord update
   */
  export type DisposalRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a DisposalRecord.
     */
    data: XOR<DisposalRecordUpdateInput, DisposalRecordUncheckedUpdateInput>
    /**
     * Choose, which DisposalRecord to update.
     */
    where: DisposalRecordWhereUniqueInput
  }

  /**
   * DisposalRecord updateMany
   */
  export type DisposalRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DisposalRecords.
     */
    data: XOR<DisposalRecordUpdateManyMutationInput, DisposalRecordUncheckedUpdateManyInput>
    /**
     * Filter which DisposalRecords to update
     */
    where?: DisposalRecordWhereInput
  }

  /**
   * DisposalRecord upsert
   */
  export type DisposalRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the DisposalRecord to update in case it exists.
     */
    where: DisposalRecordWhereUniqueInput
    /**
     * In case the DisposalRecord found by the `where` argument doesn't exist, create a new DisposalRecord with this data.
     */
    create: XOR<DisposalRecordCreateInput, DisposalRecordUncheckedCreateInput>
    /**
     * In case the DisposalRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisposalRecordUpdateInput, DisposalRecordUncheckedUpdateInput>
  }

  /**
   * DisposalRecord delete
   */
  export type DisposalRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
    /**
     * Filter which DisposalRecord to delete.
     */
    where: DisposalRecordWhereUniqueInput
  }

  /**
   * DisposalRecord deleteMany
   */
  export type DisposalRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DisposalRecords to delete
     */
    where?: DisposalRecordWhereInput
  }

  /**
   * DisposalRecord without action
   */
  export type DisposalRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisposalRecord
     */
    select?: DisposalRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisposalRecordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nameKana: 'nameKana',
    visitInterval: 'visitInterval',
    lastVisitDate: 'lastVisitDate',
    nextVisitDate: 'nextVisitDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    currentStock: 'currentStock',
    unit: 'unit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const CustomerRequirementScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    productId: 'productId',
    quantity: 'quantity',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerRequirementScalarFieldEnum = (typeof CustomerRequirementScalarFieldEnum)[keyof typeof CustomerRequirementScalarFieldEnum]


  export const PurchaseRecordScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    quantity: 'quantity',
    wholesaler: 'wholesaler',
    purchasedAt: 'purchasedAt',
    createdAt: 'createdAt'
  };

  export type PurchaseRecordScalarFieldEnum = (typeof PurchaseRecordScalarFieldEnum)[keyof typeof PurchaseRecordScalarFieldEnum]


  export const VisitRecordScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    visitedAt: 'visitedAt',
    createdAt: 'createdAt'
  };

  export type VisitRecordScalarFieldEnum = (typeof VisitRecordScalarFieldEnum)[keyof typeof VisitRecordScalarFieldEnum]


  export const VisitRecordItemScalarFieldEnum: {
    id: 'id',
    visitRecordId: 'visitRecordId',
    productId: 'productId',
    quantity: 'quantity',
    createdAt: 'createdAt'
  };

  export type VisitRecordItemScalarFieldEnum = (typeof VisitRecordItemScalarFieldEnum)[keyof typeof VisitRecordItemScalarFieldEnum]


  export const DisposalRecordScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    quantity: 'quantity',
    reason: 'reason',
    disposedAt: 'disposedAt',
    createdAt: 'createdAt'
  };

  export type DisposalRecordScalarFieldEnum = (typeof DisposalRecordScalarFieldEnum)[keyof typeof DisposalRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    nameKana?: StringFilter<"Customer"> | string
    visitInterval?: IntFilter<"Customer"> | number
    lastVisitDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    nextVisitDate?: DateTimeFilter<"Customer"> | Date | string
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    requirements?: CustomerRequirementListRelationFilter
    visitRecords?: VisitRecordListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nameKana?: SortOrder
    visitInterval?: SortOrder
    lastVisitDate?: SortOrderInput | SortOrder
    nextVisitDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requirements?: CustomerRequirementOrderByRelationAggregateInput
    visitRecords?: VisitRecordOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    nameKana?: StringFilter<"Customer"> | string
    visitInterval?: IntFilter<"Customer"> | number
    lastVisitDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    nextVisitDate?: DateTimeFilter<"Customer"> | Date | string
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    requirements?: CustomerRequirementListRelationFilter
    visitRecords?: VisitRecordListRelationFilter
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nameKana?: SortOrder
    visitInterval?: SortOrder
    lastVisitDate?: SortOrderInput | SortOrder
    nextVisitDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    nameKana?: StringWithAggregatesFilter<"Customer"> | string
    visitInterval?: IntWithAggregatesFilter<"Customer"> | number
    lastVisitDate?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    nextVisitDate?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    currentStock?: FloatFilter<"Product"> | number
    unit?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    requirements?: CustomerRequirementListRelationFilter
    purchases?: PurchaseRecordListRelationFilter
    visitItems?: VisitRecordItemListRelationFilter
    disposals?: DisposalRecordListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    currentStock?: SortOrder
    unit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requirements?: CustomerRequirementOrderByRelationAggregateInput
    purchases?: PurchaseRecordOrderByRelationAggregateInput
    visitItems?: VisitRecordItemOrderByRelationAggregateInput
    disposals?: DisposalRecordOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    currentStock?: FloatFilter<"Product"> | number
    unit?: StringNullableFilter<"Product"> | string | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    requirements?: CustomerRequirementListRelationFilter
    purchases?: PurchaseRecordListRelationFilter
    visitItems?: VisitRecordItemListRelationFilter
    disposals?: DisposalRecordListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    currentStock?: SortOrder
    unit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    currentStock?: FloatWithAggregatesFilter<"Product"> | number
    unit?: StringNullableWithAggregatesFilter<"Product"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type CustomerRequirementWhereInput = {
    AND?: CustomerRequirementWhereInput | CustomerRequirementWhereInput[]
    OR?: CustomerRequirementWhereInput[]
    NOT?: CustomerRequirementWhereInput | CustomerRequirementWhereInput[]
    id?: StringFilter<"CustomerRequirement"> | string
    customerId?: StringFilter<"CustomerRequirement"> | string
    productId?: StringFilter<"CustomerRequirement"> | string
    quantity?: FloatFilter<"CustomerRequirement"> | number
    sortOrder?: IntFilter<"CustomerRequirement"> | number
    createdAt?: DateTimeFilter<"CustomerRequirement"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerRequirement"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    customer?: XOR<CustomerRelationFilter, CustomerWhereInput>
  }

  export type CustomerRequirementOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
  }

  export type CustomerRequirementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    customerId_productId?: CustomerRequirementCustomerIdProductIdCompoundUniqueInput
    AND?: CustomerRequirementWhereInput | CustomerRequirementWhereInput[]
    OR?: CustomerRequirementWhereInput[]
    NOT?: CustomerRequirementWhereInput | CustomerRequirementWhereInput[]
    customerId?: StringFilter<"CustomerRequirement"> | string
    productId?: StringFilter<"CustomerRequirement"> | string
    quantity?: FloatFilter<"CustomerRequirement"> | number
    sortOrder?: IntFilter<"CustomerRequirement"> | number
    createdAt?: DateTimeFilter<"CustomerRequirement"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerRequirement"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    customer?: XOR<CustomerRelationFilter, CustomerWhereInput>
  }, "id" | "customerId_productId">

  export type CustomerRequirementOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerRequirementCountOrderByAggregateInput
    _avg?: CustomerRequirementAvgOrderByAggregateInput
    _max?: CustomerRequirementMaxOrderByAggregateInput
    _min?: CustomerRequirementMinOrderByAggregateInput
    _sum?: CustomerRequirementSumOrderByAggregateInput
  }

  export type CustomerRequirementScalarWhereWithAggregatesInput = {
    AND?: CustomerRequirementScalarWhereWithAggregatesInput | CustomerRequirementScalarWhereWithAggregatesInput[]
    OR?: CustomerRequirementScalarWhereWithAggregatesInput[]
    NOT?: CustomerRequirementScalarWhereWithAggregatesInput | CustomerRequirementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerRequirement"> | string
    customerId?: StringWithAggregatesFilter<"CustomerRequirement"> | string
    productId?: StringWithAggregatesFilter<"CustomerRequirement"> | string
    quantity?: FloatWithAggregatesFilter<"CustomerRequirement"> | number
    sortOrder?: IntWithAggregatesFilter<"CustomerRequirement"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CustomerRequirement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomerRequirement"> | Date | string
  }

  export type PurchaseRecordWhereInput = {
    AND?: PurchaseRecordWhereInput | PurchaseRecordWhereInput[]
    OR?: PurchaseRecordWhereInput[]
    NOT?: PurchaseRecordWhereInput | PurchaseRecordWhereInput[]
    id?: StringFilter<"PurchaseRecord"> | string
    productId?: StringFilter<"PurchaseRecord"> | string
    quantity?: FloatFilter<"PurchaseRecord"> | number
    wholesaler?: StringFilter<"PurchaseRecord"> | string
    purchasedAt?: DateTimeFilter<"PurchaseRecord"> | Date | string
    createdAt?: DateTimeFilter<"PurchaseRecord"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type PurchaseRecordOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    wholesaler?: SortOrder
    purchasedAt?: SortOrder
    createdAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type PurchaseRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PurchaseRecordWhereInput | PurchaseRecordWhereInput[]
    OR?: PurchaseRecordWhereInput[]
    NOT?: PurchaseRecordWhereInput | PurchaseRecordWhereInput[]
    productId?: StringFilter<"PurchaseRecord"> | string
    quantity?: FloatFilter<"PurchaseRecord"> | number
    wholesaler?: StringFilter<"PurchaseRecord"> | string
    purchasedAt?: DateTimeFilter<"PurchaseRecord"> | Date | string
    createdAt?: DateTimeFilter<"PurchaseRecord"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id">

  export type PurchaseRecordOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    wholesaler?: SortOrder
    purchasedAt?: SortOrder
    createdAt?: SortOrder
    _count?: PurchaseRecordCountOrderByAggregateInput
    _avg?: PurchaseRecordAvgOrderByAggregateInput
    _max?: PurchaseRecordMaxOrderByAggregateInput
    _min?: PurchaseRecordMinOrderByAggregateInput
    _sum?: PurchaseRecordSumOrderByAggregateInput
  }

  export type PurchaseRecordScalarWhereWithAggregatesInput = {
    AND?: PurchaseRecordScalarWhereWithAggregatesInput | PurchaseRecordScalarWhereWithAggregatesInput[]
    OR?: PurchaseRecordScalarWhereWithAggregatesInput[]
    NOT?: PurchaseRecordScalarWhereWithAggregatesInput | PurchaseRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PurchaseRecord"> | string
    productId?: StringWithAggregatesFilter<"PurchaseRecord"> | string
    quantity?: FloatWithAggregatesFilter<"PurchaseRecord"> | number
    wholesaler?: StringWithAggregatesFilter<"PurchaseRecord"> | string
    purchasedAt?: DateTimeWithAggregatesFilter<"PurchaseRecord"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PurchaseRecord"> | Date | string
  }

  export type VisitRecordWhereInput = {
    AND?: VisitRecordWhereInput | VisitRecordWhereInput[]
    OR?: VisitRecordWhereInput[]
    NOT?: VisitRecordWhereInput | VisitRecordWhereInput[]
    id?: StringFilter<"VisitRecord"> | string
    customerId?: StringFilter<"VisitRecord"> | string
    visitedAt?: DateTimeFilter<"VisitRecord"> | Date | string
    createdAt?: DateTimeFilter<"VisitRecord"> | Date | string
    customer?: XOR<CustomerRelationFilter, CustomerWhereInput>
    items?: VisitRecordItemListRelationFilter
  }

  export type VisitRecordOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    items?: VisitRecordItemOrderByRelationAggregateInput
  }

  export type VisitRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VisitRecordWhereInput | VisitRecordWhereInput[]
    OR?: VisitRecordWhereInput[]
    NOT?: VisitRecordWhereInput | VisitRecordWhereInput[]
    customerId?: StringFilter<"VisitRecord"> | string
    visitedAt?: DateTimeFilter<"VisitRecord"> | Date | string
    createdAt?: DateTimeFilter<"VisitRecord"> | Date | string
    customer?: XOR<CustomerRelationFilter, CustomerWhereInput>
    items?: VisitRecordItemListRelationFilter
  }, "id">

  export type VisitRecordOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
    _count?: VisitRecordCountOrderByAggregateInput
    _max?: VisitRecordMaxOrderByAggregateInput
    _min?: VisitRecordMinOrderByAggregateInput
  }

  export type VisitRecordScalarWhereWithAggregatesInput = {
    AND?: VisitRecordScalarWhereWithAggregatesInput | VisitRecordScalarWhereWithAggregatesInput[]
    OR?: VisitRecordScalarWhereWithAggregatesInput[]
    NOT?: VisitRecordScalarWhereWithAggregatesInput | VisitRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VisitRecord"> | string
    customerId?: StringWithAggregatesFilter<"VisitRecord"> | string
    visitedAt?: DateTimeWithAggregatesFilter<"VisitRecord"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"VisitRecord"> | Date | string
  }

  export type VisitRecordItemWhereInput = {
    AND?: VisitRecordItemWhereInput | VisitRecordItemWhereInput[]
    OR?: VisitRecordItemWhereInput[]
    NOT?: VisitRecordItemWhereInput | VisitRecordItemWhereInput[]
    id?: StringFilter<"VisitRecordItem"> | string
    visitRecordId?: StringFilter<"VisitRecordItem"> | string
    productId?: StringFilter<"VisitRecordItem"> | string
    quantity?: FloatFilter<"VisitRecordItem"> | number
    createdAt?: DateTimeFilter<"VisitRecordItem"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    visitRecord?: XOR<VisitRecordRelationFilter, VisitRecordWhereInput>
  }

  export type VisitRecordItemOrderByWithRelationInput = {
    id?: SortOrder
    visitRecordId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    visitRecord?: VisitRecordOrderByWithRelationInput
  }

  export type VisitRecordItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VisitRecordItemWhereInput | VisitRecordItemWhereInput[]
    OR?: VisitRecordItemWhereInput[]
    NOT?: VisitRecordItemWhereInput | VisitRecordItemWhereInput[]
    visitRecordId?: StringFilter<"VisitRecordItem"> | string
    productId?: StringFilter<"VisitRecordItem"> | string
    quantity?: FloatFilter<"VisitRecordItem"> | number
    createdAt?: DateTimeFilter<"VisitRecordItem"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    visitRecord?: XOR<VisitRecordRelationFilter, VisitRecordWhereInput>
  }, "id">

  export type VisitRecordItemOrderByWithAggregationInput = {
    id?: SortOrder
    visitRecordId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    _count?: VisitRecordItemCountOrderByAggregateInput
    _avg?: VisitRecordItemAvgOrderByAggregateInput
    _max?: VisitRecordItemMaxOrderByAggregateInput
    _min?: VisitRecordItemMinOrderByAggregateInput
    _sum?: VisitRecordItemSumOrderByAggregateInput
  }

  export type VisitRecordItemScalarWhereWithAggregatesInput = {
    AND?: VisitRecordItemScalarWhereWithAggregatesInput | VisitRecordItemScalarWhereWithAggregatesInput[]
    OR?: VisitRecordItemScalarWhereWithAggregatesInput[]
    NOT?: VisitRecordItemScalarWhereWithAggregatesInput | VisitRecordItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VisitRecordItem"> | string
    visitRecordId?: StringWithAggregatesFilter<"VisitRecordItem"> | string
    productId?: StringWithAggregatesFilter<"VisitRecordItem"> | string
    quantity?: FloatWithAggregatesFilter<"VisitRecordItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"VisitRecordItem"> | Date | string
  }

  export type DisposalRecordWhereInput = {
    AND?: DisposalRecordWhereInput | DisposalRecordWhereInput[]
    OR?: DisposalRecordWhereInput[]
    NOT?: DisposalRecordWhereInput | DisposalRecordWhereInput[]
    id?: StringFilter<"DisposalRecord"> | string
    productId?: StringFilter<"DisposalRecord"> | string
    quantity?: FloatFilter<"DisposalRecord"> | number
    reason?: StringNullableFilter<"DisposalRecord"> | string | null
    disposedAt?: DateTimeFilter<"DisposalRecord"> | Date | string
    createdAt?: DateTimeFilter<"DisposalRecord"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type DisposalRecordOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrderInput | SortOrder
    disposedAt?: SortOrder
    createdAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type DisposalRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DisposalRecordWhereInput | DisposalRecordWhereInput[]
    OR?: DisposalRecordWhereInput[]
    NOT?: DisposalRecordWhereInput | DisposalRecordWhereInput[]
    productId?: StringFilter<"DisposalRecord"> | string
    quantity?: FloatFilter<"DisposalRecord"> | number
    reason?: StringNullableFilter<"DisposalRecord"> | string | null
    disposedAt?: DateTimeFilter<"DisposalRecord"> | Date | string
    createdAt?: DateTimeFilter<"DisposalRecord"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id">

  export type DisposalRecordOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrderInput | SortOrder
    disposedAt?: SortOrder
    createdAt?: SortOrder
    _count?: DisposalRecordCountOrderByAggregateInput
    _avg?: DisposalRecordAvgOrderByAggregateInput
    _max?: DisposalRecordMaxOrderByAggregateInput
    _min?: DisposalRecordMinOrderByAggregateInput
    _sum?: DisposalRecordSumOrderByAggregateInput
  }

  export type DisposalRecordScalarWhereWithAggregatesInput = {
    AND?: DisposalRecordScalarWhereWithAggregatesInput | DisposalRecordScalarWhereWithAggregatesInput[]
    OR?: DisposalRecordScalarWhereWithAggregatesInput[]
    NOT?: DisposalRecordScalarWhereWithAggregatesInput | DisposalRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DisposalRecord"> | string
    productId?: StringWithAggregatesFilter<"DisposalRecord"> | string
    quantity?: FloatWithAggregatesFilter<"DisposalRecord"> | number
    reason?: StringNullableWithAggregatesFilter<"DisposalRecord"> | string | null
    disposedAt?: DateTimeWithAggregatesFilter<"DisposalRecord"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"DisposalRecord"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    nameKana?: string
    visitInterval: number
    lastVisitDate?: Date | string | null
    nextVisitDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementCreateNestedManyWithoutCustomerInput
    visitRecords?: VisitRecordCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name: string
    nameKana?: string
    visitInterval: number
    lastVisitDate?: Date | string | null
    nextVisitDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementUncheckedCreateNestedManyWithoutCustomerInput
    visitRecords?: VisitRecordUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameKana?: StringFieldUpdateOperationsInput | string
    visitInterval?: IntFieldUpdateOperationsInput | number
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextVisitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUpdateManyWithoutCustomerNestedInput
    visitRecords?: VisitRecordUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameKana?: StringFieldUpdateOperationsInput | string
    visitInterval?: IntFieldUpdateOperationsInput | number
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextVisitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUncheckedUpdateManyWithoutCustomerNestedInput
    visitRecords?: VisitRecordUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    name: string
    nameKana?: string
    visitInterval: number
    lastVisitDate?: Date | string | null
    nextVisitDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameKana?: StringFieldUpdateOperationsInput | string
    visitInterval?: IntFieldUpdateOperationsInput | number
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextVisitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameKana?: StringFieldUpdateOperationsInput | string
    visitInterval?: IntFieldUpdateOperationsInput | number
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextVisitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementCreateNestedManyWithoutProductInput
    purchases?: PurchaseRecordCreateNestedManyWithoutProductInput
    visitItems?: VisitRecordItemCreateNestedManyWithoutProductInput
    disposals?: DisposalRecordCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementUncheckedCreateNestedManyWithoutProductInput
    purchases?: PurchaseRecordUncheckedCreateNestedManyWithoutProductInput
    visitItems?: VisitRecordItemUncheckedCreateNestedManyWithoutProductInput
    disposals?: DisposalRecordUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUpdateManyWithoutProductNestedInput
    purchases?: PurchaseRecordUpdateManyWithoutProductNestedInput
    visitItems?: VisitRecordItemUpdateManyWithoutProductNestedInput
    disposals?: DisposalRecordUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUncheckedUpdateManyWithoutProductNestedInput
    purchases?: PurchaseRecordUncheckedUpdateManyWithoutProductNestedInput
    visitItems?: VisitRecordItemUncheckedUpdateManyWithoutProductNestedInput
    disposals?: DisposalRecordUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerRequirementCreateInput = {
    id?: string
    quantity: number
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutRequirementsInput
    customer: CustomerCreateNestedOneWithoutRequirementsInput
  }

  export type CustomerRequirementUncheckedCreateInput = {
    id?: string
    customerId: string
    productId: string
    quantity: number
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerRequirementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutRequirementsNestedInput
    customer?: CustomerUpdateOneRequiredWithoutRequirementsNestedInput
  }

  export type CustomerRequirementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerRequirementCreateManyInput = {
    id?: string
    customerId: string
    productId: string
    quantity: number
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerRequirementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerRequirementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseRecordCreateInput = {
    id?: string
    quantity: number
    wholesaler: string
    purchasedAt?: Date | string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutPurchasesInput
  }

  export type PurchaseRecordUncheckedCreateInput = {
    id?: string
    productId: string
    quantity: number
    wholesaler: string
    purchasedAt?: Date | string
    createdAt?: Date | string
  }

  export type PurchaseRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    wholesaler?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutPurchasesNestedInput
  }

  export type PurchaseRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    wholesaler?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseRecordCreateManyInput = {
    id?: string
    productId: string
    quantity: number
    wholesaler: string
    purchasedAt?: Date | string
    createdAt?: Date | string
  }

  export type PurchaseRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    wholesaler?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    wholesaler?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordCreateInput = {
    id?: string
    visitedAt?: Date | string
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutVisitRecordsInput
    items?: VisitRecordItemCreateNestedManyWithoutVisitRecordInput
  }

  export type VisitRecordUncheckedCreateInput = {
    id?: string
    customerId: string
    visitedAt?: Date | string
    createdAt?: Date | string
    items?: VisitRecordItemUncheckedCreateNestedManyWithoutVisitRecordInput
  }

  export type VisitRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutVisitRecordsNestedInput
    items?: VisitRecordItemUpdateManyWithoutVisitRecordNestedInput
  }

  export type VisitRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VisitRecordItemUncheckedUpdateManyWithoutVisitRecordNestedInput
  }

  export type VisitRecordCreateManyInput = {
    id?: string
    customerId: string
    visitedAt?: Date | string
    createdAt?: Date | string
  }

  export type VisitRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordItemCreateInput = {
    id?: string
    quantity: number
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutVisitItemsInput
    visitRecord: VisitRecordCreateNestedOneWithoutItemsInput
  }

  export type VisitRecordItemUncheckedCreateInput = {
    id?: string
    visitRecordId: string
    productId: string
    quantity: number
    createdAt?: Date | string
  }

  export type VisitRecordItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVisitItemsNestedInput
    visitRecord?: VisitRecordUpdateOneRequiredWithoutItemsNestedInput
  }

  export type VisitRecordItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitRecordId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordItemCreateManyInput = {
    id?: string
    visitRecordId: string
    productId: string
    quantity: number
    createdAt?: Date | string
  }

  export type VisitRecordItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitRecordId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisposalRecordCreateInput = {
    id?: string
    quantity: number
    reason?: string | null
    disposedAt?: Date | string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutDisposalsInput
  }

  export type DisposalRecordUncheckedCreateInput = {
    id?: string
    productId: string
    quantity: number
    reason?: string | null
    disposedAt?: Date | string
    createdAt?: Date | string
  }

  export type DisposalRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    disposedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDisposalsNestedInput
  }

  export type DisposalRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    disposedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisposalRecordCreateManyInput = {
    id?: string
    productId: string
    quantity: number
    reason?: string | null
    disposedAt?: Date | string
    createdAt?: Date | string
  }

  export type DisposalRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    disposedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisposalRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    disposedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CustomerRequirementListRelationFilter = {
    every?: CustomerRequirementWhereInput
    some?: CustomerRequirementWhereInput
    none?: CustomerRequirementWhereInput
  }

  export type VisitRecordListRelationFilter = {
    every?: VisitRecordWhereInput
    some?: VisitRecordWhereInput
    none?: VisitRecordWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CustomerRequirementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VisitRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameKana?: SortOrder
    visitInterval?: SortOrder
    lastVisitDate?: SortOrder
    nextVisitDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    visitInterval?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameKana?: SortOrder
    visitInterval?: SortOrder
    lastVisitDate?: SortOrder
    nextVisitDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameKana?: SortOrder
    visitInterval?: SortOrder
    lastVisitDate?: SortOrder
    nextVisitDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    visitInterval?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PurchaseRecordListRelationFilter = {
    every?: PurchaseRecordWhereInput
    some?: PurchaseRecordWhereInput
    none?: PurchaseRecordWhereInput
  }

  export type VisitRecordItemListRelationFilter = {
    every?: VisitRecordItemWhereInput
    some?: VisitRecordItemWhereInput
    none?: VisitRecordItemWhereInput
  }

  export type DisposalRecordListRelationFilter = {
    every?: DisposalRecordWhereInput
    some?: DisposalRecordWhereInput
    none?: DisposalRecordWhereInput
  }

  export type PurchaseRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VisitRecordItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DisposalRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    currentStock?: SortOrder
    unit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    currentStock?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    currentStock?: SortOrder
    unit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    currentStock?: SortOrder
    unit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    currentStock?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type CustomerRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type CustomerRequirementCustomerIdProductIdCompoundUniqueInput = {
    customerId: string
    productId: string
  }

  export type CustomerRequirementCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerRequirementAvgOrderByAggregateInput = {
    quantity?: SortOrder
    sortOrder?: SortOrder
  }

  export type CustomerRequirementMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerRequirementMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerRequirementSumOrderByAggregateInput = {
    quantity?: SortOrder
    sortOrder?: SortOrder
  }

  export type PurchaseRecordCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    wholesaler?: SortOrder
    purchasedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PurchaseRecordAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type PurchaseRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    wholesaler?: SortOrder
    purchasedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PurchaseRecordMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    wholesaler?: SortOrder
    purchasedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PurchaseRecordSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type VisitRecordCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VisitRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VisitRecordMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    visitedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VisitRecordRelationFilter = {
    is?: VisitRecordWhereInput
    isNot?: VisitRecordWhereInput
  }

  export type VisitRecordItemCountOrderByAggregateInput = {
    id?: SortOrder
    visitRecordId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type VisitRecordItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type VisitRecordItemMaxOrderByAggregateInput = {
    id?: SortOrder
    visitRecordId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type VisitRecordItemMinOrderByAggregateInput = {
    id?: SortOrder
    visitRecordId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type VisitRecordItemSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type DisposalRecordCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    disposedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DisposalRecordAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type DisposalRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    disposedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DisposalRecordMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    reason?: SortOrder
    disposedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DisposalRecordSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CustomerRequirementCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerRequirementCreateWithoutCustomerInput, CustomerRequirementUncheckedCreateWithoutCustomerInput> | CustomerRequirementCreateWithoutCustomerInput[] | CustomerRequirementUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerRequirementCreateOrConnectWithoutCustomerInput | CustomerRequirementCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerRequirementCreateManyCustomerInputEnvelope
    connect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
  }

  export type VisitRecordCreateNestedManyWithoutCustomerInput = {
    create?: XOR<VisitRecordCreateWithoutCustomerInput, VisitRecordUncheckedCreateWithoutCustomerInput> | VisitRecordCreateWithoutCustomerInput[] | VisitRecordUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VisitRecordCreateOrConnectWithoutCustomerInput | VisitRecordCreateOrConnectWithoutCustomerInput[]
    createMany?: VisitRecordCreateManyCustomerInputEnvelope
    connect?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
  }

  export type CustomerRequirementUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CustomerRequirementCreateWithoutCustomerInput, CustomerRequirementUncheckedCreateWithoutCustomerInput> | CustomerRequirementCreateWithoutCustomerInput[] | CustomerRequirementUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerRequirementCreateOrConnectWithoutCustomerInput | CustomerRequirementCreateOrConnectWithoutCustomerInput[]
    createMany?: CustomerRequirementCreateManyCustomerInputEnvelope
    connect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
  }

  export type VisitRecordUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<VisitRecordCreateWithoutCustomerInput, VisitRecordUncheckedCreateWithoutCustomerInput> | VisitRecordCreateWithoutCustomerInput[] | VisitRecordUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VisitRecordCreateOrConnectWithoutCustomerInput | VisitRecordCreateOrConnectWithoutCustomerInput[]
    createMany?: VisitRecordCreateManyCustomerInputEnvelope
    connect?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CustomerRequirementUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerRequirementCreateWithoutCustomerInput, CustomerRequirementUncheckedCreateWithoutCustomerInput> | CustomerRequirementCreateWithoutCustomerInput[] | CustomerRequirementUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerRequirementCreateOrConnectWithoutCustomerInput | CustomerRequirementCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerRequirementUpsertWithWhereUniqueWithoutCustomerInput | CustomerRequirementUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerRequirementCreateManyCustomerInputEnvelope
    set?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    disconnect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    delete?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    connect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    update?: CustomerRequirementUpdateWithWhereUniqueWithoutCustomerInput | CustomerRequirementUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerRequirementUpdateManyWithWhereWithoutCustomerInput | CustomerRequirementUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerRequirementScalarWhereInput | CustomerRequirementScalarWhereInput[]
  }

  export type VisitRecordUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<VisitRecordCreateWithoutCustomerInput, VisitRecordUncheckedCreateWithoutCustomerInput> | VisitRecordCreateWithoutCustomerInput[] | VisitRecordUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VisitRecordCreateOrConnectWithoutCustomerInput | VisitRecordCreateOrConnectWithoutCustomerInput[]
    upsert?: VisitRecordUpsertWithWhereUniqueWithoutCustomerInput | VisitRecordUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: VisitRecordCreateManyCustomerInputEnvelope
    set?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
    disconnect?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
    delete?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
    connect?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
    update?: VisitRecordUpdateWithWhereUniqueWithoutCustomerInput | VisitRecordUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: VisitRecordUpdateManyWithWhereWithoutCustomerInput | VisitRecordUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: VisitRecordScalarWhereInput | VisitRecordScalarWhereInput[]
  }

  export type CustomerRequirementUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CustomerRequirementCreateWithoutCustomerInput, CustomerRequirementUncheckedCreateWithoutCustomerInput> | CustomerRequirementCreateWithoutCustomerInput[] | CustomerRequirementUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CustomerRequirementCreateOrConnectWithoutCustomerInput | CustomerRequirementCreateOrConnectWithoutCustomerInput[]
    upsert?: CustomerRequirementUpsertWithWhereUniqueWithoutCustomerInput | CustomerRequirementUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CustomerRequirementCreateManyCustomerInputEnvelope
    set?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    disconnect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    delete?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    connect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    update?: CustomerRequirementUpdateWithWhereUniqueWithoutCustomerInput | CustomerRequirementUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CustomerRequirementUpdateManyWithWhereWithoutCustomerInput | CustomerRequirementUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CustomerRequirementScalarWhereInput | CustomerRequirementScalarWhereInput[]
  }

  export type VisitRecordUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<VisitRecordCreateWithoutCustomerInput, VisitRecordUncheckedCreateWithoutCustomerInput> | VisitRecordCreateWithoutCustomerInput[] | VisitRecordUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VisitRecordCreateOrConnectWithoutCustomerInput | VisitRecordCreateOrConnectWithoutCustomerInput[]
    upsert?: VisitRecordUpsertWithWhereUniqueWithoutCustomerInput | VisitRecordUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: VisitRecordCreateManyCustomerInputEnvelope
    set?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
    disconnect?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
    delete?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
    connect?: VisitRecordWhereUniqueInput | VisitRecordWhereUniqueInput[]
    update?: VisitRecordUpdateWithWhereUniqueWithoutCustomerInput | VisitRecordUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: VisitRecordUpdateManyWithWhereWithoutCustomerInput | VisitRecordUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: VisitRecordScalarWhereInput | VisitRecordScalarWhereInput[]
  }

  export type CustomerRequirementCreateNestedManyWithoutProductInput = {
    create?: XOR<CustomerRequirementCreateWithoutProductInput, CustomerRequirementUncheckedCreateWithoutProductInput> | CustomerRequirementCreateWithoutProductInput[] | CustomerRequirementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CustomerRequirementCreateOrConnectWithoutProductInput | CustomerRequirementCreateOrConnectWithoutProductInput[]
    createMany?: CustomerRequirementCreateManyProductInputEnvelope
    connect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
  }

  export type PurchaseRecordCreateNestedManyWithoutProductInput = {
    create?: XOR<PurchaseRecordCreateWithoutProductInput, PurchaseRecordUncheckedCreateWithoutProductInput> | PurchaseRecordCreateWithoutProductInput[] | PurchaseRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PurchaseRecordCreateOrConnectWithoutProductInput | PurchaseRecordCreateOrConnectWithoutProductInput[]
    createMany?: PurchaseRecordCreateManyProductInputEnvelope
    connect?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
  }

  export type VisitRecordItemCreateNestedManyWithoutProductInput = {
    create?: XOR<VisitRecordItemCreateWithoutProductInput, VisitRecordItemUncheckedCreateWithoutProductInput> | VisitRecordItemCreateWithoutProductInput[] | VisitRecordItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VisitRecordItemCreateOrConnectWithoutProductInput | VisitRecordItemCreateOrConnectWithoutProductInput[]
    createMany?: VisitRecordItemCreateManyProductInputEnvelope
    connect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
  }

  export type DisposalRecordCreateNestedManyWithoutProductInput = {
    create?: XOR<DisposalRecordCreateWithoutProductInput, DisposalRecordUncheckedCreateWithoutProductInput> | DisposalRecordCreateWithoutProductInput[] | DisposalRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: DisposalRecordCreateOrConnectWithoutProductInput | DisposalRecordCreateOrConnectWithoutProductInput[]
    createMany?: DisposalRecordCreateManyProductInputEnvelope
    connect?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
  }

  export type CustomerRequirementUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<CustomerRequirementCreateWithoutProductInput, CustomerRequirementUncheckedCreateWithoutProductInput> | CustomerRequirementCreateWithoutProductInput[] | CustomerRequirementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CustomerRequirementCreateOrConnectWithoutProductInput | CustomerRequirementCreateOrConnectWithoutProductInput[]
    createMany?: CustomerRequirementCreateManyProductInputEnvelope
    connect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
  }

  export type PurchaseRecordUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<PurchaseRecordCreateWithoutProductInput, PurchaseRecordUncheckedCreateWithoutProductInput> | PurchaseRecordCreateWithoutProductInput[] | PurchaseRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PurchaseRecordCreateOrConnectWithoutProductInput | PurchaseRecordCreateOrConnectWithoutProductInput[]
    createMany?: PurchaseRecordCreateManyProductInputEnvelope
    connect?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
  }

  export type VisitRecordItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<VisitRecordItemCreateWithoutProductInput, VisitRecordItemUncheckedCreateWithoutProductInput> | VisitRecordItemCreateWithoutProductInput[] | VisitRecordItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VisitRecordItemCreateOrConnectWithoutProductInput | VisitRecordItemCreateOrConnectWithoutProductInput[]
    createMany?: VisitRecordItemCreateManyProductInputEnvelope
    connect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
  }

  export type DisposalRecordUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<DisposalRecordCreateWithoutProductInput, DisposalRecordUncheckedCreateWithoutProductInput> | DisposalRecordCreateWithoutProductInput[] | DisposalRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: DisposalRecordCreateOrConnectWithoutProductInput | DisposalRecordCreateOrConnectWithoutProductInput[]
    createMany?: DisposalRecordCreateManyProductInputEnvelope
    connect?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CustomerRequirementUpdateManyWithoutProductNestedInput = {
    create?: XOR<CustomerRequirementCreateWithoutProductInput, CustomerRequirementUncheckedCreateWithoutProductInput> | CustomerRequirementCreateWithoutProductInput[] | CustomerRequirementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CustomerRequirementCreateOrConnectWithoutProductInput | CustomerRequirementCreateOrConnectWithoutProductInput[]
    upsert?: CustomerRequirementUpsertWithWhereUniqueWithoutProductInput | CustomerRequirementUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CustomerRequirementCreateManyProductInputEnvelope
    set?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    disconnect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    delete?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    connect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    update?: CustomerRequirementUpdateWithWhereUniqueWithoutProductInput | CustomerRequirementUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CustomerRequirementUpdateManyWithWhereWithoutProductInput | CustomerRequirementUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CustomerRequirementScalarWhereInput | CustomerRequirementScalarWhereInput[]
  }

  export type PurchaseRecordUpdateManyWithoutProductNestedInput = {
    create?: XOR<PurchaseRecordCreateWithoutProductInput, PurchaseRecordUncheckedCreateWithoutProductInput> | PurchaseRecordCreateWithoutProductInput[] | PurchaseRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PurchaseRecordCreateOrConnectWithoutProductInput | PurchaseRecordCreateOrConnectWithoutProductInput[]
    upsert?: PurchaseRecordUpsertWithWhereUniqueWithoutProductInput | PurchaseRecordUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: PurchaseRecordCreateManyProductInputEnvelope
    set?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
    disconnect?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
    delete?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
    connect?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
    update?: PurchaseRecordUpdateWithWhereUniqueWithoutProductInput | PurchaseRecordUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: PurchaseRecordUpdateManyWithWhereWithoutProductInput | PurchaseRecordUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: PurchaseRecordScalarWhereInput | PurchaseRecordScalarWhereInput[]
  }

  export type VisitRecordItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<VisitRecordItemCreateWithoutProductInput, VisitRecordItemUncheckedCreateWithoutProductInput> | VisitRecordItemCreateWithoutProductInput[] | VisitRecordItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VisitRecordItemCreateOrConnectWithoutProductInput | VisitRecordItemCreateOrConnectWithoutProductInput[]
    upsert?: VisitRecordItemUpsertWithWhereUniqueWithoutProductInput | VisitRecordItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: VisitRecordItemCreateManyProductInputEnvelope
    set?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    disconnect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    delete?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    connect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    update?: VisitRecordItemUpdateWithWhereUniqueWithoutProductInput | VisitRecordItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: VisitRecordItemUpdateManyWithWhereWithoutProductInput | VisitRecordItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: VisitRecordItemScalarWhereInput | VisitRecordItemScalarWhereInput[]
  }

  export type DisposalRecordUpdateManyWithoutProductNestedInput = {
    create?: XOR<DisposalRecordCreateWithoutProductInput, DisposalRecordUncheckedCreateWithoutProductInput> | DisposalRecordCreateWithoutProductInput[] | DisposalRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: DisposalRecordCreateOrConnectWithoutProductInput | DisposalRecordCreateOrConnectWithoutProductInput[]
    upsert?: DisposalRecordUpsertWithWhereUniqueWithoutProductInput | DisposalRecordUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: DisposalRecordCreateManyProductInputEnvelope
    set?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
    disconnect?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
    delete?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
    connect?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
    update?: DisposalRecordUpdateWithWhereUniqueWithoutProductInput | DisposalRecordUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: DisposalRecordUpdateManyWithWhereWithoutProductInput | DisposalRecordUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: DisposalRecordScalarWhereInput | DisposalRecordScalarWhereInput[]
  }

  export type CustomerRequirementUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<CustomerRequirementCreateWithoutProductInput, CustomerRequirementUncheckedCreateWithoutProductInput> | CustomerRequirementCreateWithoutProductInput[] | CustomerRequirementUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CustomerRequirementCreateOrConnectWithoutProductInput | CustomerRequirementCreateOrConnectWithoutProductInput[]
    upsert?: CustomerRequirementUpsertWithWhereUniqueWithoutProductInput | CustomerRequirementUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CustomerRequirementCreateManyProductInputEnvelope
    set?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    disconnect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    delete?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    connect?: CustomerRequirementWhereUniqueInput | CustomerRequirementWhereUniqueInput[]
    update?: CustomerRequirementUpdateWithWhereUniqueWithoutProductInput | CustomerRequirementUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CustomerRequirementUpdateManyWithWhereWithoutProductInput | CustomerRequirementUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CustomerRequirementScalarWhereInput | CustomerRequirementScalarWhereInput[]
  }

  export type PurchaseRecordUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<PurchaseRecordCreateWithoutProductInput, PurchaseRecordUncheckedCreateWithoutProductInput> | PurchaseRecordCreateWithoutProductInput[] | PurchaseRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PurchaseRecordCreateOrConnectWithoutProductInput | PurchaseRecordCreateOrConnectWithoutProductInput[]
    upsert?: PurchaseRecordUpsertWithWhereUniqueWithoutProductInput | PurchaseRecordUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: PurchaseRecordCreateManyProductInputEnvelope
    set?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
    disconnect?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
    delete?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
    connect?: PurchaseRecordWhereUniqueInput | PurchaseRecordWhereUniqueInput[]
    update?: PurchaseRecordUpdateWithWhereUniqueWithoutProductInput | PurchaseRecordUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: PurchaseRecordUpdateManyWithWhereWithoutProductInput | PurchaseRecordUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: PurchaseRecordScalarWhereInput | PurchaseRecordScalarWhereInput[]
  }

  export type VisitRecordItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<VisitRecordItemCreateWithoutProductInput, VisitRecordItemUncheckedCreateWithoutProductInput> | VisitRecordItemCreateWithoutProductInput[] | VisitRecordItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: VisitRecordItemCreateOrConnectWithoutProductInput | VisitRecordItemCreateOrConnectWithoutProductInput[]
    upsert?: VisitRecordItemUpsertWithWhereUniqueWithoutProductInput | VisitRecordItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: VisitRecordItemCreateManyProductInputEnvelope
    set?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    disconnect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    delete?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    connect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    update?: VisitRecordItemUpdateWithWhereUniqueWithoutProductInput | VisitRecordItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: VisitRecordItemUpdateManyWithWhereWithoutProductInput | VisitRecordItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: VisitRecordItemScalarWhereInput | VisitRecordItemScalarWhereInput[]
  }

  export type DisposalRecordUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<DisposalRecordCreateWithoutProductInput, DisposalRecordUncheckedCreateWithoutProductInput> | DisposalRecordCreateWithoutProductInput[] | DisposalRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: DisposalRecordCreateOrConnectWithoutProductInput | DisposalRecordCreateOrConnectWithoutProductInput[]
    upsert?: DisposalRecordUpsertWithWhereUniqueWithoutProductInput | DisposalRecordUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: DisposalRecordCreateManyProductInputEnvelope
    set?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
    disconnect?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
    delete?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
    connect?: DisposalRecordWhereUniqueInput | DisposalRecordWhereUniqueInput[]
    update?: DisposalRecordUpdateWithWhereUniqueWithoutProductInput | DisposalRecordUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: DisposalRecordUpdateManyWithWhereWithoutProductInput | DisposalRecordUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: DisposalRecordScalarWhereInput | DisposalRecordScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutRequirementsInput = {
    create?: XOR<ProductCreateWithoutRequirementsInput, ProductUncheckedCreateWithoutRequirementsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutRequirementsInput
    connect?: ProductWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutRequirementsInput = {
    create?: XOR<CustomerCreateWithoutRequirementsInput, CustomerUncheckedCreateWithoutRequirementsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutRequirementsInput
    connect?: CustomerWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutRequirementsNestedInput = {
    create?: XOR<ProductCreateWithoutRequirementsInput, ProductUncheckedCreateWithoutRequirementsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutRequirementsInput
    upsert?: ProductUpsertWithoutRequirementsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutRequirementsInput, ProductUpdateWithoutRequirementsInput>, ProductUncheckedUpdateWithoutRequirementsInput>
  }

  export type CustomerUpdateOneRequiredWithoutRequirementsNestedInput = {
    create?: XOR<CustomerCreateWithoutRequirementsInput, CustomerUncheckedCreateWithoutRequirementsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutRequirementsInput
    upsert?: CustomerUpsertWithoutRequirementsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutRequirementsInput, CustomerUpdateWithoutRequirementsInput>, CustomerUncheckedUpdateWithoutRequirementsInput>
  }

  export type ProductCreateNestedOneWithoutPurchasesInput = {
    create?: XOR<ProductCreateWithoutPurchasesInput, ProductUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPurchasesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutPurchasesNestedInput = {
    create?: XOR<ProductCreateWithoutPurchasesInput, ProductUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPurchasesInput
    upsert?: ProductUpsertWithoutPurchasesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutPurchasesInput, ProductUpdateWithoutPurchasesInput>, ProductUncheckedUpdateWithoutPurchasesInput>
  }

  export type CustomerCreateNestedOneWithoutVisitRecordsInput = {
    create?: XOR<CustomerCreateWithoutVisitRecordsInput, CustomerUncheckedCreateWithoutVisitRecordsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutVisitRecordsInput
    connect?: CustomerWhereUniqueInput
  }

  export type VisitRecordItemCreateNestedManyWithoutVisitRecordInput = {
    create?: XOR<VisitRecordItemCreateWithoutVisitRecordInput, VisitRecordItemUncheckedCreateWithoutVisitRecordInput> | VisitRecordItemCreateWithoutVisitRecordInput[] | VisitRecordItemUncheckedCreateWithoutVisitRecordInput[]
    connectOrCreate?: VisitRecordItemCreateOrConnectWithoutVisitRecordInput | VisitRecordItemCreateOrConnectWithoutVisitRecordInput[]
    createMany?: VisitRecordItemCreateManyVisitRecordInputEnvelope
    connect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
  }

  export type VisitRecordItemUncheckedCreateNestedManyWithoutVisitRecordInput = {
    create?: XOR<VisitRecordItemCreateWithoutVisitRecordInput, VisitRecordItemUncheckedCreateWithoutVisitRecordInput> | VisitRecordItemCreateWithoutVisitRecordInput[] | VisitRecordItemUncheckedCreateWithoutVisitRecordInput[]
    connectOrCreate?: VisitRecordItemCreateOrConnectWithoutVisitRecordInput | VisitRecordItemCreateOrConnectWithoutVisitRecordInput[]
    createMany?: VisitRecordItemCreateManyVisitRecordInputEnvelope
    connect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
  }

  export type CustomerUpdateOneRequiredWithoutVisitRecordsNestedInput = {
    create?: XOR<CustomerCreateWithoutVisitRecordsInput, CustomerUncheckedCreateWithoutVisitRecordsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutVisitRecordsInput
    upsert?: CustomerUpsertWithoutVisitRecordsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutVisitRecordsInput, CustomerUpdateWithoutVisitRecordsInput>, CustomerUncheckedUpdateWithoutVisitRecordsInput>
  }

  export type VisitRecordItemUpdateManyWithoutVisitRecordNestedInput = {
    create?: XOR<VisitRecordItemCreateWithoutVisitRecordInput, VisitRecordItemUncheckedCreateWithoutVisitRecordInput> | VisitRecordItemCreateWithoutVisitRecordInput[] | VisitRecordItemUncheckedCreateWithoutVisitRecordInput[]
    connectOrCreate?: VisitRecordItemCreateOrConnectWithoutVisitRecordInput | VisitRecordItemCreateOrConnectWithoutVisitRecordInput[]
    upsert?: VisitRecordItemUpsertWithWhereUniqueWithoutVisitRecordInput | VisitRecordItemUpsertWithWhereUniqueWithoutVisitRecordInput[]
    createMany?: VisitRecordItemCreateManyVisitRecordInputEnvelope
    set?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    disconnect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    delete?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    connect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    update?: VisitRecordItemUpdateWithWhereUniqueWithoutVisitRecordInput | VisitRecordItemUpdateWithWhereUniqueWithoutVisitRecordInput[]
    updateMany?: VisitRecordItemUpdateManyWithWhereWithoutVisitRecordInput | VisitRecordItemUpdateManyWithWhereWithoutVisitRecordInput[]
    deleteMany?: VisitRecordItemScalarWhereInput | VisitRecordItemScalarWhereInput[]
  }

  export type VisitRecordItemUncheckedUpdateManyWithoutVisitRecordNestedInput = {
    create?: XOR<VisitRecordItemCreateWithoutVisitRecordInput, VisitRecordItemUncheckedCreateWithoutVisitRecordInput> | VisitRecordItemCreateWithoutVisitRecordInput[] | VisitRecordItemUncheckedCreateWithoutVisitRecordInput[]
    connectOrCreate?: VisitRecordItemCreateOrConnectWithoutVisitRecordInput | VisitRecordItemCreateOrConnectWithoutVisitRecordInput[]
    upsert?: VisitRecordItemUpsertWithWhereUniqueWithoutVisitRecordInput | VisitRecordItemUpsertWithWhereUniqueWithoutVisitRecordInput[]
    createMany?: VisitRecordItemCreateManyVisitRecordInputEnvelope
    set?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    disconnect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    delete?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    connect?: VisitRecordItemWhereUniqueInput | VisitRecordItemWhereUniqueInput[]
    update?: VisitRecordItemUpdateWithWhereUniqueWithoutVisitRecordInput | VisitRecordItemUpdateWithWhereUniqueWithoutVisitRecordInput[]
    updateMany?: VisitRecordItemUpdateManyWithWhereWithoutVisitRecordInput | VisitRecordItemUpdateManyWithWhereWithoutVisitRecordInput[]
    deleteMany?: VisitRecordItemScalarWhereInput | VisitRecordItemScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutVisitItemsInput = {
    create?: XOR<ProductCreateWithoutVisitItemsInput, ProductUncheckedCreateWithoutVisitItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVisitItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type VisitRecordCreateNestedOneWithoutItemsInput = {
    create?: XOR<VisitRecordCreateWithoutItemsInput, VisitRecordUncheckedCreateWithoutItemsInput>
    connectOrCreate?: VisitRecordCreateOrConnectWithoutItemsInput
    connect?: VisitRecordWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutVisitItemsNestedInput = {
    create?: XOR<ProductCreateWithoutVisitItemsInput, ProductUncheckedCreateWithoutVisitItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVisitItemsInput
    upsert?: ProductUpsertWithoutVisitItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutVisitItemsInput, ProductUpdateWithoutVisitItemsInput>, ProductUncheckedUpdateWithoutVisitItemsInput>
  }

  export type VisitRecordUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<VisitRecordCreateWithoutItemsInput, VisitRecordUncheckedCreateWithoutItemsInput>
    connectOrCreate?: VisitRecordCreateOrConnectWithoutItemsInput
    upsert?: VisitRecordUpsertWithoutItemsInput
    connect?: VisitRecordWhereUniqueInput
    update?: XOR<XOR<VisitRecordUpdateToOneWithWhereWithoutItemsInput, VisitRecordUpdateWithoutItemsInput>, VisitRecordUncheckedUpdateWithoutItemsInput>
  }

  export type ProductCreateNestedOneWithoutDisposalsInput = {
    create?: XOR<ProductCreateWithoutDisposalsInput, ProductUncheckedCreateWithoutDisposalsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDisposalsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutDisposalsNestedInput = {
    create?: XOR<ProductCreateWithoutDisposalsInput, ProductUncheckedCreateWithoutDisposalsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDisposalsInput
    upsert?: ProductUpsertWithoutDisposalsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutDisposalsInput, ProductUpdateWithoutDisposalsInput>, ProductUncheckedUpdateWithoutDisposalsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CustomerRequirementCreateWithoutCustomerInput = {
    id?: string
    quantity: number
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutRequirementsInput
  }

  export type CustomerRequirementUncheckedCreateWithoutCustomerInput = {
    id?: string
    productId: string
    quantity: number
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerRequirementCreateOrConnectWithoutCustomerInput = {
    where: CustomerRequirementWhereUniqueInput
    create: XOR<CustomerRequirementCreateWithoutCustomerInput, CustomerRequirementUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerRequirementCreateManyCustomerInputEnvelope = {
    data: CustomerRequirementCreateManyCustomerInput | CustomerRequirementCreateManyCustomerInput[]
  }

  export type VisitRecordCreateWithoutCustomerInput = {
    id?: string
    visitedAt?: Date | string
    createdAt?: Date | string
    items?: VisitRecordItemCreateNestedManyWithoutVisitRecordInput
  }

  export type VisitRecordUncheckedCreateWithoutCustomerInput = {
    id?: string
    visitedAt?: Date | string
    createdAt?: Date | string
    items?: VisitRecordItemUncheckedCreateNestedManyWithoutVisitRecordInput
  }

  export type VisitRecordCreateOrConnectWithoutCustomerInput = {
    where: VisitRecordWhereUniqueInput
    create: XOR<VisitRecordCreateWithoutCustomerInput, VisitRecordUncheckedCreateWithoutCustomerInput>
  }

  export type VisitRecordCreateManyCustomerInputEnvelope = {
    data: VisitRecordCreateManyCustomerInput | VisitRecordCreateManyCustomerInput[]
  }

  export type CustomerRequirementUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CustomerRequirementWhereUniqueInput
    update: XOR<CustomerRequirementUpdateWithoutCustomerInput, CustomerRequirementUncheckedUpdateWithoutCustomerInput>
    create: XOR<CustomerRequirementCreateWithoutCustomerInput, CustomerRequirementUncheckedCreateWithoutCustomerInput>
  }

  export type CustomerRequirementUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CustomerRequirementWhereUniqueInput
    data: XOR<CustomerRequirementUpdateWithoutCustomerInput, CustomerRequirementUncheckedUpdateWithoutCustomerInput>
  }

  export type CustomerRequirementUpdateManyWithWhereWithoutCustomerInput = {
    where: CustomerRequirementScalarWhereInput
    data: XOR<CustomerRequirementUpdateManyMutationInput, CustomerRequirementUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CustomerRequirementScalarWhereInput = {
    AND?: CustomerRequirementScalarWhereInput | CustomerRequirementScalarWhereInput[]
    OR?: CustomerRequirementScalarWhereInput[]
    NOT?: CustomerRequirementScalarWhereInput | CustomerRequirementScalarWhereInput[]
    id?: StringFilter<"CustomerRequirement"> | string
    customerId?: StringFilter<"CustomerRequirement"> | string
    productId?: StringFilter<"CustomerRequirement"> | string
    quantity?: FloatFilter<"CustomerRequirement"> | number
    sortOrder?: IntFilter<"CustomerRequirement"> | number
    createdAt?: DateTimeFilter<"CustomerRequirement"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerRequirement"> | Date | string
  }

  export type VisitRecordUpsertWithWhereUniqueWithoutCustomerInput = {
    where: VisitRecordWhereUniqueInput
    update: XOR<VisitRecordUpdateWithoutCustomerInput, VisitRecordUncheckedUpdateWithoutCustomerInput>
    create: XOR<VisitRecordCreateWithoutCustomerInput, VisitRecordUncheckedCreateWithoutCustomerInput>
  }

  export type VisitRecordUpdateWithWhereUniqueWithoutCustomerInput = {
    where: VisitRecordWhereUniqueInput
    data: XOR<VisitRecordUpdateWithoutCustomerInput, VisitRecordUncheckedUpdateWithoutCustomerInput>
  }

  export type VisitRecordUpdateManyWithWhereWithoutCustomerInput = {
    where: VisitRecordScalarWhereInput
    data: XOR<VisitRecordUpdateManyMutationInput, VisitRecordUncheckedUpdateManyWithoutCustomerInput>
  }

  export type VisitRecordScalarWhereInput = {
    AND?: VisitRecordScalarWhereInput | VisitRecordScalarWhereInput[]
    OR?: VisitRecordScalarWhereInput[]
    NOT?: VisitRecordScalarWhereInput | VisitRecordScalarWhereInput[]
    id?: StringFilter<"VisitRecord"> | string
    customerId?: StringFilter<"VisitRecord"> | string
    visitedAt?: DateTimeFilter<"VisitRecord"> | Date | string
    createdAt?: DateTimeFilter<"VisitRecord"> | Date | string
  }

  export type CustomerRequirementCreateWithoutProductInput = {
    id?: string
    quantity: number
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutRequirementsInput
  }

  export type CustomerRequirementUncheckedCreateWithoutProductInput = {
    id?: string
    customerId: string
    quantity: number
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerRequirementCreateOrConnectWithoutProductInput = {
    where: CustomerRequirementWhereUniqueInput
    create: XOR<CustomerRequirementCreateWithoutProductInput, CustomerRequirementUncheckedCreateWithoutProductInput>
  }

  export type CustomerRequirementCreateManyProductInputEnvelope = {
    data: CustomerRequirementCreateManyProductInput | CustomerRequirementCreateManyProductInput[]
  }

  export type PurchaseRecordCreateWithoutProductInput = {
    id?: string
    quantity: number
    wholesaler: string
    purchasedAt?: Date | string
    createdAt?: Date | string
  }

  export type PurchaseRecordUncheckedCreateWithoutProductInput = {
    id?: string
    quantity: number
    wholesaler: string
    purchasedAt?: Date | string
    createdAt?: Date | string
  }

  export type PurchaseRecordCreateOrConnectWithoutProductInput = {
    where: PurchaseRecordWhereUniqueInput
    create: XOR<PurchaseRecordCreateWithoutProductInput, PurchaseRecordUncheckedCreateWithoutProductInput>
  }

  export type PurchaseRecordCreateManyProductInputEnvelope = {
    data: PurchaseRecordCreateManyProductInput | PurchaseRecordCreateManyProductInput[]
  }

  export type VisitRecordItemCreateWithoutProductInput = {
    id?: string
    quantity: number
    createdAt?: Date | string
    visitRecord: VisitRecordCreateNestedOneWithoutItemsInput
  }

  export type VisitRecordItemUncheckedCreateWithoutProductInput = {
    id?: string
    visitRecordId: string
    quantity: number
    createdAt?: Date | string
  }

  export type VisitRecordItemCreateOrConnectWithoutProductInput = {
    where: VisitRecordItemWhereUniqueInput
    create: XOR<VisitRecordItemCreateWithoutProductInput, VisitRecordItemUncheckedCreateWithoutProductInput>
  }

  export type VisitRecordItemCreateManyProductInputEnvelope = {
    data: VisitRecordItemCreateManyProductInput | VisitRecordItemCreateManyProductInput[]
  }

  export type DisposalRecordCreateWithoutProductInput = {
    id?: string
    quantity: number
    reason?: string | null
    disposedAt?: Date | string
    createdAt?: Date | string
  }

  export type DisposalRecordUncheckedCreateWithoutProductInput = {
    id?: string
    quantity: number
    reason?: string | null
    disposedAt?: Date | string
    createdAt?: Date | string
  }

  export type DisposalRecordCreateOrConnectWithoutProductInput = {
    where: DisposalRecordWhereUniqueInput
    create: XOR<DisposalRecordCreateWithoutProductInput, DisposalRecordUncheckedCreateWithoutProductInput>
  }

  export type DisposalRecordCreateManyProductInputEnvelope = {
    data: DisposalRecordCreateManyProductInput | DisposalRecordCreateManyProductInput[]
  }

  export type CustomerRequirementUpsertWithWhereUniqueWithoutProductInput = {
    where: CustomerRequirementWhereUniqueInput
    update: XOR<CustomerRequirementUpdateWithoutProductInput, CustomerRequirementUncheckedUpdateWithoutProductInput>
    create: XOR<CustomerRequirementCreateWithoutProductInput, CustomerRequirementUncheckedCreateWithoutProductInput>
  }

  export type CustomerRequirementUpdateWithWhereUniqueWithoutProductInput = {
    where: CustomerRequirementWhereUniqueInput
    data: XOR<CustomerRequirementUpdateWithoutProductInput, CustomerRequirementUncheckedUpdateWithoutProductInput>
  }

  export type CustomerRequirementUpdateManyWithWhereWithoutProductInput = {
    where: CustomerRequirementScalarWhereInput
    data: XOR<CustomerRequirementUpdateManyMutationInput, CustomerRequirementUncheckedUpdateManyWithoutProductInput>
  }

  export type PurchaseRecordUpsertWithWhereUniqueWithoutProductInput = {
    where: PurchaseRecordWhereUniqueInput
    update: XOR<PurchaseRecordUpdateWithoutProductInput, PurchaseRecordUncheckedUpdateWithoutProductInput>
    create: XOR<PurchaseRecordCreateWithoutProductInput, PurchaseRecordUncheckedCreateWithoutProductInput>
  }

  export type PurchaseRecordUpdateWithWhereUniqueWithoutProductInput = {
    where: PurchaseRecordWhereUniqueInput
    data: XOR<PurchaseRecordUpdateWithoutProductInput, PurchaseRecordUncheckedUpdateWithoutProductInput>
  }

  export type PurchaseRecordUpdateManyWithWhereWithoutProductInput = {
    where: PurchaseRecordScalarWhereInput
    data: XOR<PurchaseRecordUpdateManyMutationInput, PurchaseRecordUncheckedUpdateManyWithoutProductInput>
  }

  export type PurchaseRecordScalarWhereInput = {
    AND?: PurchaseRecordScalarWhereInput | PurchaseRecordScalarWhereInput[]
    OR?: PurchaseRecordScalarWhereInput[]
    NOT?: PurchaseRecordScalarWhereInput | PurchaseRecordScalarWhereInput[]
    id?: StringFilter<"PurchaseRecord"> | string
    productId?: StringFilter<"PurchaseRecord"> | string
    quantity?: FloatFilter<"PurchaseRecord"> | number
    wholesaler?: StringFilter<"PurchaseRecord"> | string
    purchasedAt?: DateTimeFilter<"PurchaseRecord"> | Date | string
    createdAt?: DateTimeFilter<"PurchaseRecord"> | Date | string
  }

  export type VisitRecordItemUpsertWithWhereUniqueWithoutProductInput = {
    where: VisitRecordItemWhereUniqueInput
    update: XOR<VisitRecordItemUpdateWithoutProductInput, VisitRecordItemUncheckedUpdateWithoutProductInput>
    create: XOR<VisitRecordItemCreateWithoutProductInput, VisitRecordItemUncheckedCreateWithoutProductInput>
  }

  export type VisitRecordItemUpdateWithWhereUniqueWithoutProductInput = {
    where: VisitRecordItemWhereUniqueInput
    data: XOR<VisitRecordItemUpdateWithoutProductInput, VisitRecordItemUncheckedUpdateWithoutProductInput>
  }

  export type VisitRecordItemUpdateManyWithWhereWithoutProductInput = {
    where: VisitRecordItemScalarWhereInput
    data: XOR<VisitRecordItemUpdateManyMutationInput, VisitRecordItemUncheckedUpdateManyWithoutProductInput>
  }

  export type VisitRecordItemScalarWhereInput = {
    AND?: VisitRecordItemScalarWhereInput | VisitRecordItemScalarWhereInput[]
    OR?: VisitRecordItemScalarWhereInput[]
    NOT?: VisitRecordItemScalarWhereInput | VisitRecordItemScalarWhereInput[]
    id?: StringFilter<"VisitRecordItem"> | string
    visitRecordId?: StringFilter<"VisitRecordItem"> | string
    productId?: StringFilter<"VisitRecordItem"> | string
    quantity?: FloatFilter<"VisitRecordItem"> | number
    createdAt?: DateTimeFilter<"VisitRecordItem"> | Date | string
  }

  export type DisposalRecordUpsertWithWhereUniqueWithoutProductInput = {
    where: DisposalRecordWhereUniqueInput
    update: XOR<DisposalRecordUpdateWithoutProductInput, DisposalRecordUncheckedUpdateWithoutProductInput>
    create: XOR<DisposalRecordCreateWithoutProductInput, DisposalRecordUncheckedCreateWithoutProductInput>
  }

  export type DisposalRecordUpdateWithWhereUniqueWithoutProductInput = {
    where: DisposalRecordWhereUniqueInput
    data: XOR<DisposalRecordUpdateWithoutProductInput, DisposalRecordUncheckedUpdateWithoutProductInput>
  }

  export type DisposalRecordUpdateManyWithWhereWithoutProductInput = {
    where: DisposalRecordScalarWhereInput
    data: XOR<DisposalRecordUpdateManyMutationInput, DisposalRecordUncheckedUpdateManyWithoutProductInput>
  }

  export type DisposalRecordScalarWhereInput = {
    AND?: DisposalRecordScalarWhereInput | DisposalRecordScalarWhereInput[]
    OR?: DisposalRecordScalarWhereInput[]
    NOT?: DisposalRecordScalarWhereInput | DisposalRecordScalarWhereInput[]
    id?: StringFilter<"DisposalRecord"> | string
    productId?: StringFilter<"DisposalRecord"> | string
    quantity?: FloatFilter<"DisposalRecord"> | number
    reason?: StringNullableFilter<"DisposalRecord"> | string | null
    disposedAt?: DateTimeFilter<"DisposalRecord"> | Date | string
    createdAt?: DateTimeFilter<"DisposalRecord"> | Date | string
  }

  export type ProductCreateWithoutRequirementsInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchases?: PurchaseRecordCreateNestedManyWithoutProductInput
    visitItems?: VisitRecordItemCreateNestedManyWithoutProductInput
    disposals?: DisposalRecordCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutRequirementsInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    purchases?: PurchaseRecordUncheckedCreateNestedManyWithoutProductInput
    visitItems?: VisitRecordItemUncheckedCreateNestedManyWithoutProductInput
    disposals?: DisposalRecordUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutRequirementsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutRequirementsInput, ProductUncheckedCreateWithoutRequirementsInput>
  }

  export type CustomerCreateWithoutRequirementsInput = {
    id?: string
    name: string
    nameKana?: string
    visitInterval: number
    lastVisitDate?: Date | string | null
    nextVisitDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    visitRecords?: VisitRecordCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutRequirementsInput = {
    id?: string
    name: string
    nameKana?: string
    visitInterval: number
    lastVisitDate?: Date | string | null
    nextVisitDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    visitRecords?: VisitRecordUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutRequirementsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutRequirementsInput, CustomerUncheckedCreateWithoutRequirementsInput>
  }

  export type ProductUpsertWithoutRequirementsInput = {
    update: XOR<ProductUpdateWithoutRequirementsInput, ProductUncheckedUpdateWithoutRequirementsInput>
    create: XOR<ProductCreateWithoutRequirementsInput, ProductUncheckedCreateWithoutRequirementsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutRequirementsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutRequirementsInput, ProductUncheckedUpdateWithoutRequirementsInput>
  }

  export type ProductUpdateWithoutRequirementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchases?: PurchaseRecordUpdateManyWithoutProductNestedInput
    visitItems?: VisitRecordItemUpdateManyWithoutProductNestedInput
    disposals?: DisposalRecordUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutRequirementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchases?: PurchaseRecordUncheckedUpdateManyWithoutProductNestedInput
    visitItems?: VisitRecordItemUncheckedUpdateManyWithoutProductNestedInput
    disposals?: DisposalRecordUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CustomerUpsertWithoutRequirementsInput = {
    update: XOR<CustomerUpdateWithoutRequirementsInput, CustomerUncheckedUpdateWithoutRequirementsInput>
    create: XOR<CustomerCreateWithoutRequirementsInput, CustomerUncheckedCreateWithoutRequirementsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutRequirementsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutRequirementsInput, CustomerUncheckedUpdateWithoutRequirementsInput>
  }

  export type CustomerUpdateWithoutRequirementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameKana?: StringFieldUpdateOperationsInput | string
    visitInterval?: IntFieldUpdateOperationsInput | number
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextVisitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitRecords?: VisitRecordUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutRequirementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameKana?: StringFieldUpdateOperationsInput | string
    visitInterval?: IntFieldUpdateOperationsInput | number
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextVisitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitRecords?: VisitRecordUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type ProductCreateWithoutPurchasesInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementCreateNestedManyWithoutProductInput
    visitItems?: VisitRecordItemCreateNestedManyWithoutProductInput
    disposals?: DisposalRecordCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutPurchasesInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementUncheckedCreateNestedManyWithoutProductInput
    visitItems?: VisitRecordItemUncheckedCreateNestedManyWithoutProductInput
    disposals?: DisposalRecordUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutPurchasesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutPurchasesInput, ProductUncheckedCreateWithoutPurchasesInput>
  }

  export type ProductUpsertWithoutPurchasesInput = {
    update: XOR<ProductUpdateWithoutPurchasesInput, ProductUncheckedUpdateWithoutPurchasesInput>
    create: XOR<ProductCreateWithoutPurchasesInput, ProductUncheckedCreateWithoutPurchasesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutPurchasesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutPurchasesInput, ProductUncheckedUpdateWithoutPurchasesInput>
  }

  export type ProductUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUpdateManyWithoutProductNestedInput
    visitItems?: VisitRecordItemUpdateManyWithoutProductNestedInput
    disposals?: DisposalRecordUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUncheckedUpdateManyWithoutProductNestedInput
    visitItems?: VisitRecordItemUncheckedUpdateManyWithoutProductNestedInput
    disposals?: DisposalRecordUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CustomerCreateWithoutVisitRecordsInput = {
    id?: string
    name: string
    nameKana?: string
    visitInterval: number
    lastVisitDate?: Date | string | null
    nextVisitDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutVisitRecordsInput = {
    id?: string
    name: string
    nameKana?: string
    visitInterval: number
    lastVisitDate?: Date | string | null
    nextVisitDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutVisitRecordsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutVisitRecordsInput, CustomerUncheckedCreateWithoutVisitRecordsInput>
  }

  export type VisitRecordItemCreateWithoutVisitRecordInput = {
    id?: string
    quantity: number
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutVisitItemsInput
  }

  export type VisitRecordItemUncheckedCreateWithoutVisitRecordInput = {
    id?: string
    productId: string
    quantity: number
    createdAt?: Date | string
  }

  export type VisitRecordItemCreateOrConnectWithoutVisitRecordInput = {
    where: VisitRecordItemWhereUniqueInput
    create: XOR<VisitRecordItemCreateWithoutVisitRecordInput, VisitRecordItemUncheckedCreateWithoutVisitRecordInput>
  }

  export type VisitRecordItemCreateManyVisitRecordInputEnvelope = {
    data: VisitRecordItemCreateManyVisitRecordInput | VisitRecordItemCreateManyVisitRecordInput[]
  }

  export type CustomerUpsertWithoutVisitRecordsInput = {
    update: XOR<CustomerUpdateWithoutVisitRecordsInput, CustomerUncheckedUpdateWithoutVisitRecordsInput>
    create: XOR<CustomerCreateWithoutVisitRecordsInput, CustomerUncheckedCreateWithoutVisitRecordsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutVisitRecordsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutVisitRecordsInput, CustomerUncheckedUpdateWithoutVisitRecordsInput>
  }

  export type CustomerUpdateWithoutVisitRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameKana?: StringFieldUpdateOperationsInput | string
    visitInterval?: IntFieldUpdateOperationsInput | number
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextVisitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutVisitRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameKana?: StringFieldUpdateOperationsInput | string
    visitInterval?: IntFieldUpdateOperationsInput | number
    lastVisitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextVisitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type VisitRecordItemUpsertWithWhereUniqueWithoutVisitRecordInput = {
    where: VisitRecordItemWhereUniqueInput
    update: XOR<VisitRecordItemUpdateWithoutVisitRecordInput, VisitRecordItemUncheckedUpdateWithoutVisitRecordInput>
    create: XOR<VisitRecordItemCreateWithoutVisitRecordInput, VisitRecordItemUncheckedCreateWithoutVisitRecordInput>
  }

  export type VisitRecordItemUpdateWithWhereUniqueWithoutVisitRecordInput = {
    where: VisitRecordItemWhereUniqueInput
    data: XOR<VisitRecordItemUpdateWithoutVisitRecordInput, VisitRecordItemUncheckedUpdateWithoutVisitRecordInput>
  }

  export type VisitRecordItemUpdateManyWithWhereWithoutVisitRecordInput = {
    where: VisitRecordItemScalarWhereInput
    data: XOR<VisitRecordItemUpdateManyMutationInput, VisitRecordItemUncheckedUpdateManyWithoutVisitRecordInput>
  }

  export type ProductCreateWithoutVisitItemsInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementCreateNestedManyWithoutProductInput
    purchases?: PurchaseRecordCreateNestedManyWithoutProductInput
    disposals?: DisposalRecordCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutVisitItemsInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementUncheckedCreateNestedManyWithoutProductInput
    purchases?: PurchaseRecordUncheckedCreateNestedManyWithoutProductInput
    disposals?: DisposalRecordUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutVisitItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVisitItemsInput, ProductUncheckedCreateWithoutVisitItemsInput>
  }

  export type VisitRecordCreateWithoutItemsInput = {
    id?: string
    visitedAt?: Date | string
    createdAt?: Date | string
    customer: CustomerCreateNestedOneWithoutVisitRecordsInput
  }

  export type VisitRecordUncheckedCreateWithoutItemsInput = {
    id?: string
    customerId: string
    visitedAt?: Date | string
    createdAt?: Date | string
  }

  export type VisitRecordCreateOrConnectWithoutItemsInput = {
    where: VisitRecordWhereUniqueInput
    create: XOR<VisitRecordCreateWithoutItemsInput, VisitRecordUncheckedCreateWithoutItemsInput>
  }

  export type ProductUpsertWithoutVisitItemsInput = {
    update: XOR<ProductUpdateWithoutVisitItemsInput, ProductUncheckedUpdateWithoutVisitItemsInput>
    create: XOR<ProductCreateWithoutVisitItemsInput, ProductUncheckedCreateWithoutVisitItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutVisitItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutVisitItemsInput, ProductUncheckedUpdateWithoutVisitItemsInput>
  }

  export type ProductUpdateWithoutVisitItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUpdateManyWithoutProductNestedInput
    purchases?: PurchaseRecordUpdateManyWithoutProductNestedInput
    disposals?: DisposalRecordUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutVisitItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUncheckedUpdateManyWithoutProductNestedInput
    purchases?: PurchaseRecordUncheckedUpdateManyWithoutProductNestedInput
    disposals?: DisposalRecordUncheckedUpdateManyWithoutProductNestedInput
  }

  export type VisitRecordUpsertWithoutItemsInput = {
    update: XOR<VisitRecordUpdateWithoutItemsInput, VisitRecordUncheckedUpdateWithoutItemsInput>
    create: XOR<VisitRecordCreateWithoutItemsInput, VisitRecordUncheckedCreateWithoutItemsInput>
    where?: VisitRecordWhereInput
  }

  export type VisitRecordUpdateToOneWithWhereWithoutItemsInput = {
    where?: VisitRecordWhereInput
    data: XOR<VisitRecordUpdateWithoutItemsInput, VisitRecordUncheckedUpdateWithoutItemsInput>
  }

  export type VisitRecordUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutVisitRecordsNestedInput
  }

  export type VisitRecordUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateWithoutDisposalsInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementCreateNestedManyWithoutProductInput
    purchases?: PurchaseRecordCreateNestedManyWithoutProductInput
    visitItems?: VisitRecordItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutDisposalsInput = {
    id?: string
    name: string
    currentStock: number
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requirements?: CustomerRequirementUncheckedCreateNestedManyWithoutProductInput
    purchases?: PurchaseRecordUncheckedCreateNestedManyWithoutProductInput
    visitItems?: VisitRecordItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutDisposalsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutDisposalsInput, ProductUncheckedCreateWithoutDisposalsInput>
  }

  export type ProductUpsertWithoutDisposalsInput = {
    update: XOR<ProductUpdateWithoutDisposalsInput, ProductUncheckedUpdateWithoutDisposalsInput>
    create: XOR<ProductCreateWithoutDisposalsInput, ProductUncheckedCreateWithoutDisposalsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutDisposalsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutDisposalsInput, ProductUncheckedUpdateWithoutDisposalsInput>
  }

  export type ProductUpdateWithoutDisposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUpdateManyWithoutProductNestedInput
    purchases?: PurchaseRecordUpdateManyWithoutProductNestedInput
    visitItems?: VisitRecordItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutDisposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currentStock?: FloatFieldUpdateOperationsInput | number
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requirements?: CustomerRequirementUncheckedUpdateManyWithoutProductNestedInput
    purchases?: PurchaseRecordUncheckedUpdateManyWithoutProductNestedInput
    visitItems?: VisitRecordItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CustomerRequirementCreateManyCustomerInput = {
    id?: string
    productId: string
    quantity: number
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VisitRecordCreateManyCustomerInput = {
    id?: string
    visitedAt?: Date | string
    createdAt?: Date | string
  }

  export type CustomerRequirementUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutRequirementsNestedInput
  }

  export type CustomerRequirementUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerRequirementUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VisitRecordItemUpdateManyWithoutVisitRecordNestedInput
  }

  export type VisitRecordUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VisitRecordItemUncheckedUpdateManyWithoutVisitRecordNestedInput
  }

  export type VisitRecordUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerRequirementCreateManyProductInput = {
    id?: string
    customerId: string
    quantity: number
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseRecordCreateManyProductInput = {
    id?: string
    quantity: number
    wholesaler: string
    purchasedAt?: Date | string
    createdAt?: Date | string
  }

  export type VisitRecordItemCreateManyProductInput = {
    id?: string
    visitRecordId: string
    quantity: number
    createdAt?: Date | string
  }

  export type DisposalRecordCreateManyProductInput = {
    id?: string
    quantity: number
    reason?: string | null
    disposedAt?: Date | string
    createdAt?: Date | string
  }

  export type CustomerRequirementUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutRequirementsNestedInput
  }

  export type CustomerRequirementUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerRequirementUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseRecordUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    wholesaler?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseRecordUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    wholesaler?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseRecordUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    wholesaler?: StringFieldUpdateOperationsInput | string
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitRecord?: VisitRecordUpdateOneRequiredWithoutItemsNestedInput
  }

  export type VisitRecordItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitRecordId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    visitRecordId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisposalRecordUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    disposedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisposalRecordUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    disposedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisposalRecordUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    disposedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordItemCreateManyVisitRecordInput = {
    id?: string
    productId: string
    quantity: number
    createdAt?: Date | string
  }

  export type VisitRecordItemUpdateWithoutVisitRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVisitItemsNestedInput
  }

  export type VisitRecordItemUncheckedUpdateWithoutVisitRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VisitRecordItemUncheckedUpdateManyWithoutVisitRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CustomerCountOutputTypeDefaultArgs instead
     */
    export type CustomerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VisitRecordCountOutputTypeDefaultArgs instead
     */
    export type VisitRecordCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VisitRecordCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerDefaultArgs instead
     */
    export type CustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerRequirementDefaultArgs instead
     */
    export type CustomerRequirementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerRequirementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurchaseRecordDefaultArgs instead
     */
    export type PurchaseRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VisitRecordDefaultArgs instead
     */
    export type VisitRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VisitRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VisitRecordItemDefaultArgs instead
     */
    export type VisitRecordItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VisitRecordItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DisposalRecordDefaultArgs instead
     */
    export type DisposalRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DisposalRecordDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}