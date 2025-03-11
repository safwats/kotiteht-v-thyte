-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;

USE HealthDiary;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) DEFAULT 'regular'
);

CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_Pvm DATE NOT NULL,
    Fiilis VARCHAR(50),
    Paino DECIMAL(5,2),
    Uni_tuntia INT,
    Huomio TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Medications (
    medication_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert sample data

INSERT INTO Users (username, password, email, created_at, user_level) VALUES
('johndoe', 'hashed_password', 'johndoe@example.com', '2024-01-01 09:00:00', 'regular'),
('janedoe', 'hashed_password', 'janedoe@example.com', '2024-01-02 10:00:00', 'admin'),
('alice_jones', 'hashed_password', 'alice@example.com', '2024-01-04 08:30:00', 'regular'),
('bob_brown', 'hashed_password', 'bob@example.com', '2024-01-05 07:45:00', 'regular');

INSERT INTO DiaryEntries (user_id, entry_Pvm, Fiilis, Paino, Uni_tuntia, Huomio, created_at) VALUES
(1, '2024-01-10', 'Iloinen', 70.5, 8, 'Mahtava treeni oli', '2024-01-10 20:00:00'),
(2, '2024-01-11', 'Chilli', 65.0, 7, 'Tapasin kaveri, oli hauskaa', '2024-01-11 21:00:00'),
(3, '2024-01-12', 'Poikki', 68.0, 6, 'Iso urakka, energia pois ', '2024-01-12 22:00:00'),
(4, '2024-01-13', 'Energinen', 55.0, 9, 'Aamulenkki tehty', '2024-01-13 18:00:00'),
(4, '2024-01-14', 'Rento', 75.0, 8, 'Kirjat vei ajan mutta oli kiva, tuli hieno fiilis', '2024-01-14 19:00:00');

INSERT INTO Medications (user_id, name, dosage, frequency, start_date, end_date) VALUES
(1, 'Vitamin D', '1000 IU', 'Daily', '2024-01-01', '2024-06-01'),
(2, 'Ibuprofen', '200 mg', 'As needed', '2024-01-05', '2024-01-20'),
(2, 'Amoxicillin', '500 mg', 'Every 8 hours', '2024-01-10', '2024-01-20'),
(4, 'Metformin', '500 mg', 'Twice a day', '2024-01-15', '2024-07-15'),
(2, 'Lisinopril', '10 mg', 'Daily', '2024-01-20', '2024-07-20');

--
INSERT INTO Users (username, password, email) VALUES
('johndoe2', 'hashed_password2', 'johndoe2@example.com');