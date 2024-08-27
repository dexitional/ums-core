-- CreateTable
CREATE TABLE `country` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NULL,
    `shortName` VARCHAR(10) NULL,
    `longName` VARCHAR(255) NOT NULL,
    `nationality` VARCHAR(300) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `title` (
    `id` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(50) NOT NULL,
    `label` VARCHAR(50) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relation` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marital` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `religion` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disability` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_scheme` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `gradeMeta` JSON NOT NULL,
    `classMeta` JSON NOT NULL,
    `passMark` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `type` ENUM('ACADEMIC', 'NON_ACADEMIC') NOT NULL,
    `levelNum` INTEGER NOT NULL,
    `level1Id` VARCHAR(191) NULL,
    `level2Id` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `headStaffNo` VARCHAR(191) NULL,
    `subheadStaffNo` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mode` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_course` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(450) NOT NULL,
    `creditHour` INTEGER NOT NULL,
    `theoryHour` INTEGER NOT NULL,
    `practicalHour` INTEGER NOT NULL,
    `remark` ENUM('FADED', 'ACTIVE') NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_major` (
    `id` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(255) NULL,
    `longName` VARCHAR(355) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_program` (
    `id` VARCHAR(191) NOT NULL,
    `schemeId` VARCHAR(191) NULL,
    `unitId` VARCHAR(191) NULL,
    `modeId` VARCHAR(191) NULL,
    `code` VARCHAR(50) NOT NULL,
    `prefix` VARCHAR(50) NULL,
    `stype` INTEGER NULL,
    `shortName` VARCHAR(255) NOT NULL,
    `longName` VARCHAR(450) NOT NULL,
    `category` ENUM('CP', 'DP', 'UG', 'PG') NOT NULL,
    `semesterTotal` INTEGER NULL,
    `creditTotal` INTEGER NULL,
    `shallAdmit` BOOLEAN NOT NULL DEFAULT false,
    `hasMajor` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_student` (
    `id` VARCHAR(191) NOT NULL,
    `indexno` VARCHAR(50) NULL,
    `titleId` VARCHAR(191) NULL,
    `fname` VARCHAR(255) NOT NULL,
    `mname` VARCHAR(350) NULL,
    `lname` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(20) NULL,
    `dob` DATETIME(3) NULL,
    `maritalId` VARCHAR(191) NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `hometown` VARCHAR(255) NULL,
    `address` VARCHAR(350) NULL,
    `guardianName` VARCHAR(350) NULL,
    `guardianPhone` VARCHAR(15) NULL,
    `ghcardNo` VARCHAR(255) NULL,
    `nationalityId` VARCHAR(191) NULL,
    `countryId` VARCHAR(191) NULL,
    `regionId` VARCHAR(191) NULL,
    `religionId` VARCHAR(191) NULL,
    `disabilityId` VARCHAR(191) NULL,
    `programId` VARCHAR(191) NULL,
    `majorId` VARCHAR(191) NULL,
    `progCount` INTEGER NULL,
    `semesterNum` INTEGER NOT NULL,
    `semesterDone` INTEGER NULL,
    `creditDone` INTEGER NULL,
    `entrySemesterNum` INTEGER NULL,
    `entryGroup` ENUM('GH', 'INT') NULL DEFAULT 'GH',
    `entryDate` DATETIME NULL,
    `exitDate` DATETIME NULL,
    `residentialStatus` ENUM('RESIDENTIAL', 'NON_RESIDENTIAL') NULL,
    `studyMode` ENUM('M', 'W', 'E') NULL,
    `deferStatus` BOOLEAN NOT NULL DEFAULT false,
    `completeStatus` BOOLEAN NOT NULL DEFAULT false,
    `completeType` ENUM('GRADUATION', 'RASTICATED', 'FORFEITED', 'DEAD', 'DISMISSED') NULL,
    `graduateStatus` BOOLEAN NOT NULL DEFAULT false,
    `graduateId` VARCHAR(191) NULL,
    `graduateCgpa` VARCHAR(191) NULL,
    `graduateCertNo` VARCHAR(191) NULL,
    `instituteEmail` VARCHAR(350) NULL,
    `instituteAffliate` VARCHAR(350) NULL,
    `flagPardon` BOOLEAN NOT NULL DEFAULT false,
    `accountNet` FLOAT NOT NULL DEFAULT 0,

    UNIQUE INDEX `ais_student_id_key`(`id`),
    UNIQUE INDEX `ais_student_indexno_key`(`indexno`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_session` (
    `id` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(50) NULL DEFAULT 'main',
    `title` VARCHAR(255) NOT NULL,
    `year` INTEGER NULL,
    `semester` ENUM('1', '2') NOT NULL,
    `registerStart` DATETIME(3) NULL,
    `registerEnd` DATETIME(3) NULL,
    `registerEndLate` DATETIME(3) NULL,
    `registerPause` BOOLEAN NOT NULL DEFAULT false,
    `orientStart` DATETIME(3) NULL,
    `orientEnd` DATETIME(3) NULL,
    `lectureStart` DATETIME(3) NULL,
    `lectureEnd` DATETIME(3) NULL,
    `examStart` DATETIME(3) NULL,
    `examEnd` DATETIME(3) NULL,
    `entryStart` DATETIME(3) NULL,
    `entryEnd` DATETIME(3) NULL,
    `admissionPrefix` VARCHAR(191) NULL,
    `assignLateSheet` BOOLEAN NOT NULL DEFAULT false,
    `progressStudent` BOOLEAN NOT NULL DEFAULT false,
    `stageSheet` BOOLEAN NOT NULL DEFAULT false,
    `default` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_structure` (
    `id` VARCHAR(191) NOT NULL,
    `unitId` VARCHAR(191) NULL,
    `programId` VARCHAR(191) NOT NULL,
    `majorId` VARCHAR(191) NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `semesterNum` INTEGER NOT NULL,
    `type` ENUM('C', 'E', 'O') NOT NULL,
    `lock` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_structmeta` (
    `id` VARCHAR(191) NOT NULL,
    `programId` VARCHAR(191) NOT NULL,
    `majorId` VARCHAR(191) NULL,
    `semesterNum` INTEGER NOT NULL,
    `minCredit` INTEGER NOT NULL,
    `maxCredit` INTEGER NOT NULL,
    `maxElectiveNum` INTEGER NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_activity_register` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `indexno` VARCHAR(50) NOT NULL,
    `courses` INTEGER NOT NULL,
    `credits` INTEGER NOT NULL,
    `dump` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_activity_progress` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `indexno` VARCHAR(50) NOT NULL,
    `semesterNum` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_activity_progchange` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `oldIndexno` VARCHAR(50) NOT NULL,
    `newIndexno` VARCHAR(50) NULL,
    `oldProgramId` VARCHAR(191) NOT NULL,
    `newProgramId` VARCHAR(191) NULL,
    `newSemesterNum` INTEGER NOT NULL,
    `reason` VARCHAR(255) NULL,
    `approved` BOOLEAN NOT NULL DEFAULT true,
    `approvedBy` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_activity_defer` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `indexno` VARCHAR(50) NOT NULL,
    `semesterNum` INTEGER NOT NULL,
    `reason` VARCHAR(255) NULL,
    `durationInYears` INTEGER NOT NULL,
    `status` ENUM('PENDED', 'APPROVED', 'DECLINED') NOT NULL,
    `statusBy` VARCHAR(191) NULL,
    `start` DATETIME(3) NULL,
    `end` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_assessment` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `schemeId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `indexno` VARCHAR(191) NOT NULL,
    `credit` INTEGER NOT NULL,
    `semesterNum` INTEGER NOT NULL,
    `classScore` DOUBLE NULL,
    `examScore` DOUBLE NULL,
    `totalScore` DOUBLE NOT NULL,
    `type` ENUM('N', 'R') NOT NULL,
    `scoreA` DOUBLE NULL,
    `scoreB` DOUBLE NULL,
    `scoreC` DOUBLE NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ais_assessment_sessionId_courseId_semesterNum_idx`(`sessionId`, `courseId`, `semesterNum`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `informer` (
    `id` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NULL,
    `title` VARCHAR(350) NOT NULL,
    `content` TEXT NULL,
    `smsContent` TEXT NULL,
    `receiver` ENUM('APPLICANT', 'FRESHER', 'STUDENT', 'UNDERGRAD', 'POSTGRAD', 'ALUMNI', 'STAFF', 'HOD', 'DEAN', 'ASSESSOR', 'DEBTOR') NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_letter` (
    `id` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NULL,
    `title` VARCHAR(350) NOT NULL,
    `signatory` TEXT NOT NULL,
    `signature` LONGTEXT NOT NULL,
    `template` LONGTEXT NOT NULL,
    `cc` TEXT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_sheet` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `unitId` VARCHAR(191) NULL,
    `programId` VARCHAR(191) NOT NULL,
    `majorId` VARCHAR(191) NULL,
    `assignStaffId` VARCHAR(191) NULL,
    `assessorId` VARCHAR(191) NULL,
    `certifierId` VARCHAR(191) NULL,
    `semesterNum` INTEGER NOT NULL,
    `studyMode` VARCHAR(50) NULL,
    `studentCount` INTEGER NULL DEFAULT 0,
    `completeRatio` DOUBLE NULL,
    `assessed` BOOLEAN NOT NULL DEFAULT false,
    `certified` BOOLEAN NOT NULL DEFAULT false,
    `finalized` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ais_sheet_sessionId_programId_courseId_semesterNum_majorId_idx`(`sessionId`, `programId`, `courseId`, `semesterNum`, `majorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_transwift` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NULL,
    `title` VARCHAR(350) NOT NULL,
    `type` ENUM('ATTESTATION', 'PROFICIENCY', 'TRANSCRIPT', 'INTRODUCTORY') NOT NULL,
    `reference` VARCHAR(350) NULL,
    `applicant` VARCHAR(350) NULL,
    `receipient` TEXT NULL,
    `quantity` INTEGER NOT NULL,
    `mode` ENUM('PICKUP', 'INLAND', 'FOREIGN') NOT NULL,
    `version` ENUM('SOFTCOPY', 'HARDCOPY') NOT NULL DEFAULT 'SOFTCOPY',
    `status` ENUM('PENDED', 'PRINTED', 'COMPLETED') NOT NULL DEFAULT 'PENDED',
    `issuerId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_graduation` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(350) NOT NULL,
    `start` DATETIME(3) NULL,
    `end` DATETIME(3) NULL,
    `period` DATETIME(3) NULL,
    `graduants` INTEGER NOT NULL,
    `default` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_resession` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(350) NOT NULL,
    `start` DATETIME(3) NULL,
    `end` DATETIME(3) NULL,
    `period` DATETIME(3) NULL,
    `default` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ais_resit` (
    `id` VARCHAR(191) NOT NULL,
    `resitSessionId` VARCHAR(191) NULL,
    `registerSessionId` VARCHAR(191) NULL,
    `trailSessionId` VARCHAR(191) NOT NULL,
    `schemeId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `indexno` VARCHAR(50) NOT NULL,
    `semesterNum` INTEGER NOT NULL,
    `totalScore` INTEGER NOT NULL,
    `approveScore` BOOLEAN NOT NULL DEFAULT false,
    `taken` BOOLEAN NOT NULL DEFAULT false,
    `paid` BOOLEAN NOT NULL DEFAULT false,
    `actionType` ENUM('APPEND', 'REPLACE') NULL,
    `actionMeta` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_bankacc` (
    `id` VARCHAR(191) NOT NULL,
    `unitId` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(255) NOT NULL,
    `accountName` VARCHAR(450) NOT NULL,
    `accountDescription` VARCHAR(450) NOT NULL,
    `bankName` VARCHAR(350) NOT NULL,
    `bankAccount` VARCHAR(30) NOT NULL,
    `bankBranch` VARCHAR(255) NOT NULL,
    `bankContact` VARCHAR(20) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_bill` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `bankaccId` VARCHAR(191) NULL,
    `programId` VARCHAR(191) NULL,
    `studentIds` JSON NULL,
    `mainGroupCode` VARCHAR(4) NOT NULL,
    `discountGroupCode` VARCHAR(4) NOT NULL,
    `narrative` VARCHAR(255) NOT NULL,
    `type` ENUM('GH', 'INT') NOT NULL DEFAULT 'GH',
    `residentialStatus` ENUM('RESIDENTIAL', 'NON_RESIDENTIAL') NOT NULL DEFAULT 'RESIDENTIAL',
    `currency` ENUM('GHC', 'USD') NOT NULL DEFAULT 'GHC',
    `amount` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL,
    `quota` DOUBLE NOT NULL,
    `posted` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_charge` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` ENUM('FINE', 'FEES', 'GRADUATION', 'RESIT') NULL,
    `currency` ENUM('GHC', 'USD') NOT NULL DEFAULT 'GHC',
    `amount` DOUBLE NOT NULL,
    `posted` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_collector` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `address` TEXT NULL,
    `phone` INTEGER NULL,
    `technicianName` VARCHAR(450) NULL,
    `technicianPhone` INTEGER NULL,
    `apiToken` VARCHAR(350) NULL,
    `apiEnabled` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_transtype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `visibility` ENUM('PUBLIC', 'LOCAL') NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_transaction` (
    `id` VARCHAR(191) NOT NULL,
    `collectorId` VARCHAR(191) NULL,
    `transtypeId` INTEGER NULL,
    `bankaccId` VARCHAR(191) NULL,
    `studentId` VARCHAR(191) NULL,
    `reference` VARCHAR(191) NULL,
    `transtag` VARCHAR(191) NOT NULL,
    `payType` ENUM('BANK', 'MOMO') NOT NULL DEFAULT 'BANK',
    `feeType` ENUM('NORMAL', 'SCHOLARSHIP') NOT NULL DEFAULT 'NORMAL',
    `currency` ENUM('GHC', 'USD') NOT NULL DEFAULT 'GHC',
    `amount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_servicefee` (
    `transtypeId` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `amountInGhc` DOUBLE NOT NULL,
    `amountInUsd` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `fms_servicefee_transtypeId_key`(`transtypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_studaccount` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NULL,
    `transactId` VARCHAR(191) NULL,
    `sessionId` VARCHAR(191) NULL,
    `chargeId` VARCHAR(191) NULL,
    `billId` VARCHAR(191) NULL,
    `type` ENUM('CHARGE', 'BILL', 'PAYMENT') NOT NULL,
    `narrative` VARCHAR(255) NOT NULL,
    `currency` ENUM('GHC', 'USD') NOT NULL DEFAULT 'GHC',
    `amount` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_activity_api` (
    `id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(50) NULL,
    `title` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fms_activity_voucher` (
    `id` VARCHAR(191) NOT NULL,
    `transactId` VARCHAR(191) NULL,
    `admissionId` VARCHAR(191) NULL,
    `serial` INTEGER NULL,
    `pin` VARCHAR(8) NULL,
    `buyerName` VARCHAR(255) NOT NULL,
    `buyerPhone` VARCHAR(10) NOT NULL,
    `smsCode` INTEGER NULL,
    `generated` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_activity_applicant` (
    `id` VARCHAR(191) NOT NULL,
    `serial` INTEGER NULL,
    `meta` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_vendor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `technicianName` VARCHAR(191) NOT NULL,
    `technicianPhone` VARCHAR(191) NOT NULL,
    `technicianEmail` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT true,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_category` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_exam_category` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_cert_category` (
    `id` VARCHAR(191) NOT NULL,
    `instituteCategoryId` VARCHAR(191) NULL,
    `title` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_institute_category` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_grade_weight` (
    `id` VARCHAR(191) NOT NULL,
    `certCategoryId` VARCHAR(191) NULL,
    `title` VARCHAR(100) NOT NULL,
    `weight` TINYINT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_document_category` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_subject` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_price` (
    `id` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NULL,
    `title` VARCHAR(255) NOT NULL,
    `sellType` INTEGER NULL,
    `currency` ENUM('GHC', 'USD') NOT NULL DEFAULT 'GHC',
    `amount` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_form` (
    `id` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NULL,
    `title` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_stage` (
    `id` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NULL,
    `formId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(350) NOT NULL,
    `sellType` INTEGER NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_applytype` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(350) NOT NULL,
    `stages` JSON NOT NULL,
    `letterCondition` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_letter` (
    `id` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NULL,
    `title` VARCHAR(350) NOT NULL,
    `signatory` TEXT NOT NULL,
    `signature` LONGTEXT NOT NULL,
    `template` LONGTEXT NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_voucher` (
    `serial` VARCHAR(191) NOT NULL,
    `pin` VARCHAR(191) NOT NULL,
    `admissionId` VARCHAR(191) NOT NULL,
    `vendorId` VARCHAR(191) NULL,
    `categoryId` VARCHAR(191) NULL,
    `sellType` INTEGER NULL,
    `applicantName` VARCHAR(255) NULL,
    `applicantPhone` VARCHAR(10) NULL,
    `soldAt` DATETIME(3) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`serial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_admission` (
    `id` VARCHAR(191) NOT NULL,
    `pgletterId` VARCHAR(191) NULL,
    `ugletterId` VARCHAR(191) NULL,
    `dpletterId` VARCHAR(191) NULL,
    `cpletterId` VARCHAR(191) NULL,
    `sessionId` VARCHAR(191) NULL,
    `title` VARCHAR(255) NOT NULL,
    `examStart` DATETIME(3) NULL,
    `examEnd` DATETIME(3) NULL,
    `applyStart` DATETIME(3) NULL,
    `applyEnd` DATETIME(3) NULL,
    `applyPause` BOOLEAN NOT NULL DEFAULT true,
    `showAdmitted` BOOLEAN NOT NULL DEFAULT true,
    `voucherIndex` INTEGER NULL,
    `default` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `admittedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_sorted` (
    `serial` VARCHAR(191) NOT NULL,
    `admissionId` VARCHAR(191) NOT NULL,
    `stageId` VARCHAR(191) NOT NULL,
    `applyTypeId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NULL,
    `sellType` INTEGER NULL,
    `choice1Id` VARCHAR(191) NULL,
    `choice2Id` VARCHAR(191) NULL,
    `profileId` VARCHAR(191) NULL,
    `gradeValue` INTEGER NULL,
    `classValue` INTEGER NULL,
    `admitted` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`serial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_fresher` (
    `serial` VARCHAR(191) NOT NULL,
    `admissionId` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `billId` VARCHAR(191) NULL,
    `programId` VARCHAR(191) NOT NULL,
    `majorId` VARCHAR(191) NULL,
    `sessionMode` ENUM('M', 'W', 'E') NULL,
    `categoryId` VARCHAR(191) NULL,
    `sellType` INTEGER NULL,
    `semesterNum` INTEGER NOT NULL,
    `username` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `accept` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`serial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_applicant` (
    `serial` VARCHAR(191) NOT NULL,
    `stageId` VARCHAR(191) NOT NULL,
    `applyTypeId` VARCHAR(191) NOT NULL,
    `choiceId` VARCHAR(191) NULL,
    `profileId` VARCHAR(191) NULL,
    `photo` LONGTEXT NULL,
    `meta` JSON NULL,
    `gradeValue` INTEGER NULL,
    `classValue` INTEGER NULL,
    `sorted` BOOLEAN NOT NULL DEFAULT false,
    `submitted` BOOLEAN NOT NULL DEFAULT false,
    `submittedAt` DATETIME(3) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`serial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_step_profile` (
    `serial` VARCHAR(191) NOT NULL,
    `titleId` VARCHAR(191) NOT NULL,
    `fname` VARCHAR(255) NOT NULL,
    `mname` VARCHAR(350) NULL,
    `lname` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `maritalId` VARCHAR(50) NULL,
    `disabilities` VARCHAR(350) NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NULL,
    `hometown` VARCHAR(255) NULL,
    `residentAddress` VARCHAR(350) NULL,
    `postalAddress` VARCHAR(350) NULL,
    `occupation` VARCHAR(350) NULL,
    `workPlace` VARCHAR(255) NULL,
    `bondInstitute` VARCHAR(255) NULL,
    `residentialStatus` ENUM('RESIDENTIAL', 'NON_RESIDENTIAL') NULL,
    `studyMode` ENUM('M', 'W', 'E') NULL,
    `nationalityId` VARCHAR(191) NULL,
    `countryId` VARCHAR(191) NULL,
    `regionId` VARCHAR(191) NULL,
    `religionId` VARCHAR(191) NULL,
    `disabilityId` VARCHAR(191) NULL,
    `bonded` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`serial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_step_guardian` (
    `serial` VARCHAR(191) NOT NULL,
    `relationId` VARCHAR(191) NOT NULL,
    `titleId` VARCHAR(191) NOT NULL,
    `fname` VARCHAR(255) NOT NULL,
    `mname` VARCHAR(350) NULL,
    `lname` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(350) NULL,
    `occupation` VARCHAR(350) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`serial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_step_education` (
    `id` VARCHAR(191) NOT NULL,
    `serial` VARCHAR(191) NOT NULL,
    `instituteCategoryId` VARCHAR(191) NULL,
    `certCategoryId` VARCHAR(191) NULL,
    `instituteName` VARCHAR(255) NOT NULL,
    `certName` VARCHAR(350) NULL,
    `gradeValue` INTEGER NULL,
    `classValue` INTEGER NULL,
    `startMonth` INTEGER NOT NULL,
    `startYear` INTEGER NOT NULL,
    `endMonth` INTEGER NULL,
    `endYear` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_step_result` (
    `id` VARCHAR(191) NOT NULL,
    `serial` VARCHAR(191) NOT NULL,
    `certCategoryId` VARCHAR(191) NULL,
    `indexNumber` VARCHAR(255) NOT NULL,
    `sitting` INTEGER NULL,
    `startYear` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_step_grade` (
    `id` VARCHAR(191) NOT NULL,
    `resultId` VARCHAR(191) NULL,
    `subjectId` VARCHAR(191) NULL,
    `gradeWeightId` VARCHAR(191) NULL,
    `serial` VARCHAR(191) NOT NULL,
    `gradeValue` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_step_employment` (
    `id` VARCHAR(191) NOT NULL,
    `serial` VARCHAR(191) NOT NULL,
    `employerName` VARCHAR(350) NOT NULL,
    `employerAddress` VARCHAR(350) NOT NULL,
    `jobTitle` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(350) NULL,
    `startMonth` INTEGER NULL,
    `startYear` INTEGER NULL,
    `endMonth` INTEGER NULL,
    `endYear` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_step_document` (
    `id` VARCHAR(191) NOT NULL,
    `documentCategoryId` VARCHAR(191) NULL,
    `serial` VARCHAR(191) NOT NULL,
    `base64` LONGTEXT NULL,
    `mime` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_step_choice` (
    `id` VARCHAR(191) NOT NULL,
    `programId` VARCHAR(191) NULL,
    `majorId` VARCHAR(191) NULL,
    `serial` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ams_step_referee` (
    `id` VARCHAR(191) NOT NULL,
    `serial` VARCHAR(191) NOT NULL,
    `titleId` VARCHAR(191) NOT NULL,
    `fname` VARCHAR(255) NOT NULL,
    `mname` VARCHAR(350) NULL,
    `lname` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(350) NULL,
    `occupation` VARCHAR(350) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evs_election` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupId` INTEGER NOT NULL,
    `type` VARCHAR(300) NOT NULL,
    `title` VARCHAR(450) NULL,
    `tag` VARCHAR(100) NULL,
    `logo` VARCHAR(450) NULL,
    `admins` JSON NULL,
    `voterCount` INTEGER NOT NULL DEFAULT 0,
    `voterList` JSON NULL,
    `voterData` JSON NULL,
    `allowMonitor` BOOLEAN NOT NULL DEFAULT false,
    `allowEcMonitor` BOOLEAN NOT NULL DEFAULT false,
    `allowVip` BOOLEAN NOT NULL DEFAULT false,
    `allowEcVip` BOOLEAN NOT NULL DEFAULT false,
    `allowResult` BOOLEAN NOT NULL DEFAULT false,
    `allowEcResult` BOOLEAN NOT NULL DEFAULT false,
    `allowMask` BOOLEAN NOT NULL DEFAULT false,
    `startAt` DATETIME(3) NULL,
    `endAt` DATETIME(3) NULL,
    `action` ENUM('STAGED', 'STARTED', 'ENDED') NOT NULL DEFAULT 'STAGED',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evs_elector` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `electionId` INTEGER NOT NULL,
    `tag` VARCHAR(100) NULL,
    `name` VARCHAR(450) NULL,
    `descriptor` VARCHAR(450) NULL,
    `gender` VARCHAR(1) NULL,
    `voteTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `voteSum` VARCHAR(750) NULL,
    `voteHash` VARCHAR(100) NULL,
    `voteIp` VARCHAR(50) NULL,
    `voteStatus` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evs_portfolio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `electionId` INTEGER NOT NULL,
    `title` TEXT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evs_candidate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `portfolioId` INTEGER NULL,
    `tag` VARCHAR(100) NULL,
    `name` VARCHAR(450) NULL,
    `teaser` VARCHAR(100) NULL,
    `orderNo` INTEGER NOT NULL DEFAULT 1,
    `photo` VARCHAR(450) NULL,
    `votes` INTEGER NOT NULL DEFAULT 0,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evs_attack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `electionId` INTEGER NULL,
    `tag` VARCHAR(100) NULL,
    `location` VARCHAR(450) NULL,
    `ip` VARCHAR(50) NULL,
    `meta` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sso_app` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(300) NOT NULL,
    `tag` VARCHAR(50) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sso_arole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appId` INTEGER NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sso_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(300) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sso_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupId` INTEGER NOT NULL,
    `tag` VARCHAR(50) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `unlockPin` VARCHAR(4) NULL,
    `locked` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sso_urole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `appRoleId` INTEGER NOT NULL,
    `roleMeta` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sso_provider` (
    `providerId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `accountType` ENUM('LINKEDIN', 'GOOGLE', 'CREDENTIAL', 'PIN') NOT NULL,
    `accountId` VARCHAR(191) NULL,
    `accountSecret` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`providerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sso_support` (
    `supportNo` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(255) NOT NULL,
    `mname` VARCHAR(350) NULL,
    `lname` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(350) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`supportNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hrs_job` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `type` ENUM('ACADEMIC', 'NON_ACADEMIC') NOT NULL,
    `yearsToNextRank` INTEGER NULL,
    `allowNextRank` BOOLEAN NOT NULL DEFAULT true,
    `staffCategory` ENUM('JS', 'SS', 'SM') NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hrs_promotion` (
    `id` VARCHAR(191) NOT NULL,
    `staffNo` VARCHAR(191) NULL,
    `jobId` VARCHAR(191) NULL,
    `scaleId` VARCHAR(191) NULL,
    `staffCategory` ENUM('JS', 'SS', 'SM') NOT NULL,
    `letterAt` DATETIME(3) NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `confirmAt` DATETIME(3) NOT NULL,
    `probation` INTEGER NULL,
    `type` ENUM('APPOINTMENT', 'PROMOTION', 'UPGRADE') NOT NULL DEFAULT 'APPOINTMENT',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hrs_postinfo` (
    `id` VARCHAR(191) NOT NULL,
    `unitId` VARCHAR(191) NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `duties` TEXT NULL,
    `allowances` JSON NULL,
    `durationInYears` INTEGER NULL,
    `renewalInYears` INTEGER NULL,
    `staffCategory` ENUM('JS', 'SS', 'SM') NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hrs_position` (
    `id` VARCHAR(191) NOT NULL,
    `staffNo` VARCHAR(191) NULL,
    `postinfoId` VARCHAR(191) NULL,
    `scaleId` VARCHAR(191) NULL,
    `staffCategory` ENUM('JS', 'SS', 'SM') NOT NULL,
    `letterAt` DATETIME(3) NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `endAt` DATETIME(3) NOT NULL,
    `duration` INTEGER NULL,
    `type` ENUM('APPOINTMENT', 'RENEWAL') NOT NULL DEFAULT 'APPOINTMENT',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hrs_transfer` (
    `id` VARCHAR(191) NOT NULL,
    `staffNo` VARCHAR(191) NULL,
    `fromUnitId` VARCHAR(191) NULL,
    `toUnitId` VARCHAR(191) NULL,
    `reason` VARCHAR(350) NULL,
    `letterAt` DATETIME(3) NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdBy` INTEGER NULL,
    `approvedBy` INTEGER NULL,
    `approvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hrs_scale` (
    `id` VARCHAR(191) NOT NULL,
    `grade` VARCHAR(350) NULL,
    `gradeNum` INTEGER NULL,
    `notch` INTEGER NULL,
    `notchAmount` DOUBLE NULL,
    `level` ENUM('L', 'H', 'AH') NOT NULL,
    `staffCategory` ENUM('JS', 'SS', 'SM') NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hrs_staff` (
    `staffNo` VARCHAR(191) NOT NULL,
    `titleId` VARCHAR(191) NULL,
    `fname` VARCHAR(255) NOT NULL,
    `mname` VARCHAR(350) NULL,
    `lname` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `dob` DATETIME(3) NULL,
    `maritalId` VARCHAR(191) NULL,
    `disabilities` VARCHAR(350) NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NULL,
    `hometown` VARCHAR(255) NULL,
    `birthplace` VARCHAR(255) NULL,
    `district` VARCHAR(255) NULL,
    `ssnitNo` VARCHAR(255) NULL,
    `ghcardNo` VARCHAR(255) NULL,
    `residentAddress` VARCHAR(350) NULL,
    `occupation` VARCHAR(350) NULL,
    `qualification` VARCHAR(650) NULL,
    `instituteEmail` VARCHAR(350) NULL,
    `countryId` VARCHAR(191) NULL,
    `regionId` VARCHAR(191) NULL,
    `religionId` VARCHAR(191) NULL,
    `unitId` VARCHAR(191) NULL,
    `jobId` VARCHAR(191) NULL,
    `jobMode` VARCHAR(350) NULL,
    `promotionId` VARCHAR(191) NULL,
    `positionId` VARCHAR(191) NULL,
    `firstofferId` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `hrs_staff_staffNo_key`(`staffNo`),
    PRIMARY KEY (`staffNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hrs_relative` (
    `id` VARCHAR(191) NOT NULL,
    `relationId` VARCHAR(191) NULL,
    `titleId` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,
    `fname` VARCHAR(255) NOT NULL,
    `mname` VARCHAR(350) NULL,
    `lname` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `address` VARCHAR(350) NULL,
    `hometown` VARCHAR(255) NULL,
    `isKin` BOOLEAN NOT NULL DEFAULT true,
    `isAlive` BOOLEAN NOT NULL DEFAULT true,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_appToprovider` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_appToprovider_AB_unique`(`A`, `B`),
    INDEX `_appToprovider_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `unit` ADD CONSTRAINT `unit_level1Id_fkey` FOREIGN KEY (`level1Id`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit` ADD CONSTRAINT `unit_level2Id_fkey` FOREIGN KEY (`level2Id`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_program` ADD CONSTRAINT `ais_program_schemeId_fkey` FOREIGN KEY (`schemeId`) REFERENCES `ais_scheme`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_program` ADD CONSTRAINT `ais_program_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_program` ADD CONSTRAINT `ais_program_modeId_fkey` FOREIGN KEY (`modeId`) REFERENCES `mode`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `title`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_nationalityId_fkey` FOREIGN KEY (`nationalityId`) REFERENCES `country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_religionId_fkey` FOREIGN KEY (`religionId`) REFERENCES `religion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_disabilityId_fkey` FOREIGN KEY (`disabilityId`) REFERENCES `disability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `ais_program`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `ais_major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_graduateId_fkey` FOREIGN KEY (`graduateId`) REFERENCES `ais_graduation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_maritalId_fkey` FOREIGN KEY (`maritalId`) REFERENCES `marital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_structure` ADD CONSTRAINT `ais_structure_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_structure` ADD CONSTRAINT `ais_structure_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `ais_program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_structure` ADD CONSTRAINT `ais_structure_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `ais_major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_structure` ADD CONSTRAINT `ais_structure_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `ais_course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_structmeta` ADD CONSTRAINT `ais_structmeta_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `ais_program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_structmeta` ADD CONSTRAINT `ais_structmeta_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `ais_major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_register` ADD CONSTRAINT `ais_activity_register_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_register` ADD CONSTRAINT `ais_activity_register_indexno_fkey` FOREIGN KEY (`indexno`) REFERENCES `ais_student`(`indexno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_progress` ADD CONSTRAINT `ais_activity_progress_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_progress` ADD CONSTRAINT `ais_activity_progress_indexno_fkey` FOREIGN KEY (`indexno`) REFERENCES `ais_student`(`indexno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_progchange` ADD CONSTRAINT `ais_activity_progchange_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_progchange` ADD CONSTRAINT `ais_activity_progchange_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `ais_student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_progchange` ADD CONSTRAINT `ais_activity_progchange_oldProgramId_fkey` FOREIGN KEY (`oldProgramId`) REFERENCES `ais_program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_progchange` ADD CONSTRAINT `ais_activity_progchange_newProgramId_fkey` FOREIGN KEY (`newProgramId`) REFERENCES `ais_program`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_defer` ADD CONSTRAINT `ais_activity_defer_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_defer` ADD CONSTRAINT `ais_activity_defer_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `ais_student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_assessment` ADD CONSTRAINT `ais_assessment_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_assessment` ADD CONSTRAINT `ais_assessment_schemeId_fkey` FOREIGN KEY (`schemeId`) REFERENCES `ais_scheme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_assessment` ADD CONSTRAINT `ais_assessment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `ais_course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_assessment` ADD CONSTRAINT `ais_assessment_indexno_fkey` FOREIGN KEY (`indexno`) REFERENCES `ais_student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `ais_program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `ais_major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `ais_course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_assignStaffId_fkey` FOREIGN KEY (`assignStaffId`) REFERENCES `hrs_staff`(`staffNo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_assessorId_fkey` FOREIGN KEY (`assessorId`) REFERENCES `hrs_staff`(`staffNo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_certifierId_fkey` FOREIGN KEY (`certifierId`) REFERENCES `hrs_staff`(`staffNo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_transwift` ADD CONSTRAINT `ais_transwift_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `ais_student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_transwift` ADD CONSTRAINT `ais_transwift_issuerId_fkey` FOREIGN KEY (`issuerId`) REFERENCES `hrs_staff`(`staffNo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_resit` ADD CONSTRAINT `ais_resit_resitSessionId_fkey` FOREIGN KEY (`resitSessionId`) REFERENCES `ais_resession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_resit` ADD CONSTRAINT `ais_resit_trailSessionId_fkey` FOREIGN KEY (`trailSessionId`) REFERENCES `ais_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_resit` ADD CONSTRAINT `ais_resit_registerSessionId_fkey` FOREIGN KEY (`registerSessionId`) REFERENCES `ais_session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_resit` ADD CONSTRAINT `ais_resit_schemeId_fkey` FOREIGN KEY (`schemeId`) REFERENCES `ais_scheme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_resit` ADD CONSTRAINT `ais_resit_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `ais_course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_resit` ADD CONSTRAINT `ais_resit_indexno_fkey` FOREIGN KEY (`indexno`) REFERENCES `ais_student`(`indexno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_bankacc` ADD CONSTRAINT `fms_bankacc_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_bill` ADD CONSTRAINT `fms_bill_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_bill` ADD CONSTRAINT `fms_bill_bankaccId_fkey` FOREIGN KEY (`bankaccId`) REFERENCES `fms_bankacc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_bill` ADD CONSTRAINT `fms_bill_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `ais_program`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_charge` ADD CONSTRAINT `fms_charge_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `ais_student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_transaction` ADD CONSTRAINT `fms_transaction_collectorId_fkey` FOREIGN KEY (`collectorId`) REFERENCES `fms_collector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_transaction` ADD CONSTRAINT `fms_transaction_bankaccId_fkey` FOREIGN KEY (`bankaccId`) REFERENCES `fms_bankacc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_transaction` ADD CONSTRAINT `fms_transaction_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `ais_student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_transaction` ADD CONSTRAINT `fms_transaction_transtypeId_fkey` FOREIGN KEY (`transtypeId`) REFERENCES `fms_transtype`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_servicefee` ADD CONSTRAINT `fms_servicefee_transtypeId_fkey` FOREIGN KEY (`transtypeId`) REFERENCES `fms_transtype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_studaccount` ADD CONSTRAINT `fms_studaccount_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `ais_student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_studaccount` ADD CONSTRAINT `fms_studaccount_transactId_fkey` FOREIGN KEY (`transactId`) REFERENCES `fms_transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_studaccount` ADD CONSTRAINT `fms_studaccount_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_studaccount` ADD CONSTRAINT `fms_studaccount_chargeId_fkey` FOREIGN KEY (`chargeId`) REFERENCES `fms_charge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_studaccount` ADD CONSTRAINT `fms_studaccount_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `fms_bill`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_activity_voucher` ADD CONSTRAINT `fms_activity_voucher_admissionId_fkey` FOREIGN KEY (`admissionId`) REFERENCES `ams_admission`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fms_activity_voucher` ADD CONSTRAINT `fms_activity_voucher_transactId_fkey` FOREIGN KEY (`transactId`) REFERENCES `fms_transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_cert_category` ADD CONSTRAINT `ams_cert_category_instituteCategoryId_fkey` FOREIGN KEY (`instituteCategoryId`) REFERENCES `ams_institute_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_grade_weight` ADD CONSTRAINT `ams_grade_weight_certCategoryId_fkey` FOREIGN KEY (`certCategoryId`) REFERENCES `ams_cert_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_price` ADD CONSTRAINT `ams_price_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ams_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_form` ADD CONSTRAINT `ams_form_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ams_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_stage` ADD CONSTRAINT `ams_stage_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ams_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_stage` ADD CONSTRAINT `ams_stage_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `ams_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_letter` ADD CONSTRAINT `ams_letter_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ams_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_voucher` ADD CONSTRAINT `ams_voucher_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ams_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_voucher` ADD CONSTRAINT `ams_voucher_admissionId_fkey` FOREIGN KEY (`admissionId`) REFERENCES `ams_admission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_voucher` ADD CONSTRAINT `ams_voucher_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `ams_vendor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_admission` ADD CONSTRAINT `ams_admission_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_admission` ADD CONSTRAINT `ams_admission_pgletterId_fkey` FOREIGN KEY (`pgletterId`) REFERENCES `ams_letter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_admission` ADD CONSTRAINT `ams_admission_ugletterId_fkey` FOREIGN KEY (`ugletterId`) REFERENCES `ams_letter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_admission` ADD CONSTRAINT `ams_admission_dpletterId_fkey` FOREIGN KEY (`dpletterId`) REFERENCES `ams_letter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_admission` ADD CONSTRAINT `ams_admission_cpletterId_fkey` FOREIGN KEY (`cpletterId`) REFERENCES `ams_letter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_admissionId_fkey` FOREIGN KEY (`admissionId`) REFERENCES `ams_admission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `ams_stage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_applyTypeId_fkey` FOREIGN KEY (`applyTypeId`) REFERENCES `ams_applytype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ams_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_choice1Id_fkey` FOREIGN KEY (`choice1Id`) REFERENCES `ams_step_choice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_choice2Id_fkey` FOREIGN KEY (`choice2Id`) REFERENCES `ams_step_choice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `ams_step_profile`(`serial`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_fresher` ADD CONSTRAINT `ams_fresher_admissionId_fkey` FOREIGN KEY (`admissionId`) REFERENCES `ams_admission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_fresher` ADD CONSTRAINT `ams_fresher_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ais_session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_fresher` ADD CONSTRAINT `ams_fresher_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `fms_bill`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_fresher` ADD CONSTRAINT `ams_fresher_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `ais_program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_fresher` ADD CONSTRAINT `ams_fresher_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `ais_major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_fresher` ADD CONSTRAINT `ams_fresher_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ams_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_fresher` ADD CONSTRAINT `ams_fresher_serial_fkey` FOREIGN KEY (`serial`) REFERENCES `ais_student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_applicant` ADD CONSTRAINT `ams_applicant_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `ams_stage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_applicant` ADD CONSTRAINT `ams_applicant_applyTypeId_fkey` FOREIGN KEY (`applyTypeId`) REFERENCES `ams_applytype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_applicant` ADD CONSTRAINT `ams_applicant_choiceId_fkey` FOREIGN KEY (`choiceId`) REFERENCES `ams_step_choice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_applicant` ADD CONSTRAINT `ams_applicant_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `ams_step_profile`(`serial`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_profile` ADD CONSTRAINT `ams_step_profile_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `title`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_profile` ADD CONSTRAINT `ams_step_profile_nationalityId_fkey` FOREIGN KEY (`nationalityId`) REFERENCES `country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_profile` ADD CONSTRAINT `ams_step_profile_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_profile` ADD CONSTRAINT `ams_step_profile_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_profile` ADD CONSTRAINT `ams_step_profile_religionId_fkey` FOREIGN KEY (`religionId`) REFERENCES `religion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_profile` ADD CONSTRAINT `ams_step_profile_disabilityId_fkey` FOREIGN KEY (`disabilityId`) REFERENCES `disability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_profile` ADD CONSTRAINT `ams_step_profile_maritalId_fkey` FOREIGN KEY (`maritalId`) REFERENCES `marital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_guardian` ADD CONSTRAINT `ams_step_guardian_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `title`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_guardian` ADD CONSTRAINT `ams_step_guardian_relationId_fkey` FOREIGN KEY (`relationId`) REFERENCES `relation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_education` ADD CONSTRAINT `ams_step_education_instituteCategoryId_fkey` FOREIGN KEY (`instituteCategoryId`) REFERENCES `ams_institute_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_education` ADD CONSTRAINT `ams_step_education_certCategoryId_fkey` FOREIGN KEY (`certCategoryId`) REFERENCES `ams_cert_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_result` ADD CONSTRAINT `ams_step_result_certCategoryId_fkey` FOREIGN KEY (`certCategoryId`) REFERENCES `ams_cert_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_grade` ADD CONSTRAINT `ams_step_grade_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `ams_step_result`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_grade` ADD CONSTRAINT `ams_step_grade_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `ams_subject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_grade` ADD CONSTRAINT `ams_step_grade_gradeWeightId_fkey` FOREIGN KEY (`gradeWeightId`) REFERENCES `ams_grade_weight`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_document` ADD CONSTRAINT `ams_step_document_documentCategoryId_fkey` FOREIGN KEY (`documentCategoryId`) REFERENCES `ams_document_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_choice` ADD CONSTRAINT `ams_step_choice_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `ais_program`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_choice` ADD CONSTRAINT `ams_step_choice_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `ais_major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_referee` ADD CONSTRAINT `ams_step_referee_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `title`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evs_elector` ADD CONSTRAINT `evs_elector_electionId_fkey` FOREIGN KEY (`electionId`) REFERENCES `evs_election`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evs_portfolio` ADD CONSTRAINT `evs_portfolio_electionId_fkey` FOREIGN KEY (`electionId`) REFERENCES `evs_election`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evs_candidate` ADD CONSTRAINT `evs_candidate_portfolioId_fkey` FOREIGN KEY (`portfolioId`) REFERENCES `evs_portfolio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evs_attack` ADD CONSTRAINT `evs_attack_electionId_fkey` FOREIGN KEY (`electionId`) REFERENCES `evs_election`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sso_arole` ADD CONSTRAINT `sso_arole_appId_fkey` FOREIGN KEY (`appId`) REFERENCES `sso_app`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sso_user` ADD CONSTRAINT `sso_user_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `sso_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sso_urole` ADD CONSTRAINT `sso_urole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `sso_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sso_urole` ADD CONSTRAINT `sso_urole_appRoleId_fkey` FOREIGN KEY (`appRoleId`) REFERENCES `sso_arole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sso_provider` ADD CONSTRAINT `sso_provider_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `sso_user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_promotion` ADD CONSTRAINT `hrs_promotion_staffNo_fkey` FOREIGN KEY (`staffNo`) REFERENCES `hrs_staff`(`staffNo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_promotion` ADD CONSTRAINT `hrs_promotion_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `hrs_job`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_promotion` ADD CONSTRAINT `hrs_promotion_scaleId_fkey` FOREIGN KEY (`scaleId`) REFERENCES `hrs_scale`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_postinfo` ADD CONSTRAINT `hrs_postinfo_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_position` ADD CONSTRAINT `hrs_position_staffNo_fkey` FOREIGN KEY (`staffNo`) REFERENCES `hrs_staff`(`staffNo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_position` ADD CONSTRAINT `hrs_position_postinfoId_fkey` FOREIGN KEY (`postinfoId`) REFERENCES `hrs_postinfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_position` ADD CONSTRAINT `hrs_position_scaleId_fkey` FOREIGN KEY (`scaleId`) REFERENCES `hrs_scale`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_transfer` ADD CONSTRAINT `hrs_transfer_fromUnitId_fkey` FOREIGN KEY (`fromUnitId`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_transfer` ADD CONSTRAINT `hrs_transfer_toUnitId_fkey` FOREIGN KEY (`toUnitId`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `title`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_maritalId_fkey` FOREIGN KEY (`maritalId`) REFERENCES `marital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_religionId_fkey` FOREIGN KEY (`religionId`) REFERENCES `religion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `hrs_job`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_firstofferId_fkey` FOREIGN KEY (`firstofferId`) REFERENCES `hrs_promotion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `hrs_promotion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_staff` ADD CONSTRAINT `hrs_staff_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `hrs_position`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_relative` ADD CONSTRAINT `hrs_relative_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `title`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hrs_relative` ADD CONSTRAINT `hrs_relative_relationId_fkey` FOREIGN KEY (`relationId`) REFERENCES `relation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_appToprovider` ADD CONSTRAINT `_appToprovider_A_fkey` FOREIGN KEY (`A`) REFERENCES `sso_app`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_appToprovider` ADD CONSTRAINT `_appToprovider_B_fkey` FOREIGN KEY (`B`) REFERENCES `sso_provider`(`providerId`) ON DELETE CASCADE ON UPDATE CASCADE;
