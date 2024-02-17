/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `ams_fresher` DROP FOREIGN KEY `ams_fresher_billId_fkey`;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `ams_fresher` MODIFY `billId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ams_fresher` ADD CONSTRAINT `ams_fresher_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `fms_bill`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
