/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[id]` on the table `ais_student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ais_student_id_key` ON `ais_student`(`id`);
