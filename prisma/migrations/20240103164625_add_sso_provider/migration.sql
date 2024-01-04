/*
  Warnings:

  - You are about to alter the column `entryDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exitDate` on the `ais_student` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `ais_student` MODIFY `entryDate` DATETIME NOT NULL,
    MODIFY `exitDate` DATETIME NULL;

-- CreateTable
CREATE TABLE `sso_provider` (
    `providerId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `accountType` ENUM('LINKEDIN', 'GOOGLE', 'CREDENTIAL', 'PIN') NOT NULL,
    `accountId` VARCHAR(191) NULL,
    `accountSecret` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`providerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_appToprovider` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_appToprovider_AB_unique`(`A`, `B`),
    INDEX `_appToprovider_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sso_provider` ADD CONSTRAINT `sso_provider_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `sso_user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_appToprovider` ADD CONSTRAINT `_appToprovider_A_fkey` FOREIGN KEY (`A`) REFERENCES `sso_app`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_appToprovider` ADD CONSTRAINT `_appToprovider_B_fkey` FOREIGN KEY (`B`) REFERENCES `sso_provider`(`providerId`) ON DELETE CASCADE ON UPDATE CASCADE;
