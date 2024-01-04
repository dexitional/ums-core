/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `ais_student` DROP FOREIGN KEY `ais_student_programId_fkey`;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `gender` VARCHAR(20) NULL,
    MODIFY `dob` DATETIME(3) NULL,
    MODIFY `phone` VARCHAR(20) NULL,
    MODIFY `programId` VARCHAR(191) NULL,
    MODIFY `semesterDone` INTEGER NULL,
    MODIFY `entrySemesterNum` INTEGER NULL,
    MODIFY `entryGroup` ENUM('GH', 'INT') NULL DEFAULT 'GH',
    MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL,
    MODIFY `completeType` ENUM('GRADUATION', 'RASTICATED', 'FORFEITED', 'DEAD', 'DISMISSED') NULL;

-- AddForeignKey
ALTER TABLE `ais_student` ADD CONSTRAINT `ais_student_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `ais_program`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
