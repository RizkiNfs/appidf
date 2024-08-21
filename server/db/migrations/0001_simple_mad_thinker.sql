CREATE TABLE `docs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`created_time` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_time` integer DEFAULT (CURRENT_TIMESTAMP),
	`owner` text NOT NULL,
	`schema` text NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action
);
