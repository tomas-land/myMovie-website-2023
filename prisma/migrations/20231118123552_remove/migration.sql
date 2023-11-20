/*
  Warnings:

  - You are about to drop the column `contentType` on the `favorite` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Account_userId_fkey` ON `account`;

-- DropIndex
DROP INDEX `Session_userId_fkey` ON `session`;

-- AlterTable
ALTER TABLE `favorite` DROP COLUMN `contentType`;
