ALTER TABLE `borrowings` MODIFY COLUMN `status` enum('borrowed','returned','pending','rejected') DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `borrowings` DROP COLUMN `approval_status`;