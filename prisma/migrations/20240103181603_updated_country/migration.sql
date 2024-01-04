/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NOT NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `country` MODIFY `code` INTEGER NULL,
    MODIFY `shortName` VARCHAR(10) NULL,
    MODIFY `nationality` VARCHAR(300) NULL;
