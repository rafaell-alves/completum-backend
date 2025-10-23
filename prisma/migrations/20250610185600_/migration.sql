/*
  Warnings:

  - You are about to drop the column `build_id` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_BuildAsArmor_FK`;

-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_BuildAsWeapon_FK`;

-- DropIndex
DROP INDEX `Item_BuildAsWeapon_FK` ON `Item`;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `build_id`;

-- CreateTable
CREATE TABLE `BuildItemWeapon` (
    `build_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,

    PRIMARY KEY (`build_id`, `item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_WeaponsBuild` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_WeaponsBuild_AB_unique`(`A`, `B`),
    INDEX `_WeaponsBuild_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BuildItemWeapon` ADD CONSTRAINT `BuildItemWeapon_build_id_fkey` FOREIGN KEY (`build_id`) REFERENCES `Build`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BuildItemWeapon` ADD CONSTRAINT `BuildItemWeapon_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_WeaponsBuild` ADD CONSTRAINT `_WeaponsBuild_A_fkey` FOREIGN KEY (`A`) REFERENCES `Build`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_WeaponsBuild` ADD CONSTRAINT `_WeaponsBuild_B_fkey` FOREIGN KEY (`B`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
