/*
  Warnings:

  - You are about to drop the column `hometowm` on the `ais_student` table. All the data in the column will be lost.
  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `ais_student` DROP COLUMN `hometowm`,
    ADD COLUMN `hometown` VARCHAR(255) NULL,
    MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;
