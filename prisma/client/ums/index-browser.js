
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.13.0
 * Query Engine version: b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b
 */
Prisma.prismaVersion = {
  client: "5.13.0",
  engine: "b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.LogScalarFieldEnum = {
  id: 'id',
  action: 'action',
  user: 'user',
  student: 'student',
  meta: 'meta',
  createdAt: 'createdAt'
};

exports.Prisma.CountryScalarFieldEnum = {
  id: 'id',
  code: 'code',
  shortName: 'shortName',
  longName: 'longName',
  nationality: 'nationality',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  tag: 'tag',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TitleScalarFieldEnum = {
  id: 'id',
  tag: 'tag',
  label: 'label',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RelationScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MaritalScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReligionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DisabilityScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SchemeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  gradeMeta: 'gradeMeta',
  classMeta: 'classMeta',
  passMark: 'passMark',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UnitScalarFieldEnum = {
  id: 'id',
  code: 'code',
  title: 'title',
  type: 'type',
  levelNum: 'levelNum',
  level1Id: 'level1Id',
  level2Id: 'level2Id',
  location: 'location',
  headStaffNo: 'headStaffNo',
  subheadStaffNo: 'subheadStaffNo',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ModeScalarFieldEnum = {
  id: 'id',
  code: 'code',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  title: 'title',
  creditHour: 'creditHour',
  theoryHour: 'theoryHour',
  practicalHour: 'practicalHour',
  remark: 'remark',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MajorScalarFieldEnum = {
  id: 'id',
  programId: 'programId',
  shortName: 'shortName',
  longName: 'longName',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProgramScalarFieldEnum = {
  id: 'id',
  schemeId: 'schemeId',
  unitId: 'unitId',
  modeId: 'modeId',
  code: 'code',
  prefix: 'prefix',
  stype: 'stype',
  shortName: 'shortName',
  longName: 'longName',
  category: 'category',
  semesterTotal: 'semesterTotal',
  creditTotal: 'creditTotal',
  shallAdmit: 'shallAdmit',
  hasMajor: 'hasMajor',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudentScalarFieldEnum = {
  id: 'id',
  indexno: 'indexno',
  titleId: 'titleId',
  fname: 'fname',
  mname: 'mname',
  lname: 'lname',
  gender: 'gender',
  dob: 'dob',
  maritalId: 'maritalId',
  email: 'email',
  phone: 'phone',
  hometown: 'hometown',
  address: 'address',
  guardianName: 'guardianName',
  guardianPhone: 'guardianPhone',
  ghcardNo: 'ghcardNo',
  nationalityId: 'nationalityId',
  countryId: 'countryId',
  regionId: 'regionId',
  religionId: 'religionId',
  disabilityId: 'disabilityId',
  programId: 'programId',
  majorId: 'majorId',
  progCount: 'progCount',
  semesterNum: 'semesterNum',
  semesterDone: 'semesterDone',
  creditDone: 'creditDone',
  entrySemesterNum: 'entrySemesterNum',
  entryGroup: 'entryGroup',
  entryDate: 'entryDate',
  exitDate: 'exitDate',
  residentialStatus: 'residentialStatus',
  studyMode: 'studyMode',
  deferStatus: 'deferStatus',
  completeStatus: 'completeStatus',
  completeType: 'completeType',
  graduateStatus: 'graduateStatus',
  graduateId: 'graduateId',
  graduateCgpa: 'graduateCgpa',
  graduateCertNo: 'graduateCertNo',
  instituteEmail: 'instituteEmail',
  instituteAffliate: 'instituteAffliate',
  flagPardon: 'flagPardon',
  accountNet: 'accountNet'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  tag: 'tag',
  title: 'title',
  year: 'year',
  semester: 'semester',
  registerStart: 'registerStart',
  registerEnd: 'registerEnd',
  registerEndLate: 'registerEndLate',
  registerPause: 'registerPause',
  orientStart: 'orientStart',
  orientEnd: 'orientEnd',
  lectureStart: 'lectureStart',
  lectureEnd: 'lectureEnd',
  examStart: 'examStart',
  examEnd: 'examEnd',
  entryStart: 'entryStart',
  entryEnd: 'entryEnd',
  admissionPrefix: 'admissionPrefix',
  assignLateSheet: 'assignLateSheet',
  progressStudent: 'progressStudent',
  stageSheet: 'stageSheet',
  default: 'default',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StructureScalarFieldEnum = {
  id: 'id',
  unitId: 'unitId',
  programId: 'programId',
  majorId: 'majorId',
  courseId: 'courseId',
  semesterNum: 'semesterNum',
  type: 'type',
  lock: 'lock',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StructmetaScalarFieldEnum = {
  id: 'id',
  programId: 'programId',
  majorId: 'majorId',
  semesterNum: 'semesterNum',
  minCredit: 'minCredit',
  maxCredit: 'maxCredit',
  maxElectiveNum: 'maxElectiveNum',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityRegisterScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  indexno: 'indexno',
  courses: 'courses',
  credits: 'credits',
  dump: 'dump',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityProgressScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  indexno: 'indexno',
  semesterNum: 'semesterNum',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityProgchangeScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  studentId: 'studentId',
  oldIndexno: 'oldIndexno',
  newIndexno: 'newIndexno',
  oldProgramId: 'oldProgramId',
  newProgramId: 'newProgramId',
  newSemesterNum: 'newSemesterNum',
  reason: 'reason',
  approved: 'approved',
  approvedBy: 'approvedBy',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityDeferScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  studentId: 'studentId',
  indexno: 'indexno',
  semesterNum: 'semesterNum',
  reason: 'reason',
  durationInYears: 'durationInYears',
  status: 'status',
  statusBy: 'statusBy',
  start: 'start',
  end: 'end',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityBacklogScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  schemeId: 'schemeId',
  title: 'title',
  type: 'type',
  meta: 'meta',
  status: 'status',
  approvedBy: 'approvedBy',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  schemeId: 'schemeId',
  courseId: 'courseId',
  indexno: 'indexno',
  credit: 'credit',
  semesterNum: 'semesterNum',
  classScore: 'classScore',
  examScore: 'examScore',
  totalScore: 'totalScore',
  type: 'type',
  scoreA: 'scoreA',
  scoreB: 'scoreB',
  scoreC: 'scoreC',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InformerScalarFieldEnum = {
  id: 'id',
  reference: 'reference',
  title: 'title',
  content: 'content',
  smsContent: 'smsContent',
  receiver: 'receiver',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LetterScalarFieldEnum = {
  id: 'id',
  tag: 'tag',
  title: 'title',
  signatory: 'signatory',
  signature: 'signature',
  template: 'template',
  cc: 'cc',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SheetScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  courseId: 'courseId',
  unitId: 'unitId',
  programId: 'programId',
  majorId: 'majorId',
  assignStaffId: 'assignStaffId',
  assessorId: 'assessorId',
  certifierId: 'certifierId',
  semesterNum: 'semesterNum',
  studyMode: 'studyMode',
  studentCount: 'studentCount',
  completeRatio: 'completeRatio',
  assessed: 'assessed',
  certified: 'certified',
  finalized: 'finalized',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TranswiftScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  title: 'title',
  type: 'type',
  reference: 'reference',
  applicant: 'applicant',
  receipient: 'receipient',
  quantity: 'quantity',
  mode: 'mode',
  version: 'version',
  status: 'status',
  issuerId: 'issuerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GraduationScalarFieldEnum = {
  id: 'id',
  title: 'title',
  start: 'start',
  end: 'end',
  period: 'period',
  graduants: 'graduants',
  default: 'default',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ResessionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  start: 'start',
  end: 'end',
  period: 'period',
  default: 'default',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ResitScalarFieldEnum = {
  id: 'id',
  resitSessionId: 'resitSessionId',
  registerSessionId: 'registerSessionId',
  trailSessionId: 'trailSessionId',
  schemeId: 'schemeId',
  courseId: 'courseId',
  indexno: 'indexno',
  semesterNum: 'semesterNum',
  totalScore: 'totalScore',
  approveScore: 'approveScore',
  taken: 'taken',
  paid: 'paid',
  actionType: 'actionType',
  actionMeta: 'actionMeta',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BankaccScalarFieldEnum = {
  id: 'id',
  unitId: 'unitId',
  tag: 'tag',
  accountName: 'accountName',
  accountDescription: 'accountDescription',
  bankName: 'bankName',
  bankAccount: 'bankAccount',
  bankBranch: 'bankBranch',
  bankContact: 'bankContact',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BillScalarFieldEnum = {
  id: 'id',
  sessionId: 'sessionId',
  bankaccId: 'bankaccId',
  programId: 'programId',
  includeStudentIds: 'includeStudentIds',
  excludeStudentIds: 'excludeStudentIds',
  mainGroupCode: 'mainGroupCode',
  discountGroupCode: 'discountGroupCode',
  narrative: 'narrative',
  type: 'type',
  residentialStatus: 'residentialStatus',
  currency: 'currency',
  amount: 'amount',
  discount: 'discount',
  quota: 'quota',
  posted: 'posted',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityBillScalarFieldEnum = {
  id: 'id',
  billId: 'billId',
  userId: 'userId',
  amount: 'amount',
  discount: 'discount',
  receivers: 'receivers',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChargeScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  title: 'title',
  type: 'type',
  currency: 'currency',
  amount: 'amount',
  posted: 'posted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CollectorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  address: 'address',
  phone: 'phone',
  technicianName: 'technicianName',
  technicianPhone: 'technicianPhone',
  apiToken: 'apiToken',
  apiEnabled: 'apiEnabled',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TranstypeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  visibility: 'visibility',
  amountInGhc: 'amountInGhc',
  amountInUsd: 'amountInUsd',
  remark: 'remark',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  collectorId: 'collectorId',
  transtypeId: 'transtypeId',
  bankaccId: 'bankaccId',
  studentId: 'studentId',
  reference: 'reference',
  transtag: 'transtag',
  payType: 'payType',
  feeType: 'feeType',
  currency: 'currency',
  amount: 'amount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudentAccountScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  transactId: 'transactId',
  sessionId: 'sessionId',
  chargeId: 'chargeId',
  billId: 'billId',
  type: 'type',
  narrative: 'narrative',
  currency: 'currency',
  amount: 'amount',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityFinanceApiScalarFieldEnum = {
  id: 'id',
  ip: 'ip',
  title: 'title',
  meta: 'meta',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityFinanceVoucherScalarFieldEnum = {
  id: 'id',
  transactId: 'transactId',
  admissionId: 'admissionId',
  serial: 'serial',
  pin: 'pin',
  buyerName: 'buyerName',
  buyerPhone: 'buyerPhone',
  smsCode: 'smsCode',
  generated: 'generated',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityApplicantScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  meta: 'meta',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VendorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  email: 'email',
  address: 'address',
  technicianName: 'technicianName',
  technicianPhone: 'technicianPhone',
  technicianEmail: 'technicianEmail',
  verified: 'verified',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExamCategoryScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CertCategoryScalarFieldEnum = {
  id: 'id',
  instituteCategoryId: 'instituteCategoryId',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InstituteCategoryScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GradeWeightScalarFieldEnum = {
  id: 'id',
  certCategoryId: 'certCategoryId',
  title: 'title',
  weight: 'weight',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AwardClassScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DocumentCategoryScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubjectScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AmsPriceScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  title: 'title',
  sellType: 'sellType',
  currency: 'currency',
  amount: 'amount',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AmsFormScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  title: 'title',
  meta: 'meta',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StageScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  formId: 'formId',
  title: 'title',
  sellType: 'sellType',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ApplyTypeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  stages: 'stages',
  letterCondition: 'letterCondition',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AdmissionLetterScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  title: 'title',
  signatory: 'signatory',
  signature: 'signature',
  template: 'template',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VoucherScalarFieldEnum = {
  serial: 'serial',
  pin: 'pin',
  admissionId: 'admissionId',
  vendorId: 'vendorId',
  categoryId: 'categoryId',
  sellType: 'sellType',
  applicantName: 'applicantName',
  applicantPhone: 'applicantPhone',
  soldAt: 'soldAt',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AdmissionScalarFieldEnum = {
  id: 'id',
  pgletterId: 'pgletterId',
  ugletterId: 'ugletterId',
  dpletterId: 'dpletterId',
  cpletterId: 'cpletterId',
  sessionId: 'sessionId',
  title: 'title',
  examStart: 'examStart',
  examEnd: 'examEnd',
  applyStart: 'applyStart',
  applyEnd: 'applyEnd',
  applyPause: 'applyPause',
  showAdmitted: 'showAdmitted',
  voucherIndex: 'voucherIndex',
  default: 'default',
  status: 'status',
  admittedAt: 'admittedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortedApplicantScalarFieldEnum = {
  serial: 'serial',
  admissionId: 'admissionId',
  stageId: 'stageId',
  applyTypeId: 'applyTypeId',
  categoryId: 'categoryId',
  sellType: 'sellType',
  choice1Id: 'choice1Id',
  choice2Id: 'choice2Id',
  profileId: 'profileId',
  gradeValue: 'gradeValue',
  classValue: 'classValue',
  admitted: 'admitted',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FresherScalarFieldEnum = {
  serial: 'serial',
  admissionId: 'admissionId',
  sessionId: 'sessionId',
  billId: 'billId',
  programId: 'programId',
  majorId: 'majorId',
  sessionMode: 'sessionMode',
  categoryId: 'categoryId',
  sellType: 'sellType',
  semesterNum: 'semesterNum',
  username: 'username',
  password: 'password',
  accept: 'accept',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ApplicantScalarFieldEnum = {
  serial: 'serial',
  admissionId: 'admissionId',
  stageId: 'stageId',
  applyTypeId: 'applyTypeId',
  choiceId: 'choiceId',
  profileId: 'profileId',
  photo: 'photo',
  meta: 'meta',
  gradeValue: 'gradeValue',
  classValue: 'classValue',
  sorted: 'sorted',
  submitted: 'submitted',
  submittedAt: 'submittedAt',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StepProfileScalarFieldEnum = {
  serial: 'serial',
  titleId: 'titleId',
  fname: 'fname',
  mname: 'mname',
  lname: 'lname',
  gender: 'gender',
  dob: 'dob',
  maritalId: 'maritalId',
  disabilities: 'disabilities',
  phone: 'phone',
  email: 'email',
  hometown: 'hometown',
  residentAddress: 'residentAddress',
  postalAddress: 'postalAddress',
  occupation: 'occupation',
  workPlace: 'workPlace',
  bondInstitute: 'bondInstitute',
  residentialStatus: 'residentialStatus',
  studyMode: 'studyMode',
  nationalityId: 'nationalityId',
  countryId: 'countryId',
  regionId: 'regionId',
  religionId: 'religionId',
  disabilityId: 'disabilityId',
  bonded: 'bonded',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StepGuardianScalarFieldEnum = {
  serial: 'serial',
  relationId: 'relationId',
  titleId: 'titleId',
  fname: 'fname',
  mname: 'mname',
  lname: 'lname',
  phone: 'phone',
  email: 'email',
  address: 'address',
  occupation: 'occupation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StepEducationScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  instituteCategoryId: 'instituteCategoryId',
  certCategoryId: 'certCategoryId',
  instituteName: 'instituteName',
  certName: 'certName',
  gradeValue: 'gradeValue',
  classValue: 'classValue',
  startMonth: 'startMonth',
  startYear: 'startYear',
  endMonth: 'endMonth',
  endYear: 'endYear',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StepResultScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  certCategoryId: 'certCategoryId',
  indexNumber: 'indexNumber',
  sitting: 'sitting',
  startYear: 'startYear',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StepGradeScalarFieldEnum = {
  id: 'id',
  resultId: 'resultId',
  subjectId: 'subjectId',
  gradeWeightId: 'gradeWeightId',
  serial: 'serial',
  gradeValue: 'gradeValue',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StepEmploymentScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  employerName: 'employerName',
  employerAddress: 'employerAddress',
  jobTitle: 'jobTitle',
  phone: 'phone',
  email: 'email',
  address: 'address',
  startMonth: 'startMonth',
  startYear: 'startYear',
  endMonth: 'endMonth',
  endYear: 'endYear',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StepDocumentScalarFieldEnum = {
  id: 'id',
  documentCategoryId: 'documentCategoryId',
  serial: 'serial',
  base64: 'base64',
  mime: 'mime',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StepChoiceScalarFieldEnum = {
  id: 'id',
  programId: 'programId',
  majorId: 'majorId',
  serial: 'serial',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StepRefereeScalarFieldEnum = {
  id: 'id',
  serial: 'serial',
  titleId: 'titleId',
  fname: 'fname',
  mname: 'mname',
  lname: 'lname',
  phone: 'phone',
  email: 'email',
  address: 'address',
  occupation: 'occupation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ElectionScalarFieldEnum = {
  id: 'id',
  groupId: 'groupId',
  type: 'type',
  title: 'title',
  tag: 'tag',
  logo: 'logo',
  admins: 'admins',
  voterCount: 'voterCount',
  voterList: 'voterList',
  voterData: 'voterData',
  allowMonitor: 'allowMonitor',
  allowEcMonitor: 'allowEcMonitor',
  allowVip: 'allowVip',
  allowEcVip: 'allowEcVip',
  allowResult: 'allowResult',
  allowEcResult: 'allowEcResult',
  allowMask: 'allowMask',
  autoStop: 'autoStop',
  startAt: 'startAt',
  endAt: 'endAt',
  action: 'action',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ElectorScalarFieldEnum = {
  id: 'id',
  electionId: 'electionId',
  tag: 'tag',
  name: 'name',
  descriptor: 'descriptor',
  gender: 'gender',
  voteTime: 'voteTime',
  voteSum: 'voteSum',
  voteHash: 'voteHash',
  voteIp: 'voteIp',
  voteStatus: 'voteStatus',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PortfolioScalarFieldEnum = {
  id: 'id',
  electionId: 'electionId',
  title: 'title',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CandidateScalarFieldEnum = {
  id: 'id',
  portfolioId: 'portfolioId',
  tag: 'tag',
  name: 'name',
  teaser: 'teaser',
  orderNo: 'orderNo',
  photo: 'photo',
  votes: 'votes',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AttackScalarFieldEnum = {
  id: 'id',
  electionId: 'electionId',
  tag: 'tag',
  location: 'location',
  ip: 'ip',
  meta: 'meta',
  createdAt: 'createdAt'
};

exports.Prisma.AppScalarFieldEnum = {
  id: 'id',
  title: 'title',
  tag: 'tag',
  description: 'description',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AppRoleScalarFieldEnum = {
  id: 'id',
  appId: 'appId',
  title: 'title',
  description: 'description',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GroupScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  groupId: 'groupId',
  tag: 'tag',
  username: 'username',
  password: 'password',
  unlockPin: 'unlockPin',
  locked: 'locked',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserRoleScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  appRoleId: 'appRoleId',
  roleMeta: 'roleMeta',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProviderScalarFieldEnum = {
  providerId: 'providerId',
  userId: 'userId',
  accountType: 'accountType',
  accountId: 'accountId',
  accountSecret: 'accountSecret',
  status: 'status'
};

exports.Prisma.SupportScalarFieldEnum = {
  supportNo: 'supportNo',
  fname: 'fname',
  mname: 'mname',
  lname: 'lname',
  gender: 'gender',
  phone: 'phone',
  email: 'email',
  address: 'address',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JobScalarFieldEnum = {
  id: 'id',
  title: 'title',
  type: 'type',
  yearsToNextRank: 'yearsToNextRank',
  allowNextRank: 'allowNextRank',
  staffCategory: 'staffCategory',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PromotionScalarFieldEnum = {
  id: 'id',
  staffNo: 'staffNo',
  jobId: 'jobId',
  scaleId: 'scaleId',
  staffCategory: 'staffCategory',
  letterAt: 'letterAt',
  startAt: 'startAt',
  confirmAt: 'confirmAt',
  probation: 'probation',
  type: 'type',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PostinfoScalarFieldEnum = {
  id: 'id',
  unitId: 'unitId',
  title: 'title',
  description: 'description',
  duties: 'duties',
  allowances: 'allowances',
  durationInYears: 'durationInYears',
  renewalInYears: 'renewalInYears',
  staffCategory: 'staffCategory',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PositionScalarFieldEnum = {
  id: 'id',
  staffNo: 'staffNo',
  postinfoId: 'postinfoId',
  scaleId: 'scaleId',
  staffCategory: 'staffCategory',
  letterAt: 'letterAt',
  startAt: 'startAt',
  endAt: 'endAt',
  duration: 'duration',
  type: 'type',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TransferScalarFieldEnum = {
  id: 'id',
  staffNo: 'staffNo',
  fromUnitId: 'fromUnitId',
  toUnitId: 'toUnitId',
  reason: 'reason',
  letterAt: 'letterAt',
  startAt: 'startAt',
  status: 'status',
  createdBy: 'createdBy',
  approvedBy: 'approvedBy',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ScaleScalarFieldEnum = {
  id: 'id',
  grade: 'grade',
  gradeNum: 'gradeNum',
  notch: 'notch',
  notchAmount: 'notchAmount',
  level: 'level',
  staffCategory: 'staffCategory',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StaffScalarFieldEnum = {
  staffNo: 'staffNo',
  titleId: 'titleId',
  fname: 'fname',
  mname: 'mname',
  lname: 'lname',
  gender: 'gender',
  dob: 'dob',
  maritalId: 'maritalId',
  disabilities: 'disabilities',
  phone: 'phone',
  email: 'email',
  hometown: 'hometown',
  birthplace: 'birthplace',
  district: 'district',
  ssnitNo: 'ssnitNo',
  ghcardNo: 'ghcardNo',
  residentAddress: 'residentAddress',
  occupation: 'occupation',
  qualification: 'qualification',
  instituteEmail: 'instituteEmail',
  countryId: 'countryId',
  regionId: 'regionId',
  religionId: 'religionId',
  unitId: 'unitId',
  jobId: 'jobId',
  jobMode: 'jobMode',
  promotionId: 'promotionId',
  positionId: 'positionId',
  firstofferId: 'firstofferId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RelativeScalarFieldEnum = {
  id: 'id',
  relationId: 'relationId',
  titleId: 'titleId',
  code: 'code',
  fname: 'fname',
  mname: 'mname',
  lname: 'lname',
  gender: 'gender',
  dob: 'dob',
  phone: 'phone',
  address: 'address',
  hometown: 'hometown',
  isKin: 'isKin',
  isAlive: 'isAlive',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.unitType = exports.$Enums.unitType = {
  ACADEMIC: 'ACADEMIC',
  NON_ACADEMIC: 'NON_ACADEMIC'
};

exports.courseRemark = exports.$Enums.courseRemark = {
  FADED: 'FADED',
  ACTIVE: 'ACTIVE'
};

exports.programCategory = exports.$Enums.programCategory = {
  CP: 'CP',
  DP: 'DP',
  UG: 'UG',
  PG: 'PG'
};

exports.entryGroup = exports.$Enums.entryGroup = {
  GH: 'GH',
  INT: 'INT'
};

exports.residentialStatus = exports.$Enums.residentialStatus = {
  RESIDENTIAL: 'RESIDENTIAL',
  NON_RESIDENTIAL: 'NON_RESIDENTIAL'
};

exports.studyMode = exports.$Enums.studyMode = {
  M: 'M',
  W: 'W',
  E: 'E',
  A: 'A',
  f: 'f'
};

exports.completeType = exports.$Enums.completeType = {
  GRADUATION: 'GRADUATION',
  RASTICATED: 'RASTICATED',
  FORFEITED: 'FORFEITED',
  DEAD: 'DEAD',
  DISMISSED: 'DISMISSED'
};

exports.semesterNumbers = exports.$Enums.semesterNumbers = {
  SEM1: 'SEM1',
  SEM2: 'SEM2'
};

exports.courseType = exports.$Enums.courseType = {
  C: 'C',
  E: 'E',
  O: 'O'
};

exports.deferStatus = exports.$Enums.deferStatus = {
  PENDED: 'PENDED',
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  RESUMED: 'RESUMED'
};

exports.backlogType = exports.$Enums.backlogType = {
  REGISTRATION: 'REGISTRATION',
  ASSESSMENT: 'ASSESSMENT',
  DELETION: 'DELETION'
};

exports.scoreType = exports.$Enums.scoreType = {
  N: 'N',
  R: 'R'
};

exports.receiver = exports.$Enums.receiver = {
  APPLICANT: 'APPLICANT',
  FRESHER: 'FRESHER',
  STUDENT: 'STUDENT',
  UNDERGRAD: 'UNDERGRAD',
  POSTGRAD: 'POSTGRAD',
  ALUMNI: 'ALUMNI',
  STAFF: 'STAFF',
  HOD: 'HOD',
  DEAN: 'DEAN',
  ASSESSOR: 'ASSESSOR',
  DEBTOR: 'DEBTOR'
};

exports.serviceType = exports.$Enums.serviceType = {
  ATTESTATION: 'ATTESTATION',
  PROFICIENCY: 'PROFICIENCY',
  TRANSCRIPT: 'TRANSCRIPT',
  INTRODUCTORY: 'INTRODUCTORY'
};

exports.pickMode = exports.$Enums.pickMode = {
  PICKUP: 'PICKUP',
  INLAND: 'INLAND',
  FOREIGN: 'FOREIGN'
};

exports.transwiftType = exports.$Enums.transwiftType = {
  SOFTCOPY: 'SOFTCOPY',
  HARDCOPY: 'HARDCOPY'
};

exports.transwiftStatus = exports.$Enums.transwiftStatus = {
  PENDED: 'PENDED',
  PRINTED: 'PRINTED',
  COMPLETED: 'COMPLETED'
};

exports.actionType = exports.$Enums.actionType = {
  APPEND: 'APPEND',
  REPLACE: 'REPLACE'
};

exports.billGroup = exports.$Enums.billGroup = {
  GH: 'GH',
  INT: 'INT'
};

exports.currency = exports.$Enums.currency = {
  GHC: 'GHC',
  USD: 'USD'
};

exports.chargeGroup = exports.$Enums.chargeGroup = {
  FINE: 'FINE',
  FEES: 'FEES',
  GRADUATION: 'GRADUATION',
  RESIT: 'RESIT'
};

exports.visibility = exports.$Enums.visibility = {
  PUBLIC: 'PUBLIC',
  LOCAL: 'LOCAL'
};

exports.payType = exports.$Enums.payType = {
  BANK: 'BANK',
  MOMO: 'MOMO'
};

exports.feeType = exports.$Enums.feeType = {
  NORMAL: 'NORMAL',
  SCHOLARSHIP: 'SCHOLARSHIP'
};

exports.transactType = exports.$Enums.transactType = {
  CHARGE: 'CHARGE',
  BILL: 'BILL',
  PAYMENT: 'PAYMENT'
};

exports.sessionMode = exports.$Enums.sessionMode = {
  M: 'M',
  W: 'W',
  E: 'E'
};

exports.EvsActionType = exports.$Enums.EvsActionType = {
  STAGED: 'STAGED',
  STARTED: 'STARTED',
  ENDED: 'ENDED'
};

exports.AccountType = exports.$Enums.AccountType = {
  LINKEDIN: 'LINKEDIN',
  GOOGLE: 'GOOGLE',
  CREDENTIAL: 'CREDENTIAL',
  PIN: 'PIN'
};

exports.jobType = exports.$Enums.jobType = {
  ACADEMIC: 'ACADEMIC',
  NON_ACADEMIC: 'NON_ACADEMIC'
};

exports.staffCategory = exports.$Enums.staffCategory = {
  JS: 'JS',
  SS: 'SS',
  SM: 'SM'
};

exports.promoType = exports.$Enums.promoType = {
  APPOINTMENT: 'APPOINTMENT',
  PROMOTION: 'PROMOTION',
  UPGRADE: 'UPGRADE'
};

exports.positionType = exports.$Enums.positionType = {
  APPOINTMENT: 'APPOINTMENT',
  RENEWAL: 'RENEWAL'
};

exports.scaleLevel = exports.$Enums.scaleLevel = {
  L: 'L',
  H: 'H',
  AH: 'AH'
};

exports.Prisma.ModelName = {
  log: 'log',
  country: 'country',
  region: 'region',
  title: 'title',
  relation: 'relation',
  marital: 'marital',
  religion: 'religion',
  disability: 'disability',
  scheme: 'scheme',
  unit: 'unit',
  mode: 'mode',
  course: 'course',
  major: 'major',
  program: 'program',
  student: 'student',
  session: 'session',
  structure: 'structure',
  structmeta: 'structmeta',
  activityRegister: 'activityRegister',
  activityProgress: 'activityProgress',
  activityProgchange: 'activityProgchange',
  activityDefer: 'activityDefer',
  activityBacklog: 'activityBacklog',
  assessment: 'assessment',
  informer: 'informer',
  letter: 'letter',
  sheet: 'sheet',
  transwift: 'transwift',
  graduation: 'graduation',
  resession: 'resession',
  resit: 'resit',
  bankacc: 'bankacc',
  bill: 'bill',
  activityBill: 'activityBill',
  charge: 'charge',
  collector: 'collector',
  transtype: 'transtype',
  transaction: 'transaction',
  studentAccount: 'studentAccount',
  activityFinanceApi: 'activityFinanceApi',
  activityFinanceVoucher: 'activityFinanceVoucher',
  activityApplicant: 'activityApplicant',
  vendor: 'vendor',
  category: 'category',
  examCategory: 'examCategory',
  certCategory: 'certCategory',
  instituteCategory: 'instituteCategory',
  gradeWeight: 'gradeWeight',
  awardClass: 'awardClass',
  documentCategory: 'documentCategory',
  subject: 'subject',
  amsPrice: 'amsPrice',
  amsForm: 'amsForm',
  stage: 'stage',
  applyType: 'applyType',
  admissionLetter: 'admissionLetter',
  voucher: 'voucher',
  admission: 'admission',
  sortedApplicant: 'sortedApplicant',
  fresher: 'fresher',
  applicant: 'applicant',
  stepProfile: 'stepProfile',
  stepGuardian: 'stepGuardian',
  stepEducation: 'stepEducation',
  stepResult: 'stepResult',
  stepGrade: 'stepGrade',
  stepEmployment: 'stepEmployment',
  stepDocument: 'stepDocument',
  stepChoice: 'stepChoice',
  stepReferee: 'stepReferee',
  election: 'election',
  elector: 'elector',
  portfolio: 'portfolio',
  candidate: 'candidate',
  attack: 'attack',
  app: 'app',
  appRole: 'appRole',
  group: 'group',
  user: 'user',
  userRole: 'userRole',
  provider: 'provider',
  support: 'support',
  job: 'job',
  promotion: 'promotion',
  postinfo: 'postinfo',
  position: 'position',
  transfer: 'transfer',
  scale: 'scale',
  staff: 'staff',
  relative: 'relative'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
