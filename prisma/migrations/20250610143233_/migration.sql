/*
  Warnings:

  - You are about to drop the column `character_uuid` on the `Build` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `Build` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Commentary` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `Commentary` table. All the data in the column will be lost.
  - You are about to drop the column `commentaryId` on the `CommentaryLike` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `CommentaryLike` table. All the data in the column will be lost.
  - You are about to drop the column `build_uuid` on the `FavoriteBuild` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `FavoriteBuild` table. All the data in the column will be lost.
  - You are about to drop the column `character_uuid` on the `FavoriteCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `FavoriteCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `buildId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `PostLike` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `PostLike` table. All the data in the column will be lost.
  - Added the required column `character_id` to the `Build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Commentary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Commentary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentary_id` to the `CommentaryLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `CommentaryLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `build_id` to the `FavoriteBuild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `FavoriteBuild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_id` to the `FavoriteCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `FavoriteCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `PostLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `PostLike` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Build` DROP FOREIGN KEY `Build_character_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `Build` DROP FOREIGN KEY `Build_user_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `Commentary` DROP FOREIGN KEY `Commentary_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Commentary` DROP FOREIGN KEY `Commentary_user_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `CommentaryLike` DROP FOREIGN KEY `CommentaryLike_commentaryId_fkey`;

-- DropForeignKey
ALTER TABLE `CommentaryLike` DROP FOREIGN KEY `CommentaryLike_user_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteBuild` DROP FOREIGN KEY `FavoriteBuild_build_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteBuild` DROP FOREIGN KEY `FavoriteBuild_user_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteCharacter` DROP FOREIGN KEY `FavoriteCharacter_character_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteCharacter` DROP FOREIGN KEY `FavoriteCharacter_user_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_BuildAsArmor_FK`;

-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_BuildAsWeapon_FK`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_user_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `PostLike` DROP FOREIGN KEY `PostLike_postId_fkey`;

-- DropForeignKey
ALTER TABLE `PostLike` DROP FOREIGN KEY `PostLike_user_uuid_fkey`;

-- DropIndex
DROP INDEX `Build_character_uuid_fkey` ON `Build`;

-- DropIndex
DROP INDEX `Build_user_uuid_fkey` ON `Build`;

-- DropIndex
DROP INDEX `Commentary_postId_fkey` ON `Commentary`;

-- DropIndex
DROP INDEX `Commentary_user_uuid_fkey` ON `Commentary`;

-- DropIndex
DROP INDEX `CommentaryLike_commentaryId_fkey` ON `CommentaryLike`;

-- DropIndex
DROP INDEX `CommentaryLike_user_uuid_fkey` ON `CommentaryLike`;

-- DropIndex
DROP INDEX `FavoriteBuild_build_uuid_fkey` ON `FavoriteBuild`;

-- DropIndex
DROP INDEX `FavoriteBuild_user_uuid_fkey` ON `FavoriteBuild`;

-- DropIndex
DROP INDEX `FavoriteCharacter_character_uuid_fkey` ON `FavoriteCharacter`;

-- DropIndex
DROP INDEX `FavoriteCharacter_user_uuid_fkey` ON `FavoriteCharacter`;

-- DropIndex
DROP INDEX `Item_BuildAsWeapon_FK` ON `Item`;

-- DropIndex
DROP INDEX `Post_user_uuid_fkey` ON `Post`;

-- DropIndex
DROP INDEX `PostLike_postId_fkey` ON `PostLike`;

-- DropIndex
DROP INDEX `PostLike_user_uuid_fkey` ON `PostLike`;

-- AlterTable
ALTER TABLE `Build` DROP COLUMN `character_uuid`,
    DROP COLUMN `user_uuid`,
    ADD COLUMN `character_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Commentary` DROP COLUMN `postId`,
    DROP COLUMN `user_uuid`,
    ADD COLUMN `post_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CommentaryLike` DROP COLUMN `commentaryId`,
    DROP COLUMN `user_uuid`,
    ADD COLUMN `commentary_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FavoriteBuild` DROP COLUMN `build_uuid`,
    DROP COLUMN `user_uuid`,
    ADD COLUMN `build_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FavoriteCharacter` DROP COLUMN `character_uuid`,
    DROP COLUMN `user_uuid`,
    ADD COLUMN `character_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `buildId`,
    ADD COLUMN `build_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `user_uuid`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PostLike` DROP COLUMN `postId`,
    DROP COLUMN `user_uuid`,
    ADD COLUMN `post_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Build` ADD CONSTRAINT `Build_character_id_fkey` FOREIGN KEY (`character_id`) REFERENCES `Character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Build` ADD CONSTRAINT `Build_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_BuildAsArmor_FK` FOREIGN KEY (`build_id`) REFERENCES `Build`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_BuildAsWeapon_FK` FOREIGN KEY (`build_id`) REFERENCES `Build`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentary` ADD CONSTRAINT `Commentary_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentary` ADD CONSTRAINT `Commentary_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentaryLike` ADD CONSTRAINT `CommentaryLike_commentary_id_fkey` FOREIGN KEY (`commentary_id`) REFERENCES `Commentary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentaryLike` ADD CONSTRAINT `CommentaryLike_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteCharacter` ADD CONSTRAINT `FavoriteCharacter_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteCharacter` ADD CONSTRAINT `FavoriteCharacter_character_id_fkey` FOREIGN KEY (`character_id`) REFERENCES `Character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteBuild` ADD CONSTRAINT `FavoriteBuild_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteBuild` ADD CONSTRAINT `FavoriteBuild_build_id_fkey` FOREIGN KEY (`build_id`) REFERENCES `Build`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
