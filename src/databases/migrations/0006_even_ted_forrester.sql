CREATE TABLE `library_statistics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stat_date` date NOT NULL,
	`borrowed_count` int NOT NULL DEFAULT 0,
	`returned_count` int NOT NULL DEFAULT 0,
	`active_users` int NOT NULL DEFAULT 0,
	`total_books` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `library_statistics_id` PRIMARY KEY(`id`)
);
