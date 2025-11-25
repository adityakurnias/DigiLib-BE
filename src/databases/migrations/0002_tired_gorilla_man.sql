ALTER TABLE `borrowings` MODIFY COLUMN `borrow_date` date;--> statement-breakpoint
ALTER TABLE `borrowings` MODIFY COLUMN `due_date` date;--> statement-breakpoint
ALTER TABLE `borrowings` MODIFY COLUMN `status` enum('borrowed','returned') DEFAULT 'borrowed';--> statement-breakpoint
ALTER TABLE `borrowings` MODIFY COLUMN `processed_by` int;--> statement-breakpoint
ALTER TABLE `borrowings` ADD `approval_status` enum('pending','approved','rejected') DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `borrowings` ADD `approved_by` int;--> statement-breakpoint
ALTER TABLE `borrowings` ADD `rejected_reason` text;