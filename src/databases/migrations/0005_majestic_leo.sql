CREATE TABLE `readlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`book_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `readlist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `statistics` DROP COLUMN `total_overdue`;