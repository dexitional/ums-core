/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `residentialStatus` to the `fms_bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `fms_bill` ADD COLUMN `residentialStatus` ENUM('RESIDENTIAL', 'NON_RESIDENTIAL') NOT NULL;