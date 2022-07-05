CREATE TABLE sys.`user` (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	`role` varchar(100) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb3
COLLATE=utf8mb3_general_ci;