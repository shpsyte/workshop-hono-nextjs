CREATE TABLE `quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
