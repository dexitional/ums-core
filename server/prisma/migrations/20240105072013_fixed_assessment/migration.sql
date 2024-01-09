/*
  Warnings:

  - You are about to alter the column `assignStaffId` on the `ais_sheet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `assessorId` on the `ais_sheet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `certifierId` on the `ais_sheet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `classScore` on the `informer` table. All the data in the column will be lost.
  - You are about to drop the column `examScore` on the `informer` table. All the data in the column will be lost.
  - You are about to drop the column `scoreA` on the `informer` table. All the data in the column will be lost.
  - You are about to drop the column `scoreB` on the `informer` table. All the data in the column will be lost.
  - You are about to drop the column `scoreC` on the `informer` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `informer` table. All the data in the column will be lost.
  - You are about to drop the column `totalScore` on the `informer` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `informer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ais_assessment` MODIFY `indexno` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ais_letter` MODIFY `tag` VARCHAR(191) NULL,
    MODIFY `cc` TEXT NULL;

-- AlterTable
ALTER TABLE `ais_sheet` MODIFY `assignStaffId` INTEGER NULL,
    MODIFY `assessorId` INTEGER NULL,
    MODIFY `certifierId` INTEGER NULL;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `informer` DROP COLUMN `classScore`,
    DROP COLUMN `examScore`,
    DROP COLUMN `scoreA`,
    DROP COLUMN `scoreB`,
    DROP COLUMN `scoreC`,
    DROP COLUMN `semester`,
    DROP COLUMN `totalScore`,
    DROP COLUMN `type`,
    MODIFY `reference` VARCHAR(191) NULL,
    MODIFY `content` TEXT NULL,
    MODIFY `smsContent` TEXT NULL;

-- AddForeignKey
ALTER TABLE `ais_assessment` ADD CONSTRAINT `ais_assessment_indexno_fkey` FOREIGN KEY (`indexno`) REFERENCES `ais_student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_assignStaffId_fkey` FOREIGN KEY (`assignStaffId`) REFERENCES `hrs_staff`(`staffNo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_assessorId_fkey` FOREIGN KEY (`assessorId`) REFERENCES `hrs_staff`(`staffNo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_sheet` ADD CONSTRAINT `ais_sheet_certifierId_fkey` FOREIGN KEY (`certifierId`) REFERENCES `hrs_staff`(`staffNo`) ON DELETE SET NULL ON UPDATE CASCADE;
