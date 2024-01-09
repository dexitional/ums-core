/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- CreateTable
CREATE TABLE `sso_support` (
    `supportNo` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(255) NOT NULL,
    `mname` VARCHAR(350) NULL,
    `lname` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(350) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`supportNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
