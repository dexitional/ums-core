
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model activity
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type activity = $Result.DefaultSelection<Prisma.$activityPayload>
/**
 * Model app
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type app = $Result.DefaultSelection<Prisma.$appPayload>
/**
 * Model app_role
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type app_role = $Result.DefaultSelection<Prisma.$app_rolePayload>
/**
 * Model group
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type group = $Result.DefaultSelection<Prisma.$groupPayload>
/**
 * Model photo
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type photo = $Result.DefaultSelection<Prisma.$photoPayload>
/**
 * Model user
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model user_role
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type user_role = $Result.DefaultSelection<Prisma.$user_rolePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Activities
 * const activities = await prisma.activity.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Activities
   * const activities = await prisma.activity.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
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


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.activity`: Exposes CRUD operations for the **activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.activityDelegate<ExtArgs>;

  /**
   * `prisma.app`: Exposes CRUD operations for the **app** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Apps
    * const apps = await prisma.app.findMany()
    * ```
    */
  get app(): Prisma.appDelegate<ExtArgs>;

  /**
   * `prisma.app_role`: Exposes CRUD operations for the **app_role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more App_roles
    * const app_roles = await prisma.app_role.findMany()
    * ```
    */
  get app_role(): Prisma.app_roleDelegate<ExtArgs>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.groupDelegate<ExtArgs>;

  /**
   * `prisma.photo`: Exposes CRUD operations for the **photo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Photos
    * const photos = await prisma.photo.findMany()
    * ```
    */
  get photo(): Prisma.photoDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs>;

  /**
   * `prisma.user_role`: Exposes CRUD operations for the **user_role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_roles
    * const user_roles = await prisma.user_role.findMany()
    * ```
    */
  get user_role(): Prisma.user_roleDelegate<ExtArgs>;
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
   * Prisma Client JS version: 5.3.1
   * Query Engine version: 61e140623197a131c2a6189271ffee05a7aa9a59
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

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
    activity: 'activity',
    app: 'app',
    app_role: 'app_role',
    group: 'group',
    photo: 'photo',
    user: 'user',
    user_role: 'user_role'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'activity' | 'app' | 'app_role' | 'group' | 'photo' | 'user' | 'user_role'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      activity: {
        payload: Prisma.$activityPayload<ExtArgs>
        fields: Prisma.activityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.activityFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.activityFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activityPayload>
          }
          findFirst: {
            args: Prisma.activityFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.activityFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activityPayload>
          }
          findMany: {
            args: Prisma.activityFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activityPayload>[]
          }
          create: {
            args: Prisma.activityCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activityPayload>
          }
          createMany: {
            args: Prisma.activityCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.activityDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activityPayload>
          }
          update: {
            args: Prisma.activityUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activityPayload>
          }
          deleteMany: {
            args: Prisma.activityDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.activityUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.activityUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$activityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.activityGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.activityCountArgs<ExtArgs>,
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      app: {
        payload: Prisma.$appPayload<ExtArgs>
        fields: Prisma.appFieldRefs
        operations: {
          findUnique: {
            args: Prisma.appFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$appPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.appFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$appPayload>
          }
          findFirst: {
            args: Prisma.appFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$appPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.appFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$appPayload>
          }
          findMany: {
            args: Prisma.appFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$appPayload>[]
          }
          create: {
            args: Prisma.appCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$appPayload>
          }
          createMany: {
            args: Prisma.appCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.appDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$appPayload>
          }
          update: {
            args: Prisma.appUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$appPayload>
          }
          deleteMany: {
            args: Prisma.appDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.appUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.appUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$appPayload>
          }
          aggregate: {
            args: Prisma.AppAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateApp>
          }
          groupBy: {
            args: Prisma.appGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AppGroupByOutputType>[]
          }
          count: {
            args: Prisma.appCountArgs<ExtArgs>,
            result: $Utils.Optional<AppCountAggregateOutputType> | number
          }
        }
      }
      app_role: {
        payload: Prisma.$app_rolePayload<ExtArgs>
        fields: Prisma.app_roleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.app_roleFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$app_rolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.app_roleFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$app_rolePayload>
          }
          findFirst: {
            args: Prisma.app_roleFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$app_rolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.app_roleFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$app_rolePayload>
          }
          findMany: {
            args: Prisma.app_roleFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$app_rolePayload>[]
          }
          create: {
            args: Prisma.app_roleCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$app_rolePayload>
          }
          createMany: {
            args: Prisma.app_roleCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.app_roleDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$app_rolePayload>
          }
          update: {
            args: Prisma.app_roleUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$app_rolePayload>
          }
          deleteMany: {
            args: Prisma.app_roleDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.app_roleUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.app_roleUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$app_rolePayload>
          }
          aggregate: {
            args: Prisma.App_roleAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateApp_role>
          }
          groupBy: {
            args: Prisma.app_roleGroupByArgs<ExtArgs>,
            result: $Utils.Optional<App_roleGroupByOutputType>[]
          }
          count: {
            args: Prisma.app_roleCountArgs<ExtArgs>,
            result: $Utils.Optional<App_roleCountAggregateOutputType> | number
          }
        }
      }
      group: {
        payload: Prisma.$groupPayload<ExtArgs>
        fields: Prisma.groupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.groupFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$groupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.groupFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          findFirst: {
            args: Prisma.groupFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$groupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.groupFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          findMany: {
            args: Prisma.groupFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$groupPayload>[]
          }
          create: {
            args: Prisma.groupCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          createMany: {
            args: Prisma.groupCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.groupDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          update: {
            args: Prisma.groupUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          deleteMany: {
            args: Prisma.groupDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.groupUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.groupUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.groupGroupByArgs<ExtArgs>,
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.groupCountArgs<ExtArgs>,
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      photo: {
        payload: Prisma.$photoPayload<ExtArgs>
        fields: Prisma.photoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.photoFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$photoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.photoFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$photoPayload>
          }
          findFirst: {
            args: Prisma.photoFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$photoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.photoFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$photoPayload>
          }
          findMany: {
            args: Prisma.photoFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$photoPayload>[]
          }
          create: {
            args: Prisma.photoCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$photoPayload>
          }
          createMany: {
            args: Prisma.photoCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.photoDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$photoPayload>
          }
          update: {
            args: Prisma.photoUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$photoPayload>
          }
          deleteMany: {
            args: Prisma.photoDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.photoUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.photoUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$photoPayload>
          }
          aggregate: {
            args: Prisma.PhotoAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePhoto>
          }
          groupBy: {
            args: Prisma.photoGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.photoCountArgs<ExtArgs>,
            result: $Utils.Optional<PhotoCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      user_role: {
        payload: Prisma.$user_rolePayload<ExtArgs>
        fields: Prisma.user_roleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_roleFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$user_rolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_roleFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$user_rolePayload>
          }
          findFirst: {
            args: Prisma.user_roleFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$user_rolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_roleFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$user_rolePayload>
          }
          findMany: {
            args: Prisma.user_roleFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$user_rolePayload>[]
          }
          create: {
            args: Prisma.user_roleCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$user_rolePayload>
          }
          createMany: {
            args: Prisma.user_roleCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.user_roleDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$user_rolePayload>
          }
          update: {
            args: Prisma.user_roleUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$user_rolePayload>
          }
          deleteMany: {
            args: Prisma.user_roleDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.user_roleUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.user_roleUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$user_rolePayload>
          }
          aggregate: {
            args: Prisma.User_roleAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser_role>
          }
          groupBy: {
            args: Prisma.user_roleGroupByArgs<ExtArgs>,
            result: $Utils.Optional<User_roleGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_roleCountArgs<ExtArgs>,
            result: $Utils.Optional<User_roleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
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
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
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
   * Models
   */

  /**
   * Model activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    id: number | null
    uid: number | null
  }

  export type ActivitySumAggregateOutputType = {
    id: number | null
    uid: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: number | null
    uid: number | null
    title: string | null
    meta: string | null
    timestamp: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: number | null
    uid: number | null
    title: string | null
    meta: string | null
    timestamp: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    uid: number
    title: number
    meta: number
    timestamp: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    id?: true
    uid?: true
  }

  export type ActivitySumAggregateInputType = {
    id?: true
    uid?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    uid?: true
    title?: true
    meta?: true
    timestamp?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    uid?: true
    title?: true
    meta?: true
    timestamp?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    uid?: true
    title?: true
    meta?: true
    timestamp?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which activity to aggregate.
     */
    where?: activityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activities to fetch.
     */
    orderBy?: activityOrderByWithRelationInput | activityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: activityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type activityGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: activityWhereInput
    orderBy?: activityOrderByWithAggregationInput | activityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: activityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: number
    uid: number | null
    title: string | null
    meta: string | null
    timestamp: Date | null
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends activityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type activitySelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uid?: boolean
    title?: boolean
    meta?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["activity"]>

  export type activitySelectScalar = {
    id?: boolean
    uid?: boolean
    title?: boolean
    meta?: boolean
    timestamp?: boolean
  }


  export type $activityPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "activity"
    objects: {}
    scalars: $Extensions.GetResult<{
      id: number
      uid: number | null
      title: string | null
      meta: string | null
      timestamp: Date | null
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }


  type activityGetPayload<S extends boolean | null | undefined | activityDefaultArgs> = $Result.GetResult<Prisma.$activityPayload, S>

  type activityCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<activityFindManyArgs, 'select' | 'include'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface activityDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['activity'], meta: { name: 'activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {activityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends activityFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, activityFindUniqueArgs<ExtArgs>>
    ): Prisma__activityClient<$Result.GetResult<Prisma.$activityPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Activity that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {activityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends activityFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, activityFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__activityClient<$Result.GetResult<Prisma.$activityPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends activityFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, activityFindFirstArgs<ExtArgs>>
    ): Prisma__activityClient<$Result.GetResult<Prisma.$activityPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends activityFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, activityFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__activityClient<$Result.GetResult<Prisma.$activityPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activityFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends activityFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, activityFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$activityPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Activity.
     * @param {activityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
    **/
    create<T extends activityCreateArgs<ExtArgs>>(
      args: SelectSubset<T, activityCreateArgs<ExtArgs>>
    ): Prisma__activityClient<$Result.GetResult<Prisma.$activityPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Activities.
     *     @param {activityCreateManyArgs} args - Arguments to create many Activities.
     *     @example
     *     // Create many Activities
     *     const activity = await prisma.activity.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends activityCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, activityCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Activity.
     * @param {activityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
    **/
    delete<T extends activityDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, activityDeleteArgs<ExtArgs>>
    ): Prisma__activityClient<$Result.GetResult<Prisma.$activityPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Activity.
     * @param {activityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends activityUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, activityUpdateArgs<ExtArgs>>
    ): Prisma__activityClient<$Result.GetResult<Prisma.$activityPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Activities.
     * @param {activityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends activityDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, activityDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends activityUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, activityUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Activity.
     * @param {activityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
    **/
    upsert<T extends activityUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, activityUpsertArgs<ExtArgs>>
    ): Prisma__activityClient<$Result.GetResult<Prisma.$activityPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends activityCountArgs>(
      args?: Subset<T, activityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {activityGroupByArgs} args - Group by arguments.
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
      T extends activityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: activityGroupByArgs['orderBy'] }
        : { orderBy?: activityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, activityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the activity model
   */
  readonly fields: activityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__activityClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the activity model
   */ 
  interface activityFieldRefs {
    readonly id: FieldRef<"activity", 'Int'>
    readonly uid: FieldRef<"activity", 'Int'>
    readonly title: FieldRef<"activity", 'String'>
    readonly meta: FieldRef<"activity", 'String'>
    readonly timestamp: FieldRef<"activity", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * activity findUnique
   */
  export type activityFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
    /**
     * Filter, which activity to fetch.
     */
    where: activityWhereUniqueInput
  }


  /**
   * activity findUniqueOrThrow
   */
  export type activityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
    /**
     * Filter, which activity to fetch.
     */
    where: activityWhereUniqueInput
  }


  /**
   * activity findFirst
   */
  export type activityFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
    /**
     * Filter, which activity to fetch.
     */
    where?: activityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activities to fetch.
     */
    orderBy?: activityOrderByWithRelationInput | activityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for activities.
     */
    cursor?: activityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }


  /**
   * activity findFirstOrThrow
   */
  export type activityFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
    /**
     * Filter, which activity to fetch.
     */
    where?: activityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activities to fetch.
     */
    orderBy?: activityOrderByWithRelationInput | activityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for activities.
     */
    cursor?: activityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }


  /**
   * activity findMany
   */
  export type activityFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
    /**
     * Filter, which activities to fetch.
     */
    where?: activityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of activities to fetch.
     */
    orderBy?: activityOrderByWithRelationInput | activityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing activities.
     */
    cursor?: activityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }


  /**
   * activity create
   */
  export type activityCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
    /**
     * The data needed to create a activity.
     */
    data?: XOR<activityCreateInput, activityUncheckedCreateInput>
  }


  /**
   * activity createMany
   */
  export type activityCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many activities.
     */
    data: activityCreateManyInput | activityCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * activity update
   */
  export type activityUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
    /**
     * The data needed to update a activity.
     */
    data: XOR<activityUpdateInput, activityUncheckedUpdateInput>
    /**
     * Choose, which activity to update.
     */
    where: activityWhereUniqueInput
  }


  /**
   * activity updateMany
   */
  export type activityUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update activities.
     */
    data: XOR<activityUpdateManyMutationInput, activityUncheckedUpdateManyInput>
    /**
     * Filter which activities to update
     */
    where?: activityWhereInput
  }


  /**
   * activity upsert
   */
  export type activityUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
    /**
     * The filter to search for the activity to update in case it exists.
     */
    where: activityWhereUniqueInput
    /**
     * In case the activity found by the `where` argument doesn't exist, create a new activity with this data.
     */
    create: XOR<activityCreateInput, activityUncheckedCreateInput>
    /**
     * In case the activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<activityUpdateInput, activityUncheckedUpdateInput>
  }


  /**
   * activity delete
   */
  export type activityDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
    /**
     * Filter which activity to delete.
     */
    where: activityWhereUniqueInput
  }


  /**
   * activity deleteMany
   */
  export type activityDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which activities to delete
     */
    where?: activityWhereInput
  }


  /**
   * activity without action
   */
  export type activityDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the activity
     */
    select?: activitySelect<ExtArgs> | null
  }



  /**
   * Model app
   */

  export type AggregateApp = {
    _count: AppCountAggregateOutputType | null
    _avg: AppAvgAggregateOutputType | null
    _sum: AppSumAggregateOutputType | null
    _min: AppMinAggregateOutputType | null
    _max: AppMaxAggregateOutputType | null
  }

  export type AppAvgAggregateOutputType = {
    app_id: number | null
    status: number | null
  }

  export type AppSumAggregateOutputType = {
    app_id: number | null
    status: number | null
  }

  export type AppMinAggregateOutputType = {
    app_id: number | null
    app_name: string | null
    app_tag: string | null
    app_desc: string | null
    app_token: string | null
    app_db: string | null
    status: number | null
  }

  export type AppMaxAggregateOutputType = {
    app_id: number | null
    app_name: string | null
    app_tag: string | null
    app_desc: string | null
    app_token: string | null
    app_db: string | null
    status: number | null
  }

  export type AppCountAggregateOutputType = {
    app_id: number
    app_name: number
    app_tag: number
    app_desc: number
    app_token: number
    app_db: number
    status: number
    _all: number
  }


  export type AppAvgAggregateInputType = {
    app_id?: true
    status?: true
  }

  export type AppSumAggregateInputType = {
    app_id?: true
    status?: true
  }

  export type AppMinAggregateInputType = {
    app_id?: true
    app_name?: true
    app_tag?: true
    app_desc?: true
    app_token?: true
    app_db?: true
    status?: true
  }

  export type AppMaxAggregateInputType = {
    app_id?: true
    app_name?: true
    app_tag?: true
    app_desc?: true
    app_token?: true
    app_db?: true
    status?: true
  }

  export type AppCountAggregateInputType = {
    app_id?: true
    app_name?: true
    app_tag?: true
    app_desc?: true
    app_token?: true
    app_db?: true
    status?: true
    _all?: true
  }

  export type AppAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which app to aggregate.
     */
    where?: appWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of apps to fetch.
     */
    orderBy?: appOrderByWithRelationInput | appOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: appWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned apps
    **/
    _count?: true | AppCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppMaxAggregateInputType
  }

  export type GetAppAggregateType<T extends AppAggregateArgs> = {
        [P in keyof T & keyof AggregateApp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApp[P]>
      : GetScalarType<T[P], AggregateApp[P]>
  }




  export type appGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: appWhereInput
    orderBy?: appOrderByWithAggregationInput | appOrderByWithAggregationInput[]
    by: AppScalarFieldEnum[] | AppScalarFieldEnum
    having?: appScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppCountAggregateInputType | true
    _avg?: AppAvgAggregateInputType
    _sum?: AppSumAggregateInputType
    _min?: AppMinAggregateInputType
    _max?: AppMaxAggregateInputType
  }

  export type AppGroupByOutputType = {
    app_id: number
    app_name: string | null
    app_tag: string | null
    app_desc: string | null
    app_token: string | null
    app_db: string | null
    status: number | null
    _count: AppCountAggregateOutputType | null
    _avg: AppAvgAggregateOutputType | null
    _sum: AppSumAggregateOutputType | null
    _min: AppMinAggregateOutputType | null
    _max: AppMaxAggregateOutputType | null
  }

  type GetAppGroupByPayload<T extends appGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppGroupByOutputType[P]>
            : GetScalarType<T[P], AppGroupByOutputType[P]>
        }
      >
    >


  export type appSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    app_id?: boolean
    app_name?: boolean
    app_tag?: boolean
    app_desc?: boolean
    app_token?: boolean
    app_db?: boolean
    status?: boolean
  }, ExtArgs["result"]["app"]>

  export type appSelectScalar = {
    app_id?: boolean
    app_name?: boolean
    app_tag?: boolean
    app_desc?: boolean
    app_token?: boolean
    app_db?: boolean
    status?: boolean
  }


  export type $appPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "app"
    objects: {}
    scalars: $Extensions.GetResult<{
      app_id: number
      app_name: string | null
      app_tag: string | null
      app_desc: string | null
      app_token: string | null
      app_db: string | null
      status: number | null
    }, ExtArgs["result"]["app"]>
    composites: {}
  }


  type appGetPayload<S extends boolean | null | undefined | appDefaultArgs> = $Result.GetResult<Prisma.$appPayload, S>

  type appCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<appFindManyArgs, 'select' | 'include'> & {
      select?: AppCountAggregateInputType | true
    }

  export interface appDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['app'], meta: { name: 'app' } }
    /**
     * Find zero or one App that matches the filter.
     * @param {appFindUniqueArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends appFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, appFindUniqueArgs<ExtArgs>>
    ): Prisma__appClient<$Result.GetResult<Prisma.$appPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one App that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {appFindUniqueOrThrowArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends appFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, appFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__appClient<$Result.GetResult<Prisma.$appPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first App that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appFindFirstArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends appFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, appFindFirstArgs<ExtArgs>>
    ): Prisma__appClient<$Result.GetResult<Prisma.$appPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first App that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appFindFirstOrThrowArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends appFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, appFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__appClient<$Result.GetResult<Prisma.$appPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Apps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Apps
     * const apps = await prisma.app.findMany()
     * 
     * // Get first 10 Apps
     * const apps = await prisma.app.findMany({ take: 10 })
     * 
     * // Only select the `app_id`
     * const appWithApp_idOnly = await prisma.app.findMany({ select: { app_id: true } })
     * 
    **/
    findMany<T extends appFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, appFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$appPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a App.
     * @param {appCreateArgs} args - Arguments to create a App.
     * @example
     * // Create one App
     * const App = await prisma.app.create({
     *   data: {
     *     // ... data to create a App
     *   }
     * })
     * 
    **/
    create<T extends appCreateArgs<ExtArgs>>(
      args: SelectSubset<T, appCreateArgs<ExtArgs>>
    ): Prisma__appClient<$Result.GetResult<Prisma.$appPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Apps.
     *     @param {appCreateManyArgs} args - Arguments to create many Apps.
     *     @example
     *     // Create many Apps
     *     const app = await prisma.app.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends appCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, appCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a App.
     * @param {appDeleteArgs} args - Arguments to delete one App.
     * @example
     * // Delete one App
     * const App = await prisma.app.delete({
     *   where: {
     *     // ... filter to delete one App
     *   }
     * })
     * 
    **/
    delete<T extends appDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, appDeleteArgs<ExtArgs>>
    ): Prisma__appClient<$Result.GetResult<Prisma.$appPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one App.
     * @param {appUpdateArgs} args - Arguments to update one App.
     * @example
     * // Update one App
     * const app = await prisma.app.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends appUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, appUpdateArgs<ExtArgs>>
    ): Prisma__appClient<$Result.GetResult<Prisma.$appPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Apps.
     * @param {appDeleteManyArgs} args - Arguments to filter Apps to delete.
     * @example
     * // Delete a few Apps
     * const { count } = await prisma.app.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends appDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, appDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Apps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Apps
     * const app = await prisma.app.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends appUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, appUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one App.
     * @param {appUpsertArgs} args - Arguments to update or create a App.
     * @example
     * // Update or create a App
     * const app = await prisma.app.upsert({
     *   create: {
     *     // ... data to create a App
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the App we want to update
     *   }
     * })
    **/
    upsert<T extends appUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, appUpsertArgs<ExtArgs>>
    ): Prisma__appClient<$Result.GetResult<Prisma.$appPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Apps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appCountArgs} args - Arguments to filter Apps to count.
     * @example
     * // Count the number of Apps
     * const count = await prisma.app.count({
     *   where: {
     *     // ... the filter for the Apps we want to count
     *   }
     * })
    **/
    count<T extends appCountArgs>(
      args?: Subset<T, appCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a App.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppAggregateArgs>(args: Subset<T, AppAggregateArgs>): Prisma.PrismaPromise<GetAppAggregateType<T>>

    /**
     * Group by App.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appGroupByArgs} args - Group by arguments.
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
      T extends appGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: appGroupByArgs['orderBy'] }
        : { orderBy?: appGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, appGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the app model
   */
  readonly fields: appFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for app.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__appClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the app model
   */ 
  interface appFieldRefs {
    readonly app_id: FieldRef<"app", 'Int'>
    readonly app_name: FieldRef<"app", 'String'>
    readonly app_tag: FieldRef<"app", 'String'>
    readonly app_desc: FieldRef<"app", 'String'>
    readonly app_token: FieldRef<"app", 'String'>
    readonly app_db: FieldRef<"app", 'String'>
    readonly status: FieldRef<"app", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * app findUnique
   */
  export type appFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
    /**
     * Filter, which app to fetch.
     */
    where: appWhereUniqueInput
  }


  /**
   * app findUniqueOrThrow
   */
  export type appFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
    /**
     * Filter, which app to fetch.
     */
    where: appWhereUniqueInput
  }


  /**
   * app findFirst
   */
  export type appFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
    /**
     * Filter, which app to fetch.
     */
    where?: appWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of apps to fetch.
     */
    orderBy?: appOrderByWithRelationInput | appOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for apps.
     */
    cursor?: appWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of apps.
     */
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }


  /**
   * app findFirstOrThrow
   */
  export type appFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
    /**
     * Filter, which app to fetch.
     */
    where?: appWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of apps to fetch.
     */
    orderBy?: appOrderByWithRelationInput | appOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for apps.
     */
    cursor?: appWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of apps.
     */
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }


  /**
   * app findMany
   */
  export type appFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
    /**
     * Filter, which apps to fetch.
     */
    where?: appWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of apps to fetch.
     */
    orderBy?: appOrderByWithRelationInput | appOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing apps.
     */
    cursor?: appWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` apps.
     */
    skip?: number
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }


  /**
   * app create
   */
  export type appCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
    /**
     * The data needed to create a app.
     */
    data?: XOR<appCreateInput, appUncheckedCreateInput>
  }


  /**
   * app createMany
   */
  export type appCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many apps.
     */
    data: appCreateManyInput | appCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * app update
   */
  export type appUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
    /**
     * The data needed to update a app.
     */
    data: XOR<appUpdateInput, appUncheckedUpdateInput>
    /**
     * Choose, which app to update.
     */
    where: appWhereUniqueInput
  }


  /**
   * app updateMany
   */
  export type appUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update apps.
     */
    data: XOR<appUpdateManyMutationInput, appUncheckedUpdateManyInput>
    /**
     * Filter which apps to update
     */
    where?: appWhereInput
  }


  /**
   * app upsert
   */
  export type appUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
    /**
     * The filter to search for the app to update in case it exists.
     */
    where: appWhereUniqueInput
    /**
     * In case the app found by the `where` argument doesn't exist, create a new app with this data.
     */
    create: XOR<appCreateInput, appUncheckedCreateInput>
    /**
     * In case the app was found with the provided `where` argument, update it with this data.
     */
    update: XOR<appUpdateInput, appUncheckedUpdateInput>
  }


  /**
   * app delete
   */
  export type appDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
    /**
     * Filter which app to delete.
     */
    where: appWhereUniqueInput
  }


  /**
   * app deleteMany
   */
  export type appDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which apps to delete
     */
    where?: appWhereInput
  }


  /**
   * app without action
   */
  export type appDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app
     */
    select?: appSelect<ExtArgs> | null
  }



  /**
   * Model app_role
   */

  export type AggregateApp_role = {
    _count: App_roleCountAggregateOutputType | null
    _avg: App_roleAvgAggregateOutputType | null
    _sum: App_roleSumAggregateOutputType | null
    _min: App_roleMinAggregateOutputType | null
    _max: App_roleMaxAggregateOutputType | null
  }

  export type App_roleAvgAggregateOutputType = {
    arole_id: number | null
    app_id: number | null
    status: number | null
  }

  export type App_roleSumAggregateOutputType = {
    arole_id: number | null
    app_id: number | null
    status: number | null
  }

  export type App_roleMinAggregateOutputType = {
    arole_id: number | null
    app_id: number | null
    role_name: string | null
    role_desc: string | null
    status: number | null
  }

  export type App_roleMaxAggregateOutputType = {
    arole_id: number | null
    app_id: number | null
    role_name: string | null
    role_desc: string | null
    status: number | null
  }

  export type App_roleCountAggregateOutputType = {
    arole_id: number
    app_id: number
    role_name: number
    role_desc: number
    status: number
    _all: number
  }


  export type App_roleAvgAggregateInputType = {
    arole_id?: true
    app_id?: true
    status?: true
  }

  export type App_roleSumAggregateInputType = {
    arole_id?: true
    app_id?: true
    status?: true
  }

  export type App_roleMinAggregateInputType = {
    arole_id?: true
    app_id?: true
    role_name?: true
    role_desc?: true
    status?: true
  }

  export type App_roleMaxAggregateInputType = {
    arole_id?: true
    app_id?: true
    role_name?: true
    role_desc?: true
    status?: true
  }

  export type App_roleCountAggregateInputType = {
    arole_id?: true
    app_id?: true
    role_name?: true
    role_desc?: true
    status?: true
    _all?: true
  }

  export type App_roleAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which app_role to aggregate.
     */
    where?: app_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of app_roles to fetch.
     */
    orderBy?: app_roleOrderByWithRelationInput | app_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: app_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` app_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` app_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned app_roles
    **/
    _count?: true | App_roleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: App_roleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: App_roleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: App_roleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: App_roleMaxAggregateInputType
  }

  export type GetApp_roleAggregateType<T extends App_roleAggregateArgs> = {
        [P in keyof T & keyof AggregateApp_role]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApp_role[P]>
      : GetScalarType<T[P], AggregateApp_role[P]>
  }




  export type app_roleGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: app_roleWhereInput
    orderBy?: app_roleOrderByWithAggregationInput | app_roleOrderByWithAggregationInput[]
    by: App_roleScalarFieldEnum[] | App_roleScalarFieldEnum
    having?: app_roleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: App_roleCountAggregateInputType | true
    _avg?: App_roleAvgAggregateInputType
    _sum?: App_roleSumAggregateInputType
    _min?: App_roleMinAggregateInputType
    _max?: App_roleMaxAggregateInputType
  }

  export type App_roleGroupByOutputType = {
    arole_id: number
    app_id: number | null
    role_name: string | null
    role_desc: string | null
    status: number | null
    _count: App_roleCountAggregateOutputType | null
    _avg: App_roleAvgAggregateOutputType | null
    _sum: App_roleSumAggregateOutputType | null
    _min: App_roleMinAggregateOutputType | null
    _max: App_roleMaxAggregateOutputType | null
  }

  type GetApp_roleGroupByPayload<T extends app_roleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<App_roleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof App_roleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], App_roleGroupByOutputType[P]>
            : GetScalarType<T[P], App_roleGroupByOutputType[P]>
        }
      >
    >


  export type app_roleSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    arole_id?: boolean
    app_id?: boolean
    role_name?: boolean
    role_desc?: boolean
    status?: boolean
  }, ExtArgs["result"]["app_role"]>

  export type app_roleSelectScalar = {
    arole_id?: boolean
    app_id?: boolean
    role_name?: boolean
    role_desc?: boolean
    status?: boolean
  }


  export type $app_rolePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "app_role"
    objects: {}
    scalars: $Extensions.GetResult<{
      arole_id: number
      app_id: number | null
      role_name: string | null
      role_desc: string | null
      status: number | null
    }, ExtArgs["result"]["app_role"]>
    composites: {}
  }


  type app_roleGetPayload<S extends boolean | null | undefined | app_roleDefaultArgs> = $Result.GetResult<Prisma.$app_rolePayload, S>

  type app_roleCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<app_roleFindManyArgs, 'select' | 'include'> & {
      select?: App_roleCountAggregateInputType | true
    }

  export interface app_roleDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['app_role'], meta: { name: 'app_role' } }
    /**
     * Find zero or one App_role that matches the filter.
     * @param {app_roleFindUniqueArgs} args - Arguments to find a App_role
     * @example
     * // Get one App_role
     * const app_role = await prisma.app_role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends app_roleFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, app_roleFindUniqueArgs<ExtArgs>>
    ): Prisma__app_roleClient<$Result.GetResult<Prisma.$app_rolePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one App_role that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {app_roleFindUniqueOrThrowArgs} args - Arguments to find a App_role
     * @example
     * // Get one App_role
     * const app_role = await prisma.app_role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends app_roleFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, app_roleFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__app_roleClient<$Result.GetResult<Prisma.$app_rolePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first App_role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {app_roleFindFirstArgs} args - Arguments to find a App_role
     * @example
     * // Get one App_role
     * const app_role = await prisma.app_role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends app_roleFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, app_roleFindFirstArgs<ExtArgs>>
    ): Prisma__app_roleClient<$Result.GetResult<Prisma.$app_rolePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first App_role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {app_roleFindFirstOrThrowArgs} args - Arguments to find a App_role
     * @example
     * // Get one App_role
     * const app_role = await prisma.app_role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends app_roleFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, app_roleFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__app_roleClient<$Result.GetResult<Prisma.$app_rolePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more App_roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {app_roleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all App_roles
     * const app_roles = await prisma.app_role.findMany()
     * 
     * // Get first 10 App_roles
     * const app_roles = await prisma.app_role.findMany({ take: 10 })
     * 
     * // Only select the `arole_id`
     * const app_roleWithArole_idOnly = await prisma.app_role.findMany({ select: { arole_id: true } })
     * 
    **/
    findMany<T extends app_roleFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, app_roleFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$app_rolePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a App_role.
     * @param {app_roleCreateArgs} args - Arguments to create a App_role.
     * @example
     * // Create one App_role
     * const App_role = await prisma.app_role.create({
     *   data: {
     *     // ... data to create a App_role
     *   }
     * })
     * 
    **/
    create<T extends app_roleCreateArgs<ExtArgs>>(
      args: SelectSubset<T, app_roleCreateArgs<ExtArgs>>
    ): Prisma__app_roleClient<$Result.GetResult<Prisma.$app_rolePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many App_roles.
     *     @param {app_roleCreateManyArgs} args - Arguments to create many App_roles.
     *     @example
     *     // Create many App_roles
     *     const app_role = await prisma.app_role.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends app_roleCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, app_roleCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a App_role.
     * @param {app_roleDeleteArgs} args - Arguments to delete one App_role.
     * @example
     * // Delete one App_role
     * const App_role = await prisma.app_role.delete({
     *   where: {
     *     // ... filter to delete one App_role
     *   }
     * })
     * 
    **/
    delete<T extends app_roleDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, app_roleDeleteArgs<ExtArgs>>
    ): Prisma__app_roleClient<$Result.GetResult<Prisma.$app_rolePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one App_role.
     * @param {app_roleUpdateArgs} args - Arguments to update one App_role.
     * @example
     * // Update one App_role
     * const app_role = await prisma.app_role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends app_roleUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, app_roleUpdateArgs<ExtArgs>>
    ): Prisma__app_roleClient<$Result.GetResult<Prisma.$app_rolePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more App_roles.
     * @param {app_roleDeleteManyArgs} args - Arguments to filter App_roles to delete.
     * @example
     * // Delete a few App_roles
     * const { count } = await prisma.app_role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends app_roleDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, app_roleDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more App_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {app_roleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many App_roles
     * const app_role = await prisma.app_role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends app_roleUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, app_roleUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one App_role.
     * @param {app_roleUpsertArgs} args - Arguments to update or create a App_role.
     * @example
     * // Update or create a App_role
     * const app_role = await prisma.app_role.upsert({
     *   create: {
     *     // ... data to create a App_role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the App_role we want to update
     *   }
     * })
    **/
    upsert<T extends app_roleUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, app_roleUpsertArgs<ExtArgs>>
    ): Prisma__app_roleClient<$Result.GetResult<Prisma.$app_rolePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of App_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {app_roleCountArgs} args - Arguments to filter App_roles to count.
     * @example
     * // Count the number of App_roles
     * const count = await prisma.app_role.count({
     *   where: {
     *     // ... the filter for the App_roles we want to count
     *   }
     * })
    **/
    count<T extends app_roleCountArgs>(
      args?: Subset<T, app_roleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], App_roleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a App_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {App_roleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends App_roleAggregateArgs>(args: Subset<T, App_roleAggregateArgs>): Prisma.PrismaPromise<GetApp_roleAggregateType<T>>

    /**
     * Group by App_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {app_roleGroupByArgs} args - Group by arguments.
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
      T extends app_roleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: app_roleGroupByArgs['orderBy'] }
        : { orderBy?: app_roleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, app_roleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApp_roleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the app_role model
   */
  readonly fields: app_roleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for app_role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__app_roleClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the app_role model
   */ 
  interface app_roleFieldRefs {
    readonly arole_id: FieldRef<"app_role", 'Int'>
    readonly app_id: FieldRef<"app_role", 'Int'>
    readonly role_name: FieldRef<"app_role", 'String'>
    readonly role_desc: FieldRef<"app_role", 'String'>
    readonly status: FieldRef<"app_role", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * app_role findUnique
   */
  export type app_roleFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
    /**
     * Filter, which app_role to fetch.
     */
    where: app_roleWhereUniqueInput
  }


  /**
   * app_role findUniqueOrThrow
   */
  export type app_roleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
    /**
     * Filter, which app_role to fetch.
     */
    where: app_roleWhereUniqueInput
  }


  /**
   * app_role findFirst
   */
  export type app_roleFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
    /**
     * Filter, which app_role to fetch.
     */
    where?: app_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of app_roles to fetch.
     */
    orderBy?: app_roleOrderByWithRelationInput | app_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for app_roles.
     */
    cursor?: app_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` app_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` app_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of app_roles.
     */
    distinct?: App_roleScalarFieldEnum | App_roleScalarFieldEnum[]
  }


  /**
   * app_role findFirstOrThrow
   */
  export type app_roleFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
    /**
     * Filter, which app_role to fetch.
     */
    where?: app_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of app_roles to fetch.
     */
    orderBy?: app_roleOrderByWithRelationInput | app_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for app_roles.
     */
    cursor?: app_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` app_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` app_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of app_roles.
     */
    distinct?: App_roleScalarFieldEnum | App_roleScalarFieldEnum[]
  }


  /**
   * app_role findMany
   */
  export type app_roleFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
    /**
     * Filter, which app_roles to fetch.
     */
    where?: app_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of app_roles to fetch.
     */
    orderBy?: app_roleOrderByWithRelationInput | app_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing app_roles.
     */
    cursor?: app_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` app_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` app_roles.
     */
    skip?: number
    distinct?: App_roleScalarFieldEnum | App_roleScalarFieldEnum[]
  }


  /**
   * app_role create
   */
  export type app_roleCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
    /**
     * The data needed to create a app_role.
     */
    data?: XOR<app_roleCreateInput, app_roleUncheckedCreateInput>
  }


  /**
   * app_role createMany
   */
  export type app_roleCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many app_roles.
     */
    data: app_roleCreateManyInput | app_roleCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * app_role update
   */
  export type app_roleUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
    /**
     * The data needed to update a app_role.
     */
    data: XOR<app_roleUpdateInput, app_roleUncheckedUpdateInput>
    /**
     * Choose, which app_role to update.
     */
    where: app_roleWhereUniqueInput
  }


  /**
   * app_role updateMany
   */
  export type app_roleUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update app_roles.
     */
    data: XOR<app_roleUpdateManyMutationInput, app_roleUncheckedUpdateManyInput>
    /**
     * Filter which app_roles to update
     */
    where?: app_roleWhereInput
  }


  /**
   * app_role upsert
   */
  export type app_roleUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
    /**
     * The filter to search for the app_role to update in case it exists.
     */
    where: app_roleWhereUniqueInput
    /**
     * In case the app_role found by the `where` argument doesn't exist, create a new app_role with this data.
     */
    create: XOR<app_roleCreateInput, app_roleUncheckedCreateInput>
    /**
     * In case the app_role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<app_roleUpdateInput, app_roleUncheckedUpdateInput>
  }


  /**
   * app_role delete
   */
  export type app_roleDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
    /**
     * Filter which app_role to delete.
     */
    where: app_roleWhereUniqueInput
  }


  /**
   * app_role deleteMany
   */
  export type app_roleDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which app_roles to delete
     */
    where?: app_roleWhereInput
  }


  /**
   * app_role without action
   */
  export type app_roleDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the app_role
     */
    select?: app_roleSelect<ExtArgs> | null
  }



  /**
   * Model group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _avg: GroupAvgAggregateOutputType | null
    _sum: GroupSumAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupAvgAggregateOutputType = {
    group_id: number | null
    status: number | null
  }

  export type GroupSumAggregateOutputType = {
    group_id: number | null
    status: number | null
  }

  export type GroupMinAggregateOutputType = {
    group_id: number | null
    group_name: string | null
    group_desc: string | null
    status: number | null
  }

  export type GroupMaxAggregateOutputType = {
    group_id: number | null
    group_name: string | null
    group_desc: string | null
    status: number | null
  }

  export type GroupCountAggregateOutputType = {
    group_id: number
    group_name: number
    group_desc: number
    status: number
    _all: number
  }


  export type GroupAvgAggregateInputType = {
    group_id?: true
    status?: true
  }

  export type GroupSumAggregateInputType = {
    group_id?: true
    status?: true
  }

  export type GroupMinAggregateInputType = {
    group_id?: true
    group_name?: true
    group_desc?: true
    status?: true
  }

  export type GroupMaxAggregateInputType = {
    group_id?: true
    group_name?: true
    group_desc?: true
    status?: true
  }

  export type GroupCountAggregateInputType = {
    group_id?: true
    group_name?: true
    group_desc?: true
    status?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which group to aggregate.
     */
    where?: groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupOrderByWithRelationInput | groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type groupGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: groupWhereInput
    orderBy?: groupOrderByWithAggregationInput | groupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: groupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _avg?: GroupAvgAggregateInputType
    _sum?: GroupSumAggregateInputType
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    group_id: number
    group_name: string | null
    group_desc: string | null
    status: number | null
    _count: GroupCountAggregateOutputType | null
    _avg: GroupAvgAggregateOutputType | null
    _sum: GroupSumAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends groupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type groupSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    group_id?: boolean
    group_name?: boolean
    group_desc?: boolean
    status?: boolean
  }, ExtArgs["result"]["group"]>

  export type groupSelectScalar = {
    group_id?: boolean
    group_name?: boolean
    group_desc?: boolean
    status?: boolean
  }


  export type $groupPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "group"
    objects: {}
    scalars: $Extensions.GetResult<{
      group_id: number
      group_name: string | null
      group_desc: string | null
      status: number | null
    }, ExtArgs["result"]["group"]>
    composites: {}
  }


  type groupGetPayload<S extends boolean | null | undefined | groupDefaultArgs> = $Result.GetResult<Prisma.$groupPayload, S>

  type groupCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<groupFindManyArgs, 'select' | 'include'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface groupDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['group'], meta: { name: 'group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {groupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends groupFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, groupFindUniqueArgs<ExtArgs>>
    ): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Group that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {groupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends groupFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, groupFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends groupFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, groupFindFirstArgs<ExtArgs>>
    ): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends groupFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, groupFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `group_id`
     * const groupWithGroup_idOnly = await prisma.group.findMany({ select: { group_id: true } })
     * 
    **/
    findMany<T extends groupFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, groupFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Group.
     * @param {groupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
    **/
    create<T extends groupCreateArgs<ExtArgs>>(
      args: SelectSubset<T, groupCreateArgs<ExtArgs>>
    ): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Groups.
     *     @param {groupCreateManyArgs} args - Arguments to create many Groups.
     *     @example
     *     // Create many Groups
     *     const group = await prisma.group.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends groupCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, groupCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Group.
     * @param {groupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
    **/
    delete<T extends groupDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, groupDeleteArgs<ExtArgs>>
    ): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Group.
     * @param {groupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends groupUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, groupUpdateArgs<ExtArgs>>
    ): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Groups.
     * @param {groupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends groupDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, groupDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends groupUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, groupUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Group.
     * @param {groupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
    **/
    upsert<T extends groupUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, groupUpsertArgs<ExtArgs>>
    ): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends groupCountArgs>(
      args?: Subset<T, groupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupGroupByArgs} args - Group by arguments.
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
      T extends groupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: groupGroupByArgs['orderBy'] }
        : { orderBy?: groupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, groupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the group model
   */
  readonly fields: groupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__groupClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the group model
   */ 
  interface groupFieldRefs {
    readonly group_id: FieldRef<"group", 'Int'>
    readonly group_name: FieldRef<"group", 'String'>
    readonly group_desc: FieldRef<"group", 'String'>
    readonly status: FieldRef<"group", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * group findUnique
   */
  export type groupFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Filter, which group to fetch.
     */
    where: groupWhereUniqueInput
  }


  /**
   * group findUniqueOrThrow
   */
  export type groupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Filter, which group to fetch.
     */
    where: groupWhereUniqueInput
  }


  /**
   * group findFirst
   */
  export type groupFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Filter, which group to fetch.
     */
    where?: groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupOrderByWithRelationInput | groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for groups.
     */
    cursor?: groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }


  /**
   * group findFirstOrThrow
   */
  export type groupFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Filter, which group to fetch.
     */
    where?: groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupOrderByWithRelationInput | groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for groups.
     */
    cursor?: groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }


  /**
   * group findMany
   */
  export type groupFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Filter, which groups to fetch.
     */
    where?: groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupOrderByWithRelationInput | groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing groups.
     */
    cursor?: groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }


  /**
   * group create
   */
  export type groupCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * The data needed to create a group.
     */
    data?: XOR<groupCreateInput, groupUncheckedCreateInput>
  }


  /**
   * group createMany
   */
  export type groupCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many groups.
     */
    data: groupCreateManyInput | groupCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * group update
   */
  export type groupUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * The data needed to update a group.
     */
    data: XOR<groupUpdateInput, groupUncheckedUpdateInput>
    /**
     * Choose, which group to update.
     */
    where: groupWhereUniqueInput
  }


  /**
   * group updateMany
   */
  export type groupUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update groups.
     */
    data: XOR<groupUpdateManyMutationInput, groupUncheckedUpdateManyInput>
    /**
     * Filter which groups to update
     */
    where?: groupWhereInput
  }


  /**
   * group upsert
   */
  export type groupUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * The filter to search for the group to update in case it exists.
     */
    where: groupWhereUniqueInput
    /**
     * In case the group found by the `where` argument doesn't exist, create a new group with this data.
     */
    create: XOR<groupCreateInput, groupUncheckedCreateInput>
    /**
     * In case the group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<groupUpdateInput, groupUncheckedUpdateInput>
  }


  /**
   * group delete
   */
  export type groupDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Filter which group to delete.
     */
    where: groupWhereUniqueInput
  }


  /**
   * group deleteMany
   */
  export type groupDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which groups to delete
     */
    where?: groupWhereInput
  }


  /**
   * group without action
   */
  export type groupDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
  }



  /**
   * Model photo
   */

  export type AggregatePhoto = {
    _count: PhotoCountAggregateOutputType | null
    _avg: PhotoAvgAggregateOutputType | null
    _sum: PhotoSumAggregateOutputType | null
    _min: PhotoMinAggregateOutputType | null
    _max: PhotoMaxAggregateOutputType | null
  }

  export type PhotoAvgAggregateOutputType = {
    photo_id: number | null
    group_id: number | null
    uid: number | null
    status: number | null
  }

  export type PhotoSumAggregateOutputType = {
    photo_id: number | null
    group_id: number | null
    uid: number | null
    status: number | null
  }

  export type PhotoMinAggregateOutputType = {
    photo_id: number | null
    group_id: number | null
    uid: number | null
    tag: string | null
    path: string | null
    status: number | null
  }

  export type PhotoMaxAggregateOutputType = {
    photo_id: number | null
    group_id: number | null
    uid: number | null
    tag: string | null
    path: string | null
    status: number | null
  }

  export type PhotoCountAggregateOutputType = {
    photo_id: number
    group_id: number
    uid: number
    tag: number
    path: number
    status: number
    _all: number
  }


  export type PhotoAvgAggregateInputType = {
    photo_id?: true
    group_id?: true
    uid?: true
    status?: true
  }

  export type PhotoSumAggregateInputType = {
    photo_id?: true
    group_id?: true
    uid?: true
    status?: true
  }

  export type PhotoMinAggregateInputType = {
    photo_id?: true
    group_id?: true
    uid?: true
    tag?: true
    path?: true
    status?: true
  }

  export type PhotoMaxAggregateInputType = {
    photo_id?: true
    group_id?: true
    uid?: true
    tag?: true
    path?: true
    status?: true
  }

  export type PhotoCountAggregateInputType = {
    photo_id?: true
    group_id?: true
    uid?: true
    tag?: true
    path?: true
    status?: true
    _all?: true
  }

  export type PhotoAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which photo to aggregate.
     */
    where?: photoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of photos to fetch.
     */
    orderBy?: photoOrderByWithRelationInput | photoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: photoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned photos
    **/
    _count?: true | PhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhotoMaxAggregateInputType
  }

  export type GetPhotoAggregateType<T extends PhotoAggregateArgs> = {
        [P in keyof T & keyof AggregatePhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhoto[P]>
      : GetScalarType<T[P], AggregatePhoto[P]>
  }




  export type photoGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: photoWhereInput
    orderBy?: photoOrderByWithAggregationInput | photoOrderByWithAggregationInput[]
    by: PhotoScalarFieldEnum[] | PhotoScalarFieldEnum
    having?: photoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhotoCountAggregateInputType | true
    _avg?: PhotoAvgAggregateInputType
    _sum?: PhotoSumAggregateInputType
    _min?: PhotoMinAggregateInputType
    _max?: PhotoMaxAggregateInputType
  }

  export type PhotoGroupByOutputType = {
    photo_id: number
    group_id: number | null
    uid: number | null
    tag: string | null
    path: string | null
    status: number | null
    _count: PhotoCountAggregateOutputType | null
    _avg: PhotoAvgAggregateOutputType | null
    _sum: PhotoSumAggregateOutputType | null
    _min: PhotoMinAggregateOutputType | null
    _max: PhotoMaxAggregateOutputType | null
  }

  type GetPhotoGroupByPayload<T extends photoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhotoGroupByOutputType[P]>
            : GetScalarType<T[P], PhotoGroupByOutputType[P]>
        }
      >
    >


  export type photoSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    photo_id?: boolean
    group_id?: boolean
    uid?: boolean
    tag?: boolean
    path?: boolean
    status?: boolean
  }, ExtArgs["result"]["photo"]>

  export type photoSelectScalar = {
    photo_id?: boolean
    group_id?: boolean
    uid?: boolean
    tag?: boolean
    path?: boolean
    status?: boolean
  }


  export type $photoPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "photo"
    objects: {}
    scalars: $Extensions.GetResult<{
      photo_id: number
      group_id: number | null
      uid: number | null
      tag: string | null
      path: string | null
      status: number | null
    }, ExtArgs["result"]["photo"]>
    composites: {}
  }


  type photoGetPayload<S extends boolean | null | undefined | photoDefaultArgs> = $Result.GetResult<Prisma.$photoPayload, S>

  type photoCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<photoFindManyArgs, 'select' | 'include'> & {
      select?: PhotoCountAggregateInputType | true
    }

  export interface photoDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['photo'], meta: { name: 'photo' } }
    /**
     * Find zero or one Photo that matches the filter.
     * @param {photoFindUniqueArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends photoFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, photoFindUniqueArgs<ExtArgs>>
    ): Prisma__photoClient<$Result.GetResult<Prisma.$photoPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Photo that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {photoFindUniqueOrThrowArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends photoFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, photoFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__photoClient<$Result.GetResult<Prisma.$photoPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Photo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {photoFindFirstArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends photoFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, photoFindFirstArgs<ExtArgs>>
    ): Prisma__photoClient<$Result.GetResult<Prisma.$photoPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Photo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {photoFindFirstOrThrowArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends photoFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, photoFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__photoClient<$Result.GetResult<Prisma.$photoPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Photos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {photoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Photos
     * const photos = await prisma.photo.findMany()
     * 
     * // Get first 10 Photos
     * const photos = await prisma.photo.findMany({ take: 10 })
     * 
     * // Only select the `photo_id`
     * const photoWithPhoto_idOnly = await prisma.photo.findMany({ select: { photo_id: true } })
     * 
    **/
    findMany<T extends photoFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, photoFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$photoPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Photo.
     * @param {photoCreateArgs} args - Arguments to create a Photo.
     * @example
     * // Create one Photo
     * const Photo = await prisma.photo.create({
     *   data: {
     *     // ... data to create a Photo
     *   }
     * })
     * 
    **/
    create<T extends photoCreateArgs<ExtArgs>>(
      args: SelectSubset<T, photoCreateArgs<ExtArgs>>
    ): Prisma__photoClient<$Result.GetResult<Prisma.$photoPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Photos.
     *     @param {photoCreateManyArgs} args - Arguments to create many Photos.
     *     @example
     *     // Create many Photos
     *     const photo = await prisma.photo.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends photoCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, photoCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Photo.
     * @param {photoDeleteArgs} args - Arguments to delete one Photo.
     * @example
     * // Delete one Photo
     * const Photo = await prisma.photo.delete({
     *   where: {
     *     // ... filter to delete one Photo
     *   }
     * })
     * 
    **/
    delete<T extends photoDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, photoDeleteArgs<ExtArgs>>
    ): Prisma__photoClient<$Result.GetResult<Prisma.$photoPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Photo.
     * @param {photoUpdateArgs} args - Arguments to update one Photo.
     * @example
     * // Update one Photo
     * const photo = await prisma.photo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends photoUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, photoUpdateArgs<ExtArgs>>
    ): Prisma__photoClient<$Result.GetResult<Prisma.$photoPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Photos.
     * @param {photoDeleteManyArgs} args - Arguments to filter Photos to delete.
     * @example
     * // Delete a few Photos
     * const { count } = await prisma.photo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends photoDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, photoDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {photoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Photos
     * const photo = await prisma.photo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends photoUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, photoUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Photo.
     * @param {photoUpsertArgs} args - Arguments to update or create a Photo.
     * @example
     * // Update or create a Photo
     * const photo = await prisma.photo.upsert({
     *   create: {
     *     // ... data to create a Photo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Photo we want to update
     *   }
     * })
    **/
    upsert<T extends photoUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, photoUpsertArgs<ExtArgs>>
    ): Prisma__photoClient<$Result.GetResult<Prisma.$photoPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {photoCountArgs} args - Arguments to filter Photos to count.
     * @example
     * // Count the number of Photos
     * const count = await prisma.photo.count({
     *   where: {
     *     // ... the filter for the Photos we want to count
     *   }
     * })
    **/
    count<T extends photoCountArgs>(
      args?: Subset<T, photoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PhotoAggregateArgs>(args: Subset<T, PhotoAggregateArgs>): Prisma.PrismaPromise<GetPhotoAggregateType<T>>

    /**
     * Group by Photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {photoGroupByArgs} args - Group by arguments.
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
      T extends photoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: photoGroupByArgs['orderBy'] }
        : { orderBy?: photoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, photoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the photo model
   */
  readonly fields: photoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for photo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__photoClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the photo model
   */ 
  interface photoFieldRefs {
    readonly photo_id: FieldRef<"photo", 'Int'>
    readonly group_id: FieldRef<"photo", 'Int'>
    readonly uid: FieldRef<"photo", 'Int'>
    readonly tag: FieldRef<"photo", 'String'>
    readonly path: FieldRef<"photo", 'String'>
    readonly status: FieldRef<"photo", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * photo findUnique
   */
  export type photoFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
    /**
     * Filter, which photo to fetch.
     */
    where: photoWhereUniqueInput
  }


  /**
   * photo findUniqueOrThrow
   */
  export type photoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
    /**
     * Filter, which photo to fetch.
     */
    where: photoWhereUniqueInput
  }


  /**
   * photo findFirst
   */
  export type photoFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
    /**
     * Filter, which photo to fetch.
     */
    where?: photoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of photos to fetch.
     */
    orderBy?: photoOrderByWithRelationInput | photoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for photos.
     */
    cursor?: photoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of photos.
     */
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }


  /**
   * photo findFirstOrThrow
   */
  export type photoFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
    /**
     * Filter, which photo to fetch.
     */
    where?: photoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of photos to fetch.
     */
    orderBy?: photoOrderByWithRelationInput | photoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for photos.
     */
    cursor?: photoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of photos.
     */
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }


  /**
   * photo findMany
   */
  export type photoFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
    /**
     * Filter, which photos to fetch.
     */
    where?: photoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of photos to fetch.
     */
    orderBy?: photoOrderByWithRelationInput | photoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing photos.
     */
    cursor?: photoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` photos.
     */
    skip?: number
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }


  /**
   * photo create
   */
  export type photoCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
    /**
     * The data needed to create a photo.
     */
    data?: XOR<photoCreateInput, photoUncheckedCreateInput>
  }


  /**
   * photo createMany
   */
  export type photoCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many photos.
     */
    data: photoCreateManyInput | photoCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * photo update
   */
  export type photoUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
    /**
     * The data needed to update a photo.
     */
    data: XOR<photoUpdateInput, photoUncheckedUpdateInput>
    /**
     * Choose, which photo to update.
     */
    where: photoWhereUniqueInput
  }


  /**
   * photo updateMany
   */
  export type photoUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update photos.
     */
    data: XOR<photoUpdateManyMutationInput, photoUncheckedUpdateManyInput>
    /**
     * Filter which photos to update
     */
    where?: photoWhereInput
  }


  /**
   * photo upsert
   */
  export type photoUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
    /**
     * The filter to search for the photo to update in case it exists.
     */
    where: photoWhereUniqueInput
    /**
     * In case the photo found by the `where` argument doesn't exist, create a new photo with this data.
     */
    create: XOR<photoCreateInput, photoUncheckedCreateInput>
    /**
     * In case the photo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<photoUpdateInput, photoUncheckedUpdateInput>
  }


  /**
   * photo delete
   */
  export type photoDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
    /**
     * Filter which photo to delete.
     */
    where: photoWhereUniqueInput
  }


  /**
   * photo deleteMany
   */
  export type photoDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which photos to delete
     */
    where?: photoWhereInput
  }


  /**
   * photo without action
   */
  export type photoDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the photo
     */
    select?: photoSelect<ExtArgs> | null
  }



  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    uid: number | null
    group_id: number | null
    flag_locked: number | null
    flag_disabled: number | null
    flag_ad: number | null
    flag_gs: number | null
    login_attempt: number | null
  }

  export type UserSumAggregateOutputType = {
    uid: number | null
    group_id: number | null
    flag_locked: number | null
    flag_disabled: number | null
    flag_ad: number | null
    flag_gs: number | null
    login_attempt: number | null
  }

  export type UserMinAggregateOutputType = {
    uid: number | null
    group_id: number | null
    tag: string | null
    username: string | null
    password: string | null
    flag_locked: number | null
    flag_disabled: number | null
    flag_ad: number | null
    flag_gs: number | null
    login_attempt: number | null
    attempt_time: Date | null
    access_token: string | null
    access_expire: Date | null
  }

  export type UserMaxAggregateOutputType = {
    uid: number | null
    group_id: number | null
    tag: string | null
    username: string | null
    password: string | null
    flag_locked: number | null
    flag_disabled: number | null
    flag_ad: number | null
    flag_gs: number | null
    login_attempt: number | null
    attempt_time: Date | null
    access_token: string | null
    access_expire: Date | null
  }

  export type UserCountAggregateOutputType = {
    uid: number
    group_id: number
    tag: number
    username: number
    password: number
    flag_locked: number
    flag_disabled: number
    flag_ad: number
    flag_gs: number
    login_attempt: number
    attempt_time: number
    access_token: number
    access_expire: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    uid?: true
    group_id?: true
    flag_locked?: true
    flag_disabled?: true
    flag_ad?: true
    flag_gs?: true
    login_attempt?: true
  }

  export type UserSumAggregateInputType = {
    uid?: true
    group_id?: true
    flag_locked?: true
    flag_disabled?: true
    flag_ad?: true
    flag_gs?: true
    login_attempt?: true
  }

  export type UserMinAggregateInputType = {
    uid?: true
    group_id?: true
    tag?: true
    username?: true
    password?: true
    flag_locked?: true
    flag_disabled?: true
    flag_ad?: true
    flag_gs?: true
    login_attempt?: true
    attempt_time?: true
    access_token?: true
    access_expire?: true
  }

  export type UserMaxAggregateInputType = {
    uid?: true
    group_id?: true
    tag?: true
    username?: true
    password?: true
    flag_locked?: true
    flag_disabled?: true
    flag_ad?: true
    flag_gs?: true
    login_attempt?: true
    attempt_time?: true
    access_token?: true
    access_expire?: true
  }

  export type UserCountAggregateInputType = {
    uid?: true
    group_id?: true
    tag?: true
    username?: true
    password?: true
    flag_locked?: true
    flag_disabled?: true
    flag_ad?: true
    flag_gs?: true
    login_attempt?: true
    attempt_time?: true
    access_token?: true
    access_expire?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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




  export type userGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    uid: number
    group_id: number | null
    tag: string | null
    username: string | null
    password: string | null
    flag_locked: number | null
    flag_disabled: number | null
    flag_ad: number | null
    flag_gs: number | null
    login_attempt: number | null
    attempt_time: Date | null
    access_token: string | null
    access_expire: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
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


  export type userSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uid?: boolean
    group_id?: boolean
    tag?: boolean
    username?: boolean
    password?: boolean
    flag_locked?: boolean
    flag_disabled?: boolean
    flag_ad?: boolean
    flag_gs?: boolean
    login_attempt?: boolean
    attempt_time?: boolean
    access_token?: boolean
    access_expire?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    uid?: boolean
    group_id?: boolean
    tag?: boolean
    username?: boolean
    password?: boolean
    flag_locked?: boolean
    flag_disabled?: boolean
    flag_ad?: boolean
    flag_gs?: boolean
    login_attempt?: boolean
    attempt_time?: boolean
    access_token?: boolean
    access_expire?: boolean
  }


  export type $userPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {}
    scalars: $Extensions.GetResult<{
      uid: number
      group_id: number | null
      tag: string | null
      username: string | null
      password: string | null
      flag_locked: number | null
      flag_disabled: number | null
      flag_ad: number | null
      flag_gs: number | null
      login_attempt: number | null
      attempt_time: Date | null
      access_token: string | null
      access_expire: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<userFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends userFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>
    ): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends userFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>
    ): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends userFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `uid`
     * const userWithUidOnly = await prisma.user.findMany({ select: { uid: true } })
     * 
    **/
    findMany<T extends userFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, userFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends userCreateArgs<ExtArgs>>(
      args: SelectSubset<T, userCreateArgs<ExtArgs>>
    ): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {userCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends userCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends userDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, userDeleteArgs<ExtArgs>>
    ): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
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
    **/
    update<T extends userUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, userUpdateArgs<ExtArgs>>
    ): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends userDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
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
    **/
    updateMany<T extends userUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
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
    **/
    upsert<T extends userUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, userUpsertArgs<ExtArgs>>
    ): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
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
     * @param {userGroupByArgs} args - Group by arguments.
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
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the user model
   */ 
  interface userFieldRefs {
    readonly uid: FieldRef<"user", 'Int'>
    readonly group_id: FieldRef<"user", 'Int'>
    readonly tag: FieldRef<"user", 'String'>
    readonly username: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
    readonly flag_locked: FieldRef<"user", 'Int'>
    readonly flag_disabled: FieldRef<"user", 'Int'>
    readonly flag_ad: FieldRef<"user", 'Int'>
    readonly flag_gs: FieldRef<"user", 'Int'>
    readonly login_attempt: FieldRef<"user", 'Int'>
    readonly attempt_time: FieldRef<"user", 'DateTime'>
    readonly access_token: FieldRef<"user", 'String'>
    readonly access_expire: FieldRef<"user", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }


  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }


  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data?: XOR<userCreateInput, userUncheckedCreateInput>
  }


  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }


  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
  }


  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }


  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }


  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
  }


  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
  }



  /**
   * Model user_role
   */

  export type AggregateUser_role = {
    _count: User_roleCountAggregateOutputType | null
    _avg: User_roleAvgAggregateOutputType | null
    _sum: User_roleSumAggregateOutputType | null
    _min: User_roleMinAggregateOutputType | null
    _max: User_roleMaxAggregateOutputType | null
  }

  export type User_roleAvgAggregateOutputType = {
    urole_id: number | null
    arole_id: number | null
    uid: number | null
    status: number | null
  }

  export type User_roleSumAggregateOutputType = {
    urole_id: number | null
    arole_id: number | null
    uid: number | null
    status: number | null
  }

  export type User_roleMinAggregateOutputType = {
    urole_id: number | null
    arole_id: number | null
    uid: number | null
    status: number | null
  }

  export type User_roleMaxAggregateOutputType = {
    urole_id: number | null
    arole_id: number | null
    uid: number | null
    status: number | null
  }

  export type User_roleCountAggregateOutputType = {
    urole_id: number
    arole_id: number
    uid: number
    status: number
    _all: number
  }


  export type User_roleAvgAggregateInputType = {
    urole_id?: true
    arole_id?: true
    uid?: true
    status?: true
  }

  export type User_roleSumAggregateInputType = {
    urole_id?: true
    arole_id?: true
    uid?: true
    status?: true
  }

  export type User_roleMinAggregateInputType = {
    urole_id?: true
    arole_id?: true
    uid?: true
    status?: true
  }

  export type User_roleMaxAggregateInputType = {
    urole_id?: true
    arole_id?: true
    uid?: true
    status?: true
  }

  export type User_roleCountAggregateInputType = {
    urole_id?: true
    arole_id?: true
    uid?: true
    status?: true
    _all?: true
  }

  export type User_roleAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_role to aggregate.
     */
    where?: user_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_roles to fetch.
     */
    orderBy?: user_roleOrderByWithRelationInput | user_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_roles
    **/
    _count?: true | User_roleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_roleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_roleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_roleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_roleMaxAggregateInputType
  }

  export type GetUser_roleAggregateType<T extends User_roleAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_role]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_role[P]>
      : GetScalarType<T[P], AggregateUser_role[P]>
  }




  export type user_roleGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: user_roleWhereInput
    orderBy?: user_roleOrderByWithAggregationInput | user_roleOrderByWithAggregationInput[]
    by: User_roleScalarFieldEnum[] | User_roleScalarFieldEnum
    having?: user_roleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_roleCountAggregateInputType | true
    _avg?: User_roleAvgAggregateInputType
    _sum?: User_roleSumAggregateInputType
    _min?: User_roleMinAggregateInputType
    _max?: User_roleMaxAggregateInputType
  }

  export type User_roleGroupByOutputType = {
    urole_id: number
    arole_id: number | null
    uid: number | null
    status: number | null
    _count: User_roleCountAggregateOutputType | null
    _avg: User_roleAvgAggregateOutputType | null
    _sum: User_roleSumAggregateOutputType | null
    _min: User_roleMinAggregateOutputType | null
    _max: User_roleMaxAggregateOutputType | null
  }

  type GetUser_roleGroupByPayload<T extends user_roleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_roleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_roleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_roleGroupByOutputType[P]>
            : GetScalarType<T[P], User_roleGroupByOutputType[P]>
        }
      >
    >


  export type user_roleSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    urole_id?: boolean
    arole_id?: boolean
    uid?: boolean
    status?: boolean
  }, ExtArgs["result"]["user_role"]>

  export type user_roleSelectScalar = {
    urole_id?: boolean
    arole_id?: boolean
    uid?: boolean
    status?: boolean
  }


  export type $user_rolePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "user_role"
    objects: {}
    scalars: $Extensions.GetResult<{
      urole_id: number
      arole_id: number | null
      uid: number | null
      status: number | null
    }, ExtArgs["result"]["user_role"]>
    composites: {}
  }


  type user_roleGetPayload<S extends boolean | null | undefined | user_roleDefaultArgs> = $Result.GetResult<Prisma.$user_rolePayload, S>

  type user_roleCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<user_roleFindManyArgs, 'select' | 'include'> & {
      select?: User_roleCountAggregateInputType | true
    }

  export interface user_roleDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_role'], meta: { name: 'user_role' } }
    /**
     * Find zero or one User_role that matches the filter.
     * @param {user_roleFindUniqueArgs} args - Arguments to find a User_role
     * @example
     * // Get one User_role
     * const user_role = await prisma.user_role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends user_roleFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, user_roleFindUniqueArgs<ExtArgs>>
    ): Prisma__user_roleClient<$Result.GetResult<Prisma.$user_rolePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User_role that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {user_roleFindUniqueOrThrowArgs} args - Arguments to find a User_role
     * @example
     * // Get one User_role
     * const user_role = await prisma.user_role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends user_roleFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, user_roleFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__user_roleClient<$Result.GetResult<Prisma.$user_rolePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User_role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_roleFindFirstArgs} args - Arguments to find a User_role
     * @example
     * // Get one User_role
     * const user_role = await prisma.user_role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends user_roleFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, user_roleFindFirstArgs<ExtArgs>>
    ): Prisma__user_roleClient<$Result.GetResult<Prisma.$user_rolePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User_role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_roleFindFirstOrThrowArgs} args - Arguments to find a User_role
     * @example
     * // Get one User_role
     * const user_role = await prisma.user_role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends user_roleFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, user_roleFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__user_roleClient<$Result.GetResult<Prisma.$user_rolePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more User_roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_roleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_roles
     * const user_roles = await prisma.user_role.findMany()
     * 
     * // Get first 10 User_roles
     * const user_roles = await prisma.user_role.findMany({ take: 10 })
     * 
     * // Only select the `urole_id`
     * const user_roleWithUrole_idOnly = await prisma.user_role.findMany({ select: { urole_id: true } })
     * 
    **/
    findMany<T extends user_roleFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, user_roleFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_rolePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User_role.
     * @param {user_roleCreateArgs} args - Arguments to create a User_role.
     * @example
     * // Create one User_role
     * const User_role = await prisma.user_role.create({
     *   data: {
     *     // ... data to create a User_role
     *   }
     * })
     * 
    **/
    create<T extends user_roleCreateArgs<ExtArgs>>(
      args: SelectSubset<T, user_roleCreateArgs<ExtArgs>>
    ): Prisma__user_roleClient<$Result.GetResult<Prisma.$user_rolePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many User_roles.
     *     @param {user_roleCreateManyArgs} args - Arguments to create many User_roles.
     *     @example
     *     // Create many User_roles
     *     const user_role = await prisma.user_role.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends user_roleCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, user_roleCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User_role.
     * @param {user_roleDeleteArgs} args - Arguments to delete one User_role.
     * @example
     * // Delete one User_role
     * const User_role = await prisma.user_role.delete({
     *   where: {
     *     // ... filter to delete one User_role
     *   }
     * })
     * 
    **/
    delete<T extends user_roleDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, user_roleDeleteArgs<ExtArgs>>
    ): Prisma__user_roleClient<$Result.GetResult<Prisma.$user_rolePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User_role.
     * @param {user_roleUpdateArgs} args - Arguments to update one User_role.
     * @example
     * // Update one User_role
     * const user_role = await prisma.user_role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends user_roleUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, user_roleUpdateArgs<ExtArgs>>
    ): Prisma__user_roleClient<$Result.GetResult<Prisma.$user_rolePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more User_roles.
     * @param {user_roleDeleteManyArgs} args - Arguments to filter User_roles to delete.
     * @example
     * // Delete a few User_roles
     * const { count } = await prisma.user_role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends user_roleDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, user_roleDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_roleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_roles
     * const user_role = await prisma.user_role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends user_roleUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, user_roleUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User_role.
     * @param {user_roleUpsertArgs} args - Arguments to update or create a User_role.
     * @example
     * // Update or create a User_role
     * const user_role = await prisma.user_role.upsert({
     *   create: {
     *     // ... data to create a User_role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_role we want to update
     *   }
     * })
    **/
    upsert<T extends user_roleUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, user_roleUpsertArgs<ExtArgs>>
    ): Prisma__user_roleClient<$Result.GetResult<Prisma.$user_rolePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of User_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_roleCountArgs} args - Arguments to filter User_roles to count.
     * @example
     * // Count the number of User_roles
     * const count = await prisma.user_role.count({
     *   where: {
     *     // ... the filter for the User_roles we want to count
     *   }
     * })
    **/
    count<T extends user_roleCountArgs>(
      args?: Subset<T, user_roleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_roleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_roleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends User_roleAggregateArgs>(args: Subset<T, User_roleAggregateArgs>): Prisma.PrismaPromise<GetUser_roleAggregateType<T>>

    /**
     * Group by User_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_roleGroupByArgs} args - Group by arguments.
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
      T extends user_roleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_roleGroupByArgs['orderBy'] }
        : { orderBy?: user_roleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, user_roleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_roleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_role model
   */
  readonly fields: user_roleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_roleClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the user_role model
   */ 
  interface user_roleFieldRefs {
    readonly urole_id: FieldRef<"user_role", 'Int'>
    readonly arole_id: FieldRef<"user_role", 'Int'>
    readonly uid: FieldRef<"user_role", 'Int'>
    readonly status: FieldRef<"user_role", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * user_role findUnique
   */
  export type user_roleFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
    /**
     * Filter, which user_role to fetch.
     */
    where: user_roleWhereUniqueInput
  }


  /**
   * user_role findUniqueOrThrow
   */
  export type user_roleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
    /**
     * Filter, which user_role to fetch.
     */
    where: user_roleWhereUniqueInput
  }


  /**
   * user_role findFirst
   */
  export type user_roleFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
    /**
     * Filter, which user_role to fetch.
     */
    where?: user_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_roles to fetch.
     */
    orderBy?: user_roleOrderByWithRelationInput | user_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_roles.
     */
    cursor?: user_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_roles.
     */
    distinct?: User_roleScalarFieldEnum | User_roleScalarFieldEnum[]
  }


  /**
   * user_role findFirstOrThrow
   */
  export type user_roleFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
    /**
     * Filter, which user_role to fetch.
     */
    where?: user_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_roles to fetch.
     */
    orderBy?: user_roleOrderByWithRelationInput | user_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_roles.
     */
    cursor?: user_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_roles.
     */
    distinct?: User_roleScalarFieldEnum | User_roleScalarFieldEnum[]
  }


  /**
   * user_role findMany
   */
  export type user_roleFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
    /**
     * Filter, which user_roles to fetch.
     */
    where?: user_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_roles to fetch.
     */
    orderBy?: user_roleOrderByWithRelationInput | user_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_roles.
     */
    cursor?: user_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_roles.
     */
    skip?: number
    distinct?: User_roleScalarFieldEnum | User_roleScalarFieldEnum[]
  }


  /**
   * user_role create
   */
  export type user_roleCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
    /**
     * The data needed to create a user_role.
     */
    data?: XOR<user_roleCreateInput, user_roleUncheckedCreateInput>
  }


  /**
   * user_role createMany
   */
  export type user_roleCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_roles.
     */
    data: user_roleCreateManyInput | user_roleCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * user_role update
   */
  export type user_roleUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
    /**
     * The data needed to update a user_role.
     */
    data: XOR<user_roleUpdateInput, user_roleUncheckedUpdateInput>
    /**
     * Choose, which user_role to update.
     */
    where: user_roleWhereUniqueInput
  }


  /**
   * user_role updateMany
   */
  export type user_roleUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_roles.
     */
    data: XOR<user_roleUpdateManyMutationInput, user_roleUncheckedUpdateManyInput>
    /**
     * Filter which user_roles to update
     */
    where?: user_roleWhereInput
  }


  /**
   * user_role upsert
   */
  export type user_roleUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
    /**
     * The filter to search for the user_role to update in case it exists.
     */
    where: user_roleWhereUniqueInput
    /**
     * In case the user_role found by the `where` argument doesn't exist, create a new user_role with this data.
     */
    create: XOR<user_roleCreateInput, user_roleUncheckedCreateInput>
    /**
     * In case the user_role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_roleUpdateInput, user_roleUncheckedUpdateInput>
  }


  /**
   * user_role delete
   */
  export type user_roleDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
    /**
     * Filter which user_role to delete.
     */
    where: user_roleWhereUniqueInput
  }


  /**
   * user_role deleteMany
   */
  export type user_roleDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_roles to delete
     */
    where?: user_roleWhereInput
  }


  /**
   * user_role without action
   */
  export type user_roleDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_role
     */
    select?: user_roleSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    uid: 'uid',
    title: 'title',
    meta: 'meta',
    timestamp: 'timestamp'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const AppScalarFieldEnum: {
    app_id: 'app_id',
    app_name: 'app_name',
    app_tag: 'app_tag',
    app_desc: 'app_desc',
    app_token: 'app_token',
    app_db: 'app_db',
    status: 'status'
  };

  export type AppScalarFieldEnum = (typeof AppScalarFieldEnum)[keyof typeof AppScalarFieldEnum]


  export const App_roleScalarFieldEnum: {
    arole_id: 'arole_id',
    app_id: 'app_id',
    role_name: 'role_name',
    role_desc: 'role_desc',
    status: 'status'
  };

  export type App_roleScalarFieldEnum = (typeof App_roleScalarFieldEnum)[keyof typeof App_roleScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    group_id: 'group_id',
    group_name: 'group_name',
    group_desc: 'group_desc',
    status: 'status'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const PhotoScalarFieldEnum: {
    photo_id: 'photo_id',
    group_id: 'group_id',
    uid: 'uid',
    tag: 'tag',
    path: 'path',
    status: 'status'
  };

  export type PhotoScalarFieldEnum = (typeof PhotoScalarFieldEnum)[keyof typeof PhotoScalarFieldEnum]


  export const UserScalarFieldEnum: {
    uid: 'uid',
    group_id: 'group_id',
    tag: 'tag',
    username: 'username',
    password: 'password',
    flag_locked: 'flag_locked',
    flag_disabled: 'flag_disabled',
    flag_ad: 'flag_ad',
    flag_gs: 'flag_gs',
    login_attempt: 'login_attempt',
    attempt_time: 'attempt_time',
    access_token: 'access_token',
    access_expire: 'access_expire'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const User_roleScalarFieldEnum: {
    urole_id: 'urole_id',
    arole_id: 'arole_id',
    uid: 'uid',
    status: 'status'
  };

  export type User_roleScalarFieldEnum = (typeof User_roleScalarFieldEnum)[keyof typeof User_roleScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type activityWhereInput = {
    AND?: activityWhereInput | activityWhereInput[]
    OR?: activityWhereInput[]
    NOT?: activityWhereInput | activityWhereInput[]
    id?: IntFilter<"activity"> | number
    uid?: IntNullableFilter<"activity"> | number | null
    title?: StringNullableFilter<"activity"> | string | null
    meta?: StringNullableFilter<"activity"> | string | null
    timestamp?: DateTimeNullableFilter<"activity"> | Date | string | null
  }

  export type activityOrderByWithRelationInput = {
    id?: SortOrder
    uid?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    meta?: SortOrderInput | SortOrder
    timestamp?: SortOrderInput | SortOrder
  }

  export type activityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: activityWhereInput | activityWhereInput[]
    OR?: activityWhereInput[]
    NOT?: activityWhereInput | activityWhereInput[]
    uid?: IntNullableFilter<"activity"> | number | null
    title?: StringNullableFilter<"activity"> | string | null
    meta?: StringNullableFilter<"activity"> | string | null
    timestamp?: DateTimeNullableFilter<"activity"> | Date | string | null
  }, "id">

  export type activityOrderByWithAggregationInput = {
    id?: SortOrder
    uid?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    meta?: SortOrderInput | SortOrder
    timestamp?: SortOrderInput | SortOrder
    _count?: activityCountOrderByAggregateInput
    _avg?: activityAvgOrderByAggregateInput
    _max?: activityMaxOrderByAggregateInput
    _min?: activityMinOrderByAggregateInput
    _sum?: activitySumOrderByAggregateInput
  }

  export type activityScalarWhereWithAggregatesInput = {
    AND?: activityScalarWhereWithAggregatesInput | activityScalarWhereWithAggregatesInput[]
    OR?: activityScalarWhereWithAggregatesInput[]
    NOT?: activityScalarWhereWithAggregatesInput | activityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"activity"> | number
    uid?: IntNullableWithAggregatesFilter<"activity"> | number | null
    title?: StringNullableWithAggregatesFilter<"activity"> | string | null
    meta?: StringNullableWithAggregatesFilter<"activity"> | string | null
    timestamp?: DateTimeNullableWithAggregatesFilter<"activity"> | Date | string | null
  }

  export type appWhereInput = {
    AND?: appWhereInput | appWhereInput[]
    OR?: appWhereInput[]
    NOT?: appWhereInput | appWhereInput[]
    app_id?: IntFilter<"app"> | number
    app_name?: StringNullableFilter<"app"> | string | null
    app_tag?: StringNullableFilter<"app"> | string | null
    app_desc?: StringNullableFilter<"app"> | string | null
    app_token?: StringNullableFilter<"app"> | string | null
    app_db?: StringNullableFilter<"app"> | string | null
    status?: IntNullableFilter<"app"> | number | null
  }

  export type appOrderByWithRelationInput = {
    app_id?: SortOrder
    app_name?: SortOrderInput | SortOrder
    app_tag?: SortOrderInput | SortOrder
    app_desc?: SortOrderInput | SortOrder
    app_token?: SortOrderInput | SortOrder
    app_db?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
  }

  export type appWhereUniqueInput = Prisma.AtLeast<{
    app_id?: number
    AND?: appWhereInput | appWhereInput[]
    OR?: appWhereInput[]
    NOT?: appWhereInput | appWhereInput[]
    app_name?: StringNullableFilter<"app"> | string | null
    app_tag?: StringNullableFilter<"app"> | string | null
    app_desc?: StringNullableFilter<"app"> | string | null
    app_token?: StringNullableFilter<"app"> | string | null
    app_db?: StringNullableFilter<"app"> | string | null
    status?: IntNullableFilter<"app"> | number | null
  }, "app_id">

  export type appOrderByWithAggregationInput = {
    app_id?: SortOrder
    app_name?: SortOrderInput | SortOrder
    app_tag?: SortOrderInput | SortOrder
    app_desc?: SortOrderInput | SortOrder
    app_token?: SortOrderInput | SortOrder
    app_db?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: appCountOrderByAggregateInput
    _avg?: appAvgOrderByAggregateInput
    _max?: appMaxOrderByAggregateInput
    _min?: appMinOrderByAggregateInput
    _sum?: appSumOrderByAggregateInput
  }

  export type appScalarWhereWithAggregatesInput = {
    AND?: appScalarWhereWithAggregatesInput | appScalarWhereWithAggregatesInput[]
    OR?: appScalarWhereWithAggregatesInput[]
    NOT?: appScalarWhereWithAggregatesInput | appScalarWhereWithAggregatesInput[]
    app_id?: IntWithAggregatesFilter<"app"> | number
    app_name?: StringNullableWithAggregatesFilter<"app"> | string | null
    app_tag?: StringNullableWithAggregatesFilter<"app"> | string | null
    app_desc?: StringNullableWithAggregatesFilter<"app"> | string | null
    app_token?: StringNullableWithAggregatesFilter<"app"> | string | null
    app_db?: StringNullableWithAggregatesFilter<"app"> | string | null
    status?: IntNullableWithAggregatesFilter<"app"> | number | null
  }

  export type app_roleWhereInput = {
    AND?: app_roleWhereInput | app_roleWhereInput[]
    OR?: app_roleWhereInput[]
    NOT?: app_roleWhereInput | app_roleWhereInput[]
    arole_id?: IntFilter<"app_role"> | number
    app_id?: IntNullableFilter<"app_role"> | number | null
    role_name?: StringNullableFilter<"app_role"> | string | null
    role_desc?: StringNullableFilter<"app_role"> | string | null
    status?: IntNullableFilter<"app_role"> | number | null
  }

  export type app_roleOrderByWithRelationInput = {
    arole_id?: SortOrder
    app_id?: SortOrderInput | SortOrder
    role_name?: SortOrderInput | SortOrder
    role_desc?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
  }

  export type app_roleWhereUniqueInput = Prisma.AtLeast<{
    arole_id?: number
    AND?: app_roleWhereInput | app_roleWhereInput[]
    OR?: app_roleWhereInput[]
    NOT?: app_roleWhereInput | app_roleWhereInput[]
    app_id?: IntNullableFilter<"app_role"> | number | null
    role_name?: StringNullableFilter<"app_role"> | string | null
    role_desc?: StringNullableFilter<"app_role"> | string | null
    status?: IntNullableFilter<"app_role"> | number | null
  }, "arole_id">

  export type app_roleOrderByWithAggregationInput = {
    arole_id?: SortOrder
    app_id?: SortOrderInput | SortOrder
    role_name?: SortOrderInput | SortOrder
    role_desc?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: app_roleCountOrderByAggregateInput
    _avg?: app_roleAvgOrderByAggregateInput
    _max?: app_roleMaxOrderByAggregateInput
    _min?: app_roleMinOrderByAggregateInput
    _sum?: app_roleSumOrderByAggregateInput
  }

  export type app_roleScalarWhereWithAggregatesInput = {
    AND?: app_roleScalarWhereWithAggregatesInput | app_roleScalarWhereWithAggregatesInput[]
    OR?: app_roleScalarWhereWithAggregatesInput[]
    NOT?: app_roleScalarWhereWithAggregatesInput | app_roleScalarWhereWithAggregatesInput[]
    arole_id?: IntWithAggregatesFilter<"app_role"> | number
    app_id?: IntNullableWithAggregatesFilter<"app_role"> | number | null
    role_name?: StringNullableWithAggregatesFilter<"app_role"> | string | null
    role_desc?: StringNullableWithAggregatesFilter<"app_role"> | string | null
    status?: IntNullableWithAggregatesFilter<"app_role"> | number | null
  }

  export type groupWhereInput = {
    AND?: groupWhereInput | groupWhereInput[]
    OR?: groupWhereInput[]
    NOT?: groupWhereInput | groupWhereInput[]
    group_id?: IntFilter<"group"> | number
    group_name?: StringNullableFilter<"group"> | string | null
    group_desc?: StringNullableFilter<"group"> | string | null
    status?: IntNullableFilter<"group"> | number | null
  }

  export type groupOrderByWithRelationInput = {
    group_id?: SortOrder
    group_name?: SortOrderInput | SortOrder
    group_desc?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
  }

  export type groupWhereUniqueInput = Prisma.AtLeast<{
    group_id?: number
    AND?: groupWhereInput | groupWhereInput[]
    OR?: groupWhereInput[]
    NOT?: groupWhereInput | groupWhereInput[]
    group_name?: StringNullableFilter<"group"> | string | null
    group_desc?: StringNullableFilter<"group"> | string | null
    status?: IntNullableFilter<"group"> | number | null
  }, "group_id">

  export type groupOrderByWithAggregationInput = {
    group_id?: SortOrder
    group_name?: SortOrderInput | SortOrder
    group_desc?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: groupCountOrderByAggregateInput
    _avg?: groupAvgOrderByAggregateInput
    _max?: groupMaxOrderByAggregateInput
    _min?: groupMinOrderByAggregateInput
    _sum?: groupSumOrderByAggregateInput
  }

  export type groupScalarWhereWithAggregatesInput = {
    AND?: groupScalarWhereWithAggregatesInput | groupScalarWhereWithAggregatesInput[]
    OR?: groupScalarWhereWithAggregatesInput[]
    NOT?: groupScalarWhereWithAggregatesInput | groupScalarWhereWithAggregatesInput[]
    group_id?: IntWithAggregatesFilter<"group"> | number
    group_name?: StringNullableWithAggregatesFilter<"group"> | string | null
    group_desc?: StringNullableWithAggregatesFilter<"group"> | string | null
    status?: IntNullableWithAggregatesFilter<"group"> | number | null
  }

  export type photoWhereInput = {
    AND?: photoWhereInput | photoWhereInput[]
    OR?: photoWhereInput[]
    NOT?: photoWhereInput | photoWhereInput[]
    photo_id?: IntFilter<"photo"> | number
    group_id?: IntNullableFilter<"photo"> | number | null
    uid?: IntNullableFilter<"photo"> | number | null
    tag?: StringNullableFilter<"photo"> | string | null
    path?: StringNullableFilter<"photo"> | string | null
    status?: IntNullableFilter<"photo"> | number | null
  }

  export type photoOrderByWithRelationInput = {
    photo_id?: SortOrder
    group_id?: SortOrderInput | SortOrder
    uid?: SortOrderInput | SortOrder
    tag?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
  }

  export type photoWhereUniqueInput = Prisma.AtLeast<{
    photo_id?: number
    AND?: photoWhereInput | photoWhereInput[]
    OR?: photoWhereInput[]
    NOT?: photoWhereInput | photoWhereInput[]
    group_id?: IntNullableFilter<"photo"> | number | null
    uid?: IntNullableFilter<"photo"> | number | null
    tag?: StringNullableFilter<"photo"> | string | null
    path?: StringNullableFilter<"photo"> | string | null
    status?: IntNullableFilter<"photo"> | number | null
  }, "photo_id">

  export type photoOrderByWithAggregationInput = {
    photo_id?: SortOrder
    group_id?: SortOrderInput | SortOrder
    uid?: SortOrderInput | SortOrder
    tag?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: photoCountOrderByAggregateInput
    _avg?: photoAvgOrderByAggregateInput
    _max?: photoMaxOrderByAggregateInput
    _min?: photoMinOrderByAggregateInput
    _sum?: photoSumOrderByAggregateInput
  }

  export type photoScalarWhereWithAggregatesInput = {
    AND?: photoScalarWhereWithAggregatesInput | photoScalarWhereWithAggregatesInput[]
    OR?: photoScalarWhereWithAggregatesInput[]
    NOT?: photoScalarWhereWithAggregatesInput | photoScalarWhereWithAggregatesInput[]
    photo_id?: IntWithAggregatesFilter<"photo"> | number
    group_id?: IntNullableWithAggregatesFilter<"photo"> | number | null
    uid?: IntNullableWithAggregatesFilter<"photo"> | number | null
    tag?: StringNullableWithAggregatesFilter<"photo"> | string | null
    path?: StringNullableWithAggregatesFilter<"photo"> | string | null
    status?: IntNullableWithAggregatesFilter<"photo"> | number | null
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    uid?: IntFilter<"user"> | number
    group_id?: IntNullableFilter<"user"> | number | null
    tag?: StringNullableFilter<"user"> | string | null
    username?: StringNullableFilter<"user"> | string | null
    password?: StringNullableFilter<"user"> | string | null
    flag_locked?: IntNullableFilter<"user"> | number | null
    flag_disabled?: IntNullableFilter<"user"> | number | null
    flag_ad?: IntNullableFilter<"user"> | number | null
    flag_gs?: IntNullableFilter<"user"> | number | null
    login_attempt?: IntNullableFilter<"user"> | number | null
    attempt_time?: DateTimeNullableFilter<"user"> | Date | string | null
    access_token?: StringNullableFilter<"user"> | string | null
    access_expire?: DateTimeNullableFilter<"user"> | Date | string | null
  }

  export type userOrderByWithRelationInput = {
    uid?: SortOrder
    group_id?: SortOrderInput | SortOrder
    tag?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    flag_locked?: SortOrderInput | SortOrder
    flag_disabled?: SortOrderInput | SortOrder
    flag_ad?: SortOrderInput | SortOrder
    flag_gs?: SortOrderInput | SortOrder
    login_attempt?: SortOrderInput | SortOrder
    attempt_time?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    access_expire?: SortOrderInput | SortOrder
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    uid?: number
    tag?: string
    username?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    group_id?: IntNullableFilter<"user"> | number | null
    password?: StringNullableFilter<"user"> | string | null
    flag_locked?: IntNullableFilter<"user"> | number | null
    flag_disabled?: IntNullableFilter<"user"> | number | null
    flag_ad?: IntNullableFilter<"user"> | number | null
    flag_gs?: IntNullableFilter<"user"> | number | null
    login_attempt?: IntNullableFilter<"user"> | number | null
    attempt_time?: DateTimeNullableFilter<"user"> | Date | string | null
    access_token?: StringNullableFilter<"user"> | string | null
    access_expire?: DateTimeNullableFilter<"user"> | Date | string | null
  }, "uid" | "tag" | "username">

  export type userOrderByWithAggregationInput = {
    uid?: SortOrder
    group_id?: SortOrderInput | SortOrder
    tag?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    flag_locked?: SortOrderInput | SortOrder
    flag_disabled?: SortOrderInput | SortOrder
    flag_ad?: SortOrderInput | SortOrder
    flag_gs?: SortOrderInput | SortOrder
    login_attempt?: SortOrderInput | SortOrder
    attempt_time?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    access_expire?: SortOrderInput | SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    uid?: IntWithAggregatesFilter<"user"> | number
    group_id?: IntNullableWithAggregatesFilter<"user"> | number | null
    tag?: StringNullableWithAggregatesFilter<"user"> | string | null
    username?: StringNullableWithAggregatesFilter<"user"> | string | null
    password?: StringNullableWithAggregatesFilter<"user"> | string | null
    flag_locked?: IntNullableWithAggregatesFilter<"user"> | number | null
    flag_disabled?: IntNullableWithAggregatesFilter<"user"> | number | null
    flag_ad?: IntNullableWithAggregatesFilter<"user"> | number | null
    flag_gs?: IntNullableWithAggregatesFilter<"user"> | number | null
    login_attempt?: IntNullableWithAggregatesFilter<"user"> | number | null
    attempt_time?: DateTimeNullableWithAggregatesFilter<"user"> | Date | string | null
    access_token?: StringNullableWithAggregatesFilter<"user"> | string | null
    access_expire?: DateTimeNullableWithAggregatesFilter<"user"> | Date | string | null
  }

  export type user_roleWhereInput = {
    AND?: user_roleWhereInput | user_roleWhereInput[]
    OR?: user_roleWhereInput[]
    NOT?: user_roleWhereInput | user_roleWhereInput[]
    urole_id?: IntFilter<"user_role"> | number
    arole_id?: IntNullableFilter<"user_role"> | number | null
    uid?: IntNullableFilter<"user_role"> | number | null
    status?: IntNullableFilter<"user_role"> | number | null
  }

  export type user_roleOrderByWithRelationInput = {
    urole_id?: SortOrder
    arole_id?: SortOrderInput | SortOrder
    uid?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
  }

  export type user_roleWhereUniqueInput = Prisma.AtLeast<{
    urole_id?: number
    AND?: user_roleWhereInput | user_roleWhereInput[]
    OR?: user_roleWhereInput[]
    NOT?: user_roleWhereInput | user_roleWhereInput[]
    arole_id?: IntNullableFilter<"user_role"> | number | null
    uid?: IntNullableFilter<"user_role"> | number | null
    status?: IntNullableFilter<"user_role"> | number | null
  }, "urole_id">

  export type user_roleOrderByWithAggregationInput = {
    urole_id?: SortOrder
    arole_id?: SortOrderInput | SortOrder
    uid?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: user_roleCountOrderByAggregateInput
    _avg?: user_roleAvgOrderByAggregateInput
    _max?: user_roleMaxOrderByAggregateInput
    _min?: user_roleMinOrderByAggregateInput
    _sum?: user_roleSumOrderByAggregateInput
  }

  export type user_roleScalarWhereWithAggregatesInput = {
    AND?: user_roleScalarWhereWithAggregatesInput | user_roleScalarWhereWithAggregatesInput[]
    OR?: user_roleScalarWhereWithAggregatesInput[]
    NOT?: user_roleScalarWhereWithAggregatesInput | user_roleScalarWhereWithAggregatesInput[]
    urole_id?: IntWithAggregatesFilter<"user_role"> | number
    arole_id?: IntNullableWithAggregatesFilter<"user_role"> | number | null
    uid?: IntNullableWithAggregatesFilter<"user_role"> | number | null
    status?: IntNullableWithAggregatesFilter<"user_role"> | number | null
  }

  export type activityCreateInput = {
    uid?: number | null
    title?: string | null
    meta?: string | null
    timestamp?: Date | string | null
  }

  export type activityUncheckedCreateInput = {
    id?: number
    uid?: number | null
    title?: string | null
    meta?: string | null
    timestamp?: Date | string | null
  }

  export type activityUpdateInput = {
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type activityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type activityCreateManyInput = {
    id?: number
    uid?: number | null
    title?: string | null
    meta?: string | null
    timestamp?: Date | string | null
  }

  export type activityUpdateManyMutationInput = {
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type activityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    meta?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type appCreateInput = {
    app_name?: string | null
    app_tag?: string | null
    app_desc?: string | null
    app_token?: string | null
    app_db?: string | null
    status?: number | null
  }

  export type appUncheckedCreateInput = {
    app_id?: number
    app_name?: string | null
    app_tag?: string | null
    app_desc?: string | null
    app_token?: string | null
    app_db?: string | null
    status?: number | null
  }

  export type appUpdateInput = {
    app_name?: NullableStringFieldUpdateOperationsInput | string | null
    app_tag?: NullableStringFieldUpdateOperationsInput | string | null
    app_desc?: NullableStringFieldUpdateOperationsInput | string | null
    app_token?: NullableStringFieldUpdateOperationsInput | string | null
    app_db?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type appUncheckedUpdateInput = {
    app_id?: IntFieldUpdateOperationsInput | number
    app_name?: NullableStringFieldUpdateOperationsInput | string | null
    app_tag?: NullableStringFieldUpdateOperationsInput | string | null
    app_desc?: NullableStringFieldUpdateOperationsInput | string | null
    app_token?: NullableStringFieldUpdateOperationsInput | string | null
    app_db?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type appCreateManyInput = {
    app_id?: number
    app_name?: string | null
    app_tag?: string | null
    app_desc?: string | null
    app_token?: string | null
    app_db?: string | null
    status?: number | null
  }

  export type appUpdateManyMutationInput = {
    app_name?: NullableStringFieldUpdateOperationsInput | string | null
    app_tag?: NullableStringFieldUpdateOperationsInput | string | null
    app_desc?: NullableStringFieldUpdateOperationsInput | string | null
    app_token?: NullableStringFieldUpdateOperationsInput | string | null
    app_db?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type appUncheckedUpdateManyInput = {
    app_id?: IntFieldUpdateOperationsInput | number
    app_name?: NullableStringFieldUpdateOperationsInput | string | null
    app_tag?: NullableStringFieldUpdateOperationsInput | string | null
    app_desc?: NullableStringFieldUpdateOperationsInput | string | null
    app_token?: NullableStringFieldUpdateOperationsInput | string | null
    app_db?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type app_roleCreateInput = {
    app_id?: number | null
    role_name?: string | null
    role_desc?: string | null
    status?: number | null
  }

  export type app_roleUncheckedCreateInput = {
    arole_id?: number
    app_id?: number | null
    role_name?: string | null
    role_desc?: string | null
    status?: number | null
  }

  export type app_roleUpdateInput = {
    app_id?: NullableIntFieldUpdateOperationsInput | number | null
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type app_roleUncheckedUpdateInput = {
    arole_id?: IntFieldUpdateOperationsInput | number
    app_id?: NullableIntFieldUpdateOperationsInput | number | null
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type app_roleCreateManyInput = {
    arole_id?: number
    app_id?: number | null
    role_name?: string | null
    role_desc?: string | null
    status?: number | null
  }

  export type app_roleUpdateManyMutationInput = {
    app_id?: NullableIntFieldUpdateOperationsInput | number | null
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type app_roleUncheckedUpdateManyInput = {
    arole_id?: IntFieldUpdateOperationsInput | number
    app_id?: NullableIntFieldUpdateOperationsInput | number | null
    role_name?: NullableStringFieldUpdateOperationsInput | string | null
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type groupCreateInput = {
    group_name?: string | null
    group_desc?: string | null
    status?: number | null
  }

  export type groupUncheckedCreateInput = {
    group_id?: number
    group_name?: string | null
    group_desc?: string | null
    status?: number | null
  }

  export type groupUpdateInput = {
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    group_desc?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type groupUncheckedUpdateInput = {
    group_id?: IntFieldUpdateOperationsInput | number
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    group_desc?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type groupCreateManyInput = {
    group_id?: number
    group_name?: string | null
    group_desc?: string | null
    status?: number | null
  }

  export type groupUpdateManyMutationInput = {
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    group_desc?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type groupUncheckedUpdateManyInput = {
    group_id?: IntFieldUpdateOperationsInput | number
    group_name?: NullableStringFieldUpdateOperationsInput | string | null
    group_desc?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type photoCreateInput = {
    group_id?: number | null
    uid?: number | null
    tag?: string | null
    path?: string | null
    status?: number | null
  }

  export type photoUncheckedCreateInput = {
    photo_id?: number
    group_id?: number | null
    uid?: number | null
    tag?: string | null
    path?: string | null
    status?: number | null
  }

  export type photoUpdateInput = {
    group_id?: NullableIntFieldUpdateOperationsInput | number | null
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type photoUncheckedUpdateInput = {
    photo_id?: IntFieldUpdateOperationsInput | number
    group_id?: NullableIntFieldUpdateOperationsInput | number | null
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type photoCreateManyInput = {
    photo_id?: number
    group_id?: number | null
    uid?: number | null
    tag?: string | null
    path?: string | null
    status?: number | null
  }

  export type photoUpdateManyMutationInput = {
    group_id?: NullableIntFieldUpdateOperationsInput | number | null
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type photoUncheckedUpdateManyInput = {
    photo_id?: IntFieldUpdateOperationsInput | number
    group_id?: NullableIntFieldUpdateOperationsInput | number | null
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type userCreateInput = {
    group_id?: number | null
    tag?: string | null
    username?: string | null
    password?: string | null
    flag_locked?: number | null
    flag_disabled?: number | null
    flag_ad?: number | null
    flag_gs?: number | null
    login_attempt?: number | null
    attempt_time?: Date | string | null
    access_token?: string | null
    access_expire?: Date | string | null
  }

  export type userUncheckedCreateInput = {
    uid?: number
    group_id?: number | null
    tag?: string | null
    username?: string | null
    password?: string | null
    flag_locked?: number | null
    flag_disabled?: number | null
    flag_ad?: number | null
    flag_gs?: number | null
    login_attempt?: number | null
    attempt_time?: Date | string | null
    access_token?: string | null
    access_expire?: Date | string | null
  }

  export type userUpdateInput = {
    group_id?: NullableIntFieldUpdateOperationsInput | number | null
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    flag_locked?: NullableIntFieldUpdateOperationsInput | number | null
    flag_disabled?: NullableIntFieldUpdateOperationsInput | number | null
    flag_ad?: NullableIntFieldUpdateOperationsInput | number | null
    flag_gs?: NullableIntFieldUpdateOperationsInput | number | null
    login_attempt?: NullableIntFieldUpdateOperationsInput | number | null
    attempt_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_expire?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type userUncheckedUpdateInput = {
    uid?: IntFieldUpdateOperationsInput | number
    group_id?: NullableIntFieldUpdateOperationsInput | number | null
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    flag_locked?: NullableIntFieldUpdateOperationsInput | number | null
    flag_disabled?: NullableIntFieldUpdateOperationsInput | number | null
    flag_ad?: NullableIntFieldUpdateOperationsInput | number | null
    flag_gs?: NullableIntFieldUpdateOperationsInput | number | null
    login_attempt?: NullableIntFieldUpdateOperationsInput | number | null
    attempt_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_expire?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type userCreateManyInput = {
    uid?: number
    group_id?: number | null
    tag?: string | null
    username?: string | null
    password?: string | null
    flag_locked?: number | null
    flag_disabled?: number | null
    flag_ad?: number | null
    flag_gs?: number | null
    login_attempt?: number | null
    attempt_time?: Date | string | null
    access_token?: string | null
    access_expire?: Date | string | null
  }

  export type userUpdateManyMutationInput = {
    group_id?: NullableIntFieldUpdateOperationsInput | number | null
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    flag_locked?: NullableIntFieldUpdateOperationsInput | number | null
    flag_disabled?: NullableIntFieldUpdateOperationsInput | number | null
    flag_ad?: NullableIntFieldUpdateOperationsInput | number | null
    flag_gs?: NullableIntFieldUpdateOperationsInput | number | null
    login_attempt?: NullableIntFieldUpdateOperationsInput | number | null
    attempt_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_expire?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type userUncheckedUpdateManyInput = {
    uid?: IntFieldUpdateOperationsInput | number
    group_id?: NullableIntFieldUpdateOperationsInput | number | null
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    flag_locked?: NullableIntFieldUpdateOperationsInput | number | null
    flag_disabled?: NullableIntFieldUpdateOperationsInput | number | null
    flag_ad?: NullableIntFieldUpdateOperationsInput | number | null
    flag_gs?: NullableIntFieldUpdateOperationsInput | number | null
    login_attempt?: NullableIntFieldUpdateOperationsInput | number | null
    attempt_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_expire?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_roleCreateInput = {
    arole_id?: number | null
    uid?: number | null
    status?: number | null
  }

  export type user_roleUncheckedCreateInput = {
    urole_id?: number
    arole_id?: number | null
    uid?: number | null
    status?: number | null
  }

  export type user_roleUpdateInput = {
    arole_id?: NullableIntFieldUpdateOperationsInput | number | null
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type user_roleUncheckedUpdateInput = {
    urole_id?: IntFieldUpdateOperationsInput | number
    arole_id?: NullableIntFieldUpdateOperationsInput | number | null
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type user_roleCreateManyInput = {
    urole_id?: number
    arole_id?: number | null
    uid?: number | null
    status?: number | null
  }

  export type user_roleUpdateManyMutationInput = {
    arole_id?: NullableIntFieldUpdateOperationsInput | number | null
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type user_roleUncheckedUpdateManyInput = {
    urole_id?: IntFieldUpdateOperationsInput | number
    arole_id?: NullableIntFieldUpdateOperationsInput | number | null
    uid?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type activityCountOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    title?: SortOrder
    meta?: SortOrder
    timestamp?: SortOrder
  }

  export type activityAvgOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
  }

  export type activityMaxOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    title?: SortOrder
    meta?: SortOrder
    timestamp?: SortOrder
  }

  export type activityMinOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
    title?: SortOrder
    meta?: SortOrder
    timestamp?: SortOrder
  }

  export type activitySumOrderByAggregateInput = {
    id?: SortOrder
    uid?: SortOrder
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type appCountOrderByAggregateInput = {
    app_id?: SortOrder
    app_name?: SortOrder
    app_tag?: SortOrder
    app_desc?: SortOrder
    app_token?: SortOrder
    app_db?: SortOrder
    status?: SortOrder
  }

  export type appAvgOrderByAggregateInput = {
    app_id?: SortOrder
    status?: SortOrder
  }

  export type appMaxOrderByAggregateInput = {
    app_id?: SortOrder
    app_name?: SortOrder
    app_tag?: SortOrder
    app_desc?: SortOrder
    app_token?: SortOrder
    app_db?: SortOrder
    status?: SortOrder
  }

  export type appMinOrderByAggregateInput = {
    app_id?: SortOrder
    app_name?: SortOrder
    app_tag?: SortOrder
    app_desc?: SortOrder
    app_token?: SortOrder
    app_db?: SortOrder
    status?: SortOrder
  }

  export type appSumOrderByAggregateInput = {
    app_id?: SortOrder
    status?: SortOrder
  }

  export type app_roleCountOrderByAggregateInput = {
    arole_id?: SortOrder
    app_id?: SortOrder
    role_name?: SortOrder
    role_desc?: SortOrder
    status?: SortOrder
  }

  export type app_roleAvgOrderByAggregateInput = {
    arole_id?: SortOrder
    app_id?: SortOrder
    status?: SortOrder
  }

  export type app_roleMaxOrderByAggregateInput = {
    arole_id?: SortOrder
    app_id?: SortOrder
    role_name?: SortOrder
    role_desc?: SortOrder
    status?: SortOrder
  }

  export type app_roleMinOrderByAggregateInput = {
    arole_id?: SortOrder
    app_id?: SortOrder
    role_name?: SortOrder
    role_desc?: SortOrder
    status?: SortOrder
  }

  export type app_roleSumOrderByAggregateInput = {
    arole_id?: SortOrder
    app_id?: SortOrder
    status?: SortOrder
  }

  export type groupCountOrderByAggregateInput = {
    group_id?: SortOrder
    group_name?: SortOrder
    group_desc?: SortOrder
    status?: SortOrder
  }

  export type groupAvgOrderByAggregateInput = {
    group_id?: SortOrder
    status?: SortOrder
  }

  export type groupMaxOrderByAggregateInput = {
    group_id?: SortOrder
    group_name?: SortOrder
    group_desc?: SortOrder
    status?: SortOrder
  }

  export type groupMinOrderByAggregateInput = {
    group_id?: SortOrder
    group_name?: SortOrder
    group_desc?: SortOrder
    status?: SortOrder
  }

  export type groupSumOrderByAggregateInput = {
    group_id?: SortOrder
    status?: SortOrder
  }

  export type photoCountOrderByAggregateInput = {
    photo_id?: SortOrder
    group_id?: SortOrder
    uid?: SortOrder
    tag?: SortOrder
    path?: SortOrder
    status?: SortOrder
  }

  export type photoAvgOrderByAggregateInput = {
    photo_id?: SortOrder
    group_id?: SortOrder
    uid?: SortOrder
    status?: SortOrder
  }

  export type photoMaxOrderByAggregateInput = {
    photo_id?: SortOrder
    group_id?: SortOrder
    uid?: SortOrder
    tag?: SortOrder
    path?: SortOrder
    status?: SortOrder
  }

  export type photoMinOrderByAggregateInput = {
    photo_id?: SortOrder
    group_id?: SortOrder
    uid?: SortOrder
    tag?: SortOrder
    path?: SortOrder
    status?: SortOrder
  }

  export type photoSumOrderByAggregateInput = {
    photo_id?: SortOrder
    group_id?: SortOrder
    uid?: SortOrder
    status?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    uid?: SortOrder
    group_id?: SortOrder
    tag?: SortOrder
    username?: SortOrder
    password?: SortOrder
    flag_locked?: SortOrder
    flag_disabled?: SortOrder
    flag_ad?: SortOrder
    flag_gs?: SortOrder
    login_attempt?: SortOrder
    attempt_time?: SortOrder
    access_token?: SortOrder
    access_expire?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    uid?: SortOrder
    group_id?: SortOrder
    flag_locked?: SortOrder
    flag_disabled?: SortOrder
    flag_ad?: SortOrder
    flag_gs?: SortOrder
    login_attempt?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    uid?: SortOrder
    group_id?: SortOrder
    tag?: SortOrder
    username?: SortOrder
    password?: SortOrder
    flag_locked?: SortOrder
    flag_disabled?: SortOrder
    flag_ad?: SortOrder
    flag_gs?: SortOrder
    login_attempt?: SortOrder
    attempt_time?: SortOrder
    access_token?: SortOrder
    access_expire?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    uid?: SortOrder
    group_id?: SortOrder
    tag?: SortOrder
    username?: SortOrder
    password?: SortOrder
    flag_locked?: SortOrder
    flag_disabled?: SortOrder
    flag_ad?: SortOrder
    flag_gs?: SortOrder
    login_attempt?: SortOrder
    attempt_time?: SortOrder
    access_token?: SortOrder
    access_expire?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    uid?: SortOrder
    group_id?: SortOrder
    flag_locked?: SortOrder
    flag_disabled?: SortOrder
    flag_ad?: SortOrder
    flag_gs?: SortOrder
    login_attempt?: SortOrder
  }

  export type user_roleCountOrderByAggregateInput = {
    urole_id?: SortOrder
    arole_id?: SortOrder
    uid?: SortOrder
    status?: SortOrder
  }

  export type user_roleAvgOrderByAggregateInput = {
    urole_id?: SortOrder
    arole_id?: SortOrder
    uid?: SortOrder
    status?: SortOrder
  }

  export type user_roleMaxOrderByAggregateInput = {
    urole_id?: SortOrder
    arole_id?: SortOrder
    uid?: SortOrder
    status?: SortOrder
  }

  export type user_roleMinOrderByAggregateInput = {
    urole_id?: SortOrder
    arole_id?: SortOrder
    uid?: SortOrder
    status?: SortOrder
  }

  export type user_roleSumOrderByAggregateInput = {
    urole_id?: SortOrder
    arole_id?: SortOrder
    uid?: SortOrder
    status?: SortOrder
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use activityDefaultArgs instead
     */
    export type activityArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = activityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use appDefaultArgs instead
     */
    export type appArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = appDefaultArgs<ExtArgs>
    /**
     * @deprecated Use app_roleDefaultArgs instead
     */
    export type app_roleArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = app_roleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use groupDefaultArgs instead
     */
    export type groupArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = groupDefaultArgs<ExtArgs>
    /**
     * @deprecated Use photoDefaultArgs instead
     */
    export type photoArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = photoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use userDefaultArgs instead
     */
    export type userArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = userDefaultArgs<ExtArgs>
    /**
     * @deprecated Use user_roleDefaultArgs instead
     */
    export type user_roleArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = user_roleDefaultArgs<ExtArgs>

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