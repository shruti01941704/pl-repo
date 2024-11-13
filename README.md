Go create template under that views add hbs files
in public directory all photos and images
in src app.js file and under src folder create db folder add db.js there
CREATE DATABASE eshop;

USE eshop;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

select * from users;
