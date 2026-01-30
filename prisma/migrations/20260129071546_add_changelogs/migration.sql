-- CreateTable
CREATE TABLE `changelogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `version` VARCHAR(50) NOT NULL,
    `releaseDate` DATETIME(3) NULL,
    `isUpcoming` BOOLEAN NOT NULL DEFAULT false,
    `expectedDate` VARCHAR(50) NULL,
    `tag` VARCHAR(50) NULL,
    `features` JSON NOT NULL,
    `fixes` JSON NOT NULL,
    `improvements` JSON NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `changelogs_version_key`(`version`),
    INDEX `changelogs_isUpcoming_idx`(`isUpcoming`),
    INDEX `changelogs_isPublished_idx`(`isPublished`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
