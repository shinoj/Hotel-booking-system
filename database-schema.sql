-- Create database
CREATE DATABASE IF NOT EXISTS hotel_booking;
USE hotel_booking;

-- Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(3, 1) NOT NULL,
  image VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  hotel_id INT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  guests INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

-- Insert sample hotels
INSERT INTO hotels (name, location, description, price, rating, image, featured) VALUES
('Grand Plaza Hotel', 'New York, NY', 'Experience luxury in the heart of Manhattan with stunning views of the city skyline. Our 5-star hotel offers spacious rooms, a rooftop pool, and world-class dining options.', 299.00, 4.8, '/placeholder.svg?height=300&width=500&text=Grand+Plaza', TRUE),
('Oceanview Resort', 'Miami, FL', 'Relax in our beachfront resort with direct access to pristine white sand beaches. Enjoy our spa, multiple pools, and oceanfront dining experiences.', 349.00, 4.7, '/placeholder.svg?height=300&width=500&text=Oceanview', FALSE),
('Mountain Retreat Lodge', 'Aspen, CO', 'Nestled in the mountains, our lodge offers cozy accommodations with breathtaking views. Perfect for ski trips or summer hiking adventures.', 249.00, 4.6, '/placeholder.svg?height=300&width=500&text=Mountain+Lodge', FALSE),
('City Center Suites', 'Chicago, IL', 'Modern suites in downtown Chicago, walking distance to major attractions, shopping, and dining. Each suite includes a kitchenette and living area.', 199.00, 4.5, '/placeholder.svg?height=300&width=500&text=City+Center', TRUE),
('Historic Boutique Hotel', 'Boston, MA', 'A charming boutique hotel in a restored historic building. Unique rooms, personalized service, and a central location make this a perfect choice.', 229.00, 4.7, '/placeholder.svg?height=300&width=500&text=Historic+Hotel', FALSE),
('Desert Oasis Resort', 'Phoenix, AZ', 'A luxurious desert retreat featuring multiple pools, golf courses, and spa treatments. Enjoy stunning sunset views and southwestern cuisine.', 279.00, 4.6, '/placeholder.svg?height=300&width=500&text=Desert+Oasis', FALSE);

