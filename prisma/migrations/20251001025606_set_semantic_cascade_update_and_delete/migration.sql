-- DropForeignKey
ALTER TABLE `environmental_licenses` DROP FOREIGN KEY `environmental_licenses_company_id_fkey`;

-- DropIndex
DROP INDEX `environmental_licenses_company_id_fkey` ON `environmental_licenses`;

-- AddForeignKey
ALTER TABLE `environmental_licenses` ADD CONSTRAINT `environmental_licenses_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
