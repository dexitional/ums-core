/*
  Warnings:

  - The values [SEM1,SEM2] on the enum `ais_session_semester` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `ais_structure` DROP FOREIGN KEY `ais_structure_majorId_fkey`;

-- DropForeignKey
ALTER TABLE `ais_structure` DROP FOREIGN KEY `ais_structure_unitId_fkey`;

-- AlterTable
ALTER TABLE `ais_session` MODIFY `semester` ENUM('1', '2') NOT NULL;

-- AlterTable
ALTER TABLE `ais_structure` MODIFY `unitId` VARCHAR(191) NULL,
    MODIFY `majorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `ais_structure` ADD CONSTRAINT `ais_structure_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_structure` ADD CONSTRAINT `ais_structure_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `ais_major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
