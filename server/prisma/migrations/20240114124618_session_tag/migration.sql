/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `ais_session` ADD COLUMN `tag` VARCHAR(50) NULL,
    MODIFY `registerStart` DATETIME(3) NULL,
    MODIFY `registerEnd` DATETIME(3) NULL,
    MODIFY `registerEndLate` DATETIME(3) NULL,
    MODIFY `orientStart` DATETIME(3) NULL,
    MODIFY `orientEnd` DATETIME(3) NULL,
    MODIFY `lectureStart` DATETIME(3) NULL,
    MODIFY `lectureEnd` DATETIME(3) NULL,
    MODIFY `examStart` DATETIME(3) NULL,
    MODIFY `examEnd` DATETIME(3) NULL,
    MODIFY `entryStart` DATETIME(3) NULL,
    MODIFY `entryEnd` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ais_student` ADD COLUMN `studyMode` ENUM('M', 'W', 'E') NULL,
    MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;
