-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2022 at 06:23 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdatasoft`
--

-- --------------------------------------------------------

--
-- Table structure for table `fileupload`
--

CREATE TABLE `fileupload` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fileupload`
--

INSERT INTO `fileupload` (`id`, `name`) VALUES
(7, '2022551654-harleyFull.jpg'),
(12, '2022551830-bp2.jpg'),
(13, '2022551834-8888888888888888888.png'),
(14, '2022551834-blackpink-white.jpg'),
(15, '2022551834-bag-blackpink.jpg'),
(18, '2022551834-image_c_by_blackpinkthailand.jpg'),
(19, '202256118-jump.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

CREATE TABLE `sale` (
  `docno` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `IDcode` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amt` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sale`
--

INSERT INTO `sale` (`docno`, `date`, `time`, `IDcode`, `name`, `amt`) VALUES
('1-2022-5-4', '2022-05-04', '17:51:00', 'c3bbd29b-1e0a-4141-a', 'ดินสอเขียน', 135),
('2-2022-5-4', '2022-05-04', '21:37:00', '8b1e962c-ce5b-45eb-a', 'น้ำเขียว', 150),
('3-2022-5-4', '2022-05-04', '21:38:00', 'a8735a74-a848-47c9-8', 'ยาดม', 15),
('4-2022-5-4', '2022-05-04', '21:42:00', 'a8735a74-a848-47c9-8', 'ยาดม', 15),
('5-2022-5-4', '2022-05-04', '21:48:00', 'a8735a74-a848-47c9-8', 'ยาดม', 10),
('6-2022-5-4', '2022-05-04', '21:48:00', 'aa9a74bd-af97-4003-8', 'ขนม', 50),
('7-2022-5-6', '2022-05-06', '11:19:00', '5b623bf7-d8ee-4640-b', 'ยาแก้ปวด', 50),
('8-2022-5-6', '2022-05-06', '11:20:00', '5b623bf7-d8ee-4640-b', 'ยาแก้ปวด', 25);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `IDcode` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amt` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`IDcode`, `name`, `amt`) VALUES
('093776cc-6b4c-4038-a', 'โต๊ะ', 200),
('2d582269-4125-4769-b', 'ทีวี', 100),
('463cc5a9-e033-41be-a', 'พัดลม', 100),
('5b623bf7-d8ee-4640-b', 'ยาแก้ปวด', 325),
('8b1e962c-ce5b-45eb-a', 'น้ำเขียว', 200),
('8e830116-36f9-40c2-9', 'เก้าอี้', 200),
('a8735a74-a848-47c9-8', 'ยาดม', 160),
('aa9a74bd-af97-4003-8', 'ขนม', 150),
('c3bbd29b-1e0a-4141-a', 'ดินสอเขียน', 115);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fileupload`
--
ALTER TABLE `fileupload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`docno`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`IDcode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fileupload`
--
ALTER TABLE `fileupload`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
