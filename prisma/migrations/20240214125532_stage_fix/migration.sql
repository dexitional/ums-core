/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `ams_stage` DROP FOREIGN KEY `ams_stage_formId_fkey`;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `ams_stage` MODIFY `formId` VARCHAR(191) NULL,
    MODIFY `amount` DOUBLE NULL,
    MODIFY `currency` ENUM('GHC', 'USD') NULL DEFAULT 'GHC',
    MODIFY `label` VARCHAR(350) NULL;

-- AddForeignKey
ALTER TABLE `ams_stage` ADD CONSTRAINT `ams_stage_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `ams_form`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
