/*
  Warnings:

  - You are about to drop the column `credit` on the `ais_course` table. All the data in the column will be lost.
  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `creditHour` to the `ais_course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practicalHour` to the `ais_course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theoryHour` to the `ais_course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ais_course` DROP COLUMN `credit`,
    ADD COLUMN `creditHour` INTEGER NOT NULL,
    ADD COLUMN `practicalHour` INTEGER NOT NULL,
    ADD COLUMN `theoryHour` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;
