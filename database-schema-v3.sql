-- Update users table to add role column
ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user' AFTER password;

-- Insert admin user (password is 'admin123' hashed with bcrypt)
INSERT INTO users (name, email, password, role) 
VALUES ('Admin User', 'admin@example.com', '$2a$10$XFE/UzKIIZ/Jl6kGQxfLJeVeQQmIRsV5oGARpXKBdWL0/fKFj3pLi', 'admin');

