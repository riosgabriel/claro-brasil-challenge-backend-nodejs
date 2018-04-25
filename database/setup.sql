USE clarodb;

DROP TABLE IF EXISTS USER_DEVICES;
DROP TABLE IF EXISTS USER_DEVICE_CHANGES;

CREATE TABLE USER_DEVICES (
    id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name TEXT,
    model TEXT
);

CREATE TABLE USER_DEVICE_CHANGES (
    id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    last_change TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
