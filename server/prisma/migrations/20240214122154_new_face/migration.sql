/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `type` on the `ams_stage` table. All the data in the column will be lost.
  - You are about to drop the `ams_price` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `ams_stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `ams_stage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ams_price` DROP FOREIGN KEY `ams_price_categoryId_fkey`;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `ams_stage` DROP COLUMN `type`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `currency` ENUM('GHC', 'USD') NOT NULL DEFAULT 'GHC',
    ADD COLUMN `label` VARCHAR(350) NOT NULL,
    ADD COLUMN `sellType` INTEGER NULL;

-- DropTable
DROP TABLE `ams_price`;
