/*
  Warnings:

  - A unique constraint covering the columns `[user_id,character_id]` on the table `FavoriteCharacter` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Build` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Character` MODIFY `lore` TEXT NULL;

-- AlterTable
ALTER TABLE `Commentary` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Item` MODIFY `description` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `FavoriteCharacter_user_id_character_id_key` ON `FavoriteCharacter`(`user_id`, `character_id`);
