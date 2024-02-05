/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `ams_sorted` ADD COLUMN `profileId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `ams_step_profile`(`serial`) ON DELETE SET NULL ON UPDATE CASCADE;
