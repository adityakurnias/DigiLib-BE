CREATE TABLE `book_uploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`book_id` int NOT NULL,
	`uploaded_by` int NOT NULL,
	`file_type` varchar(50),
	`upload_date` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `book_uploads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`author` varchar(255) NOT NULL,
	`publisher` varchar(255),
	`isbn` varchar(20),
	`year` int,
	`stock` int NOT NULL DEFAULT 0,
	`available` int NOT NULL DEFAULT 0,
	`description` text,
	`cover_image` varchar(255),
	`uploaded_by` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `books_id` PRIMARY KEY(`id`),
	CONSTRAINT `books_isbn_unique` UNIQUE(`isbn`)
);
--> statement-breakpoint
CREATE TABLE `borrowings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`book_id` int NOT NULL,
	`borrow_date` date NOT NULL,
	`due_date` date NOT NULL,
	`return_date` date,
	`status` enum('borrowed','returned','overdue') NOT NULL DEFAULT 'borrowed',
	`processed_by` int NOT NULL,
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `borrowings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(500),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `statistics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`book_id` int NOT NULL,
	`total_borrowed` int NOT NULL DEFAULT 0,
	`total_returned` int NOT NULL DEFAULT 0,
	`total_overdue` int NOT NULL DEFAULT 0,
	`last_borrow_date` date,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `statistics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','librarian','admin') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;