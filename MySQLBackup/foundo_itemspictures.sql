-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: foundo-db.cy6ukm76vvwc.ap-south-1.rds.amazonaws.com    Database: foundo
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `itemspictures`
--

DROP TABLE IF EXISTS `itemspictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemspictures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lostItemId` int DEFAULT NULL,
  `foundItemId` int DEFAULT NULL,
  `url` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lostItemId` (`lostItemId`),
  KEY `foundItemId` (`foundItemId`),
  CONSTRAINT `itemspictures_ibfk_1` FOREIGN KEY (`lostItemId`) REFERENCES `items` (`id`),
  CONSTRAINT `itemspictures_ibfk_2` FOREIGN KEY (`foundItemId`) REFERENCES `items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemspictures`
--

LOCK TABLES `itemspictures` WRITE;
/*!40000 ALTER TABLE `itemspictures` DISABLE KEYS */;
INSERT INTO `itemspictures` VALUES (3,2,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/CL9R-id-3.jpeg'),(4,2,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/0YgH-id-4.jpeg'),(5,3,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/nuu1-id-5.jpeg'),(6,3,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/9UE7-id-6.jpeg'),(7,4,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/bF9w-id-7.jpeg'),(8,4,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/1LML-id-8.jpeg'),(9,5,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/YCyj-id-9.jpeg'),(10,5,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/wYIt-id-10.jpeg'),(11,6,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/ageZ-id-11.jpeg'),(12,6,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/A5GP-id-12.jpeg'),(13,NULL,7,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/oqpW-id-13.jpeg'),(14,NULL,7,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/sHSp-id-14.jpeg'),(15,NULL,8,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/9htV-id-15.jpeg'),(16,NULL,8,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/KFs5-id-16.jpeg'),(17,NULL,9,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/v4BP-id-17.jpeg'),(18,NULL,9,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/ZLun-id-18.jpeg'),(19,NULL,10,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/V2yj-id-19.jpeg'),(20,NULL,10,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/tLTS-id-20.webp'),(21,11,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/0AyA-id-21.jpeg'),(22,11,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/cHgd-id-22.jpeg'),(23,12,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/RrM6-id-23.jpeg'),(24,12,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/Es0B-id-24.jpeg'),(25,13,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/mX3s-id-25.jpeg'),(26,13,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/kb1D-id-26.jpeg'),(27,14,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/jfSJ-id-27.jpeg'),(28,14,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/uVhF-id-28.jpeg'),(29,15,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/J59a-id-29.png'),(30,15,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/Dyvh-id-30.png'),(31,16,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/87FG-id-31.jpeg'),(32,16,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/foundItems/KYAx-id-32.jpeg'),(33,17,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/lostItems/N33I-id-17.jpeg'),(34,17,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/lostItems/MNDR-id-17.jpeg'),(35,18,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/lostItems/Ww24-id-18.jpeg'),(36,18,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/lostItems/zoau-id-18.jpeg');
/*!40000 ALTER TABLE `itemspictures` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-11  3:22:03
