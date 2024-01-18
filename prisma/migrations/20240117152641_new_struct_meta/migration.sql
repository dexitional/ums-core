/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `maxCredit` to the `ais_structmeta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minCredit` to the `ais_structmeta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ais_structmeta` ADD COLUMN `majorId` VARCHAR(191) NULL,
    ADD COLUMN `maxCredit` INTEGER NOT NULL,
    ADD COLUMN `maxElectiveNum` INTEGER NULL,
    ADD COLUMN `minCredit` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `ais_structmeta` ADD CONSTRAINT `ais_structmeta_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `ais_major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
