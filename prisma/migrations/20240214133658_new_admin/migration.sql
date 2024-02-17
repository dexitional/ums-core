/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `amount` on the `ams_stage` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `ams_stage` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `ams_stage` table. All the data in the column will be lost.
  - Made the column `formId` on table `ams_stage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ams_stage` DROP FOREIGN KEY `ams_stage_formId_fkey`;

-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NULL,
    MODIFY `exitDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `ams_stage` DROP COLUMN `amount`,
    DROP COLUMN `currency`,
    DROP COLUMN `label`,
    MODIFY `formId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ams_price` (
    `id` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NULL,
    `title` VARCHAR(255) NOT NULL,
    `sellType` INTEGER NULL,
    `currency` ENUM('GHC', 'USD') NOT NULL DEFAULT 'GHC',
    `amount` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ams_price` ADD CONSTRAINT `ams_price_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ams_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ams_stage` ADD CONSTRAINT `ams_stage_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `ams_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
