
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
} = require('./runtime/library')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.3.1
 * Query Engine version: 61e140623197a131c2a6189271ffee05a7aa9a59
 */
Prisma.prismaVersion = {
  client: "5.3.1",
  engine: "61e140623197a131c2a6189271ffee05a7aa9a59"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.ActivityScalarFieldEnum = {
  id: 'id',
  uid: 'uid',
  title: 'title',
  meta: 'meta',
  timestamp: 'timestamp'
};

exports.Prisma.AppScalarFieldEnum = {
  app_id: 'app_id',
  app_name: 'app_name',
  app_tag: 'app_tag',
  app_desc: 'app_desc',
  app_token: 'app_token',
  app_db: 'app_db',
  status: 'status'
};

exports.Prisma.App_roleScalarFieldEnum = {
  arole_id: 'arole_id',
  app_id: 'app_id',
  role_name: 'role_name',
  role_desc: 'role_desc',
  status: 'status'
};

exports.Prisma.GroupScalarFieldEnum = {
  group_id: 'group_id',
  group_name: 'group_name',
  group_desc: 'group_desc',
  status: 'status'
};

exports.Prisma.PhotoScalarFieldEnum = {
  photo_id: 'photo_id',
  group_id: 'group_id',
  uid: 'uid',
  tag: 'tag',
  path: 'path',
  status: 'status'
};

exports.Prisma.UserScalarFieldEnum = {
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

exports.Prisma.User_roleScalarFieldEnum = {
  urole_id: 'urole_id',
  arole_id: 'arole_id',
  uid: 'uid',
  status: 'status'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  activity: 'activity',
  app: 'app',
  app_role: 'app_role',
  group: 'group',
  photo: 'photo',
  user: 'user',
  user_role: 'user_role'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/dexitional/Documents/projects/FullStack/core_service/prisma/client/sso",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "5.3.1",
  "engineVersion": "61e140623197a131c2a6189271ffee05a7aa9a59",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "SSO_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL2NsaWVudC9zc28iCn0KCmRhdGFzb3VyY2UgZGIgewogIHByb3ZpZGVyID0gIm15c3FsIgogIHVybCAgICAgID0gZW52KCJTU09fVVJMIikKfQoKLy8vIFRoaXMgbW9kZWwgb3IgYXQgbGVhc3Qgb25lIG9mIGl0cyBmaWVsZHMgaGFzIGNvbW1lbnRzIGluIHRoZSBkYXRhYmFzZSwgYW5kIHJlcXVpcmVzIGFuIGFkZGl0aW9uYWwgc2V0dXAgZm9yIG1pZ3JhdGlvbnM6IFJlYWQgbW9yZTogaHR0cHM6Ly9wcmlzLmx5L2QvZGF0YWJhc2UtY29tbWVudHMKbW9kZWwgYWN0aXZpdHkgewogIGlkICAgICAgICBJbnQgICAgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkgQGRiLlVuc2lnbmVkSW50CiAgdWlkICAgICAgIEludD8KICB0aXRsZSAgICAgU3RyaW5nPyAgIEBkYi5WYXJDaGFyKDI1NSkKICBtZXRhICAgICAgU3RyaW5nPyAgIEBkYi5UZXh0CiAgdGltZXN0YW1wIERhdGVUaW1lPyBAZGVmYXVsdChub3coKSkgQGRiLlRpbWVzdGFtcCgwKQp9CgovLy8gVGhpcyBtb2RlbCBvciBhdCBsZWFzdCBvbmUgb2YgaXRzIGZpZWxkcyBoYXMgY29tbWVudHMgaW4gdGhlIGRhdGFiYXNlLCBhbmQgcmVxdWlyZXMgYW4gYWRkaXRpb25hbCBzZXR1cCBmb3IgbWlncmF0aW9uczogUmVhZCBtb3JlOiBodHRwczovL3ByaXMubHkvZC9kYXRhYmFzZS1jb21tZW50cwptb2RlbCBhcHAgewogIGFwcF9pZCAgICBJbnQgICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpCiAgYXBwX25hbWUgIFN0cmluZz8gQGRiLlZhckNoYXIoMzAwKQogIGFwcF90YWcgICBTdHJpbmc/IEBkYi5WYXJDaGFyKDUwKQogIGFwcF9kZXNjICBTdHJpbmc/IEBkYi5UZXh0CiAgYXBwX3Rva2VuIFN0cmluZz8gQGRiLlZhckNoYXIoMTAwKQogIGFwcF9kYiAgICBTdHJpbmc/IEBkYi5WYXJDaGFyKDUwKQogIHN0YXR1cyAgICBJbnQ/Cn0KCi8vLyBUaGlzIG1vZGVsIG9yIGF0IGxlYXN0IG9uZSBvZiBpdHMgZmllbGRzIGhhcyBjb21tZW50cyBpbiB0aGUgZGF0YWJhc2UsIGFuZCByZXF1aXJlcyBhbiBhZGRpdGlvbmFsIHNldHVwIGZvciBtaWdyYXRpb25zOiBSZWFkIG1vcmU6IGh0dHBzOi8vcHJpcy5seS9kL2RhdGFiYXNlLWNvbW1lbnRzCm1vZGVsIGFwcF9yb2xlIHsKICBhcm9sZV9pZCAgSW50ICAgICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQogIGFwcF9pZCAgICBJbnQ/CiAgcm9sZV9uYW1lIFN0cmluZz8gQGRiLlZhckNoYXIoMTUwKQogIHJvbGVfZGVzYyBTdHJpbmc/IEBkYi5UZXh0CiAgc3RhdHVzICAgIEludD8gICAgQGRlZmF1bHQoMSkKfQoKLy8vIFRoaXMgbW9kZWwgb3IgYXQgbGVhc3Qgb25lIG9mIGl0cyBmaWVsZHMgaGFzIGNvbW1lbnRzIGluIHRoZSBkYXRhYmFzZSwgYW5kIHJlcXVpcmVzIGFuIGFkZGl0aW9uYWwgc2V0dXAgZm9yIG1pZ3JhdGlvbnM6IFJlYWQgbW9yZTogaHR0cHM6Ly9wcmlzLmx5L2QvZGF0YWJhc2UtY29tbWVudHMKbW9kZWwgZ3JvdXAgewogIGdyb3VwX2lkICAgSW50ICAgICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQogIGdyb3VwX25hbWUgU3RyaW5nPyBAZGIuVmFyQ2hhcig1MCkKICBncm91cF9kZXNjIFN0cmluZz8gQGRiLlRleHQKICBzdGF0dXMgICAgIEludD8gICAgQGRlZmF1bHQoMCkKfQoKLy8vIFRoaXMgbW9kZWwgb3IgYXQgbGVhc3Qgb25lIG9mIGl0cyBmaWVsZHMgaGFzIGNvbW1lbnRzIGluIHRoZSBkYXRhYmFzZSwgYW5kIHJlcXVpcmVzIGFuIGFkZGl0aW9uYWwgc2V0dXAgZm9yIG1pZ3JhdGlvbnM6IFJlYWQgbW9yZTogaHR0cHM6Ly9wcmlzLmx5L2QvZGF0YWJhc2UtY29tbWVudHMKbW9kZWwgcGhvdG8gewogIHBob3RvX2lkIEludCAgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICBncm91cF9pZCBJbnQ/CiAgdWlkICAgICAgSW50PwogIHRhZyAgICAgIFN0cmluZz8gQGRiLlZhckNoYXIoMTUwKQogIHBhdGggICAgIFN0cmluZz8gQGRiLlZhckNoYXIoMzAwKQogIHN0YXR1cyAgIEludD8gICAgQGRlZmF1bHQoMSkKfQoKLy8vIFRoaXMgbW9kZWwgb3IgYXQgbGVhc3Qgb25lIG9mIGl0cyBmaWVsZHMgaGFzIGNvbW1lbnRzIGluIHRoZSBkYXRhYmFzZSwgYW5kIHJlcXVpcmVzIGFuIGFkZGl0aW9uYWwgc2V0dXAgZm9yIG1pZ3JhdGlvbnM6IFJlYWQgbW9yZTogaHR0cHM6Ly9wcmlzLmx5L2QvZGF0YWJhc2UtY29tbWVudHMKbW9kZWwgdXNlciB7CiAgdWlkICAgICAgICAgICBJbnQgICAgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkKICBncm91cF9pZCAgICAgIEludD8KICB0YWcgICAgICAgICAgIFN0cmluZz8gICBAdW5pcXVlKG1hcDogInRhZyIpIEBkYi5WYXJDaGFyKDEwMCkKICB1c2VybmFtZSAgICAgIFN0cmluZz8gICBAdW5pcXVlKG1hcDogInVzZXJuYW1lIikgQGRiLlZhckNoYXIoMjU1KQogIHBhc3N3b3JkICAgICAgU3RyaW5nPyAgIEBkYi5WYXJDaGFyKDUwKQogIGZsYWdfbG9ja2VkICAgSW50PyAgICAgIEBkZWZhdWx0KDApCiAgZmxhZ19kaXNhYmxlZCBJbnQ/ICAgICAgQGRlZmF1bHQoMCkKICBmbGFnX2FkICAgICAgIEludD8KICBmbGFnX2dzICAgICAgIEludD8KICBsb2dpbl9hdHRlbXB0IEludD8gICAgICBAZGVmYXVsdCgwKQogIGF0dGVtcHRfdGltZSAgRGF0ZVRpbWU/IEBkYi5UaW1lc3RhbXAoMCkKICBhY2Nlc3NfdG9rZW4gIFN0cmluZz8gICBAZGIuVmFyQ2hhcigxNTApCiAgYWNjZXNzX2V4cGlyZSBEYXRlVGltZT8gQGRiLkRhdGVUaW1lKDApCn0KCi8vLyBUaGlzIG1vZGVsIG9yIGF0IGxlYXN0IG9uZSBvZiBpdHMgZmllbGRzIGhhcyBjb21tZW50cyBpbiB0aGUgZGF0YWJhc2UsIGFuZCByZXF1aXJlcyBhbiBhZGRpdGlvbmFsIHNldHVwIGZvciBtaWdyYXRpb25zOiBSZWFkIG1vcmU6IGh0dHBzOi8vcHJpcy5seS9kL2RhdGFiYXNlLWNvbW1lbnRzCm1vZGVsIHVzZXJfcm9sZSB7CiAgdXJvbGVfaWQgSW50ICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQogIGFyb2xlX2lkIEludD8KICB1aWQgICAgICBJbnQ/CiAgc3RhdHVzICAgSW50PyBAZGVmYXVsdCgxKQp9Cg==",
  "inlineSchemaHash": "303824690d50e8175607f0e29ffa1d7836ce27679731fbb2192b5b3d3998c689",
  "noEngine": false
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "prisma/client/sso",
    "client/sso",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"activity\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"meta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"app\":{\"dbName\":null,\"fields\":[{\"name\":\"app_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"app_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"app_tag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"app_desc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"app_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"app_db\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"app_role\":{\"dbName\":null,\"fields\":[{\"name\":\"arole_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"app_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role_desc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"group\":{\"dbName\":null,\"fields\":[{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_desc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"photo\":{\"dbName\":null,\"fields\":[{\"name\":\"photo_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"path\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"user\":{\"dbName\":null,\"fields\":[{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"flag_locked\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"flag_disabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"flag_ad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"flag_gs\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"login_attempt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attempt_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"access_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"access_expire\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"user_role\":{\"dbName\":null,\"fields\":[{\"name\":\"urole_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"arole_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)



const { warnEnvConflicts } = require('./runtime/library')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "prisma/client/sso/libquery_engine-darwin-arm64.dylib.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "prisma/client/sso/schema.prisma")
