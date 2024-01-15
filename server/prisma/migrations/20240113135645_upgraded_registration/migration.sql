/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `ais_activity_register` ADD CONSTRAINT `ais_activity_register_indexno_fkey` FOREIGN KEY (`indexno`) REFERENCES `ais_student`(`indexno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_activity_progress` ADD CONSTRAINT `ais_activity_progress_indexno_fkey` FOREIGN KEY (`indexno`) REFERENCES `ais_student`(`indexno`) ON DELETE RESTRICT ON UPDATE CASCADE;
