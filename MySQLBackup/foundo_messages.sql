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
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `senderId` int DEFAULT NULL,
  `receiverId` int DEFAULT NULL,
  `title` text,
  `message` text,
  `isFound` int NOT NULL,
  `isPhoneNoShared` int DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,4,4,'Hxmsksss','Mdmsmssksiwnen',1,1,'2023-01-20 16:30:57'),(2,4,8,'I found some thing you know','Lolllll ?? Chinese ',0,0,'2023-01-20 17:00:10'),(3,1,4,'Lolos','Sndkdkdodndne',0,0,'2023-01-20 17:00:52'),(4,1,3,'Sjsiso','Sisisososomx',1,1,'2023-01-26 19:24:07'),(5,1,4,'Snskskdndid','Xhdjwiekdnccndj',1,1,'2023-01-26 19:24:57'),(6,1,4,'Sjsiwoskdn','Dnsjskdkskdmxnndjdksk',1,0,'2023-01-26 19:41:16'),(7,4,1,'Jwkss','Dkssksksdnbd ddhdk',1,0,'2023-01-26 19:42:59'),(8,4,1,'Sjsisisi','Sjsisoseke',1,0,'2023-01-26 20:50:15'),(9,4,1,'Nznzkssksm','Zmmzkzsmskdmd',1,0,'2023-01-26 20:51:13'),(10,4,4,'Bssmskslsl','Nxskkskssos',1,1,'2023-01-26 20:56:48'),(12,1,7,'Found Sunglasses ','I wanted to let you know that I found a pair of sunglasses and I believe they belong to you ',1,1,'2023-02-08 19:50:19'),(13,1,7,'Sjjssks','Ssjsjskskdnddjendjdidn',1,1,'2023-03-08 16:34:40');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
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

-- Dump completed on 2023-08-11  3:22:06
