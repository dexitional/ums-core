/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `ams_sorted` DROP FOREIGN KEY `ams_sorted_choice1Id_fkey`;

-- DropForeignKey
ALTER TABLE `ams_sorted` DROP FOREIGN KEY `ams_sorted_choice2Id_fkey`;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `ams_sorted` MODIFY `sellType` INTEGER NULL,
    MODIFY `choice1Id` VARCHAR(191) NULL,
    MODIFY `choice2Id` VARCHAR(191) NULL,
    MODIFY `gradeValue` INTEGER NULL,
    MODIFY `classValue` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_choice1Id_fkey` FOREIGN KEY (`choice1Id`) REFERENCES `ams_step_choice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_sorted` ADD CONSTRAINT `ams_sorted_choice2Id_fkey` FOREIGN KEY (`choice2Id`) REFERENCES `ams_step_choice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
