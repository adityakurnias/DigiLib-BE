ALTER TABLE `library_statistics` ADD `borrow_count` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `library_statistics` ADD `return_count` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `library_statistics` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `library_statistics` DROP COLUMN `borrowed_count`;--> statement-breakpoint
ALTER TABLE `library_statistics` DROP COLUMN `returned_count`;--> statement-breakpoint
ALTER TABLE `library_statistics` DROP COLUMN `active_users`;--> statement-breakpoint
ALTER TABLE `library_statistics` DROP COLUMN `total_books`;