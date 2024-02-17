/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `mstatus` on the `ams_step_profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ams_fresher` DROP FOREIGN KEY `ams_fresher_serial_fkey`;

-- AlterTable
ALTER TABLE `ais_student` ADD COLUMN `instituteAffliate` VARCHAR(350) NULL,
    ADD COLUMN `maritalId` VARCHAR(191) NULL,
    MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL,
    MODIFY `instituteEmail` VARCHAR(350) NULL;

-- AlterTable
ALTER TABLE `ams_step_profile` DROP COLUMN `mstatus`,
    ADD COLUMN `maritalId` VARCHAR(50) NULL,
    ADD COLUMN `residentialStatus` ENUM('RESIDENTIAL', 'NON_RESIDENTIAL') NULL,
    ADD COLUMN `studyMode` ENUM('M', 'W', 'E') NULL;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_maritalId_fkey` FOREIGN KEY (`maritalId`) REFERENCES `marital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_fresher` ADD CONSTRAINT `ams_fresher_serial_fkey` FOREIGN KEY (`serial`) REFERENCES `ais_student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_step_profile` ADD CONSTRAINT `ams_step_profile_maritalId_fkey` FOREIGN KEY (`maritalId`) REFERENCES `marital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
