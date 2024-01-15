/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `ais_resit` DROP FOREIGN KEY `ais_resit_registerSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `ais_resit` DROP FOREIGN KEY `ais_resit_resitSessionId_fkey`;

-- AlterTable
ALTER TABLE `ais_resit` MODIFY `resitSessionId` VARCHAR(191) NULL,
    MODIFY `registerSessionId` VARCHAR(191) NULL,
    MODIFY `approveScore` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `taken` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `paid` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `ais_resit` ADD CONSTRAINT `ais_resit_resitSessionId_fkey` FOREIGN KEY (`resitSessionId`) REFERENCES `ais_resession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ais_resit` ADD CONSTRAINT `ais_resit_registerSessionId_fkey` FOREIGN KEY (`registerSessionId`) REFERENCES `ais_session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
