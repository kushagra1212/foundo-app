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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(35) NOT NULL,
  `password` longtext,
  `phoneNo` varchar(20) DEFAULT NULL,
  `countryCode` varchar(10) DEFAULT NULL,
  `profilePhoto` longtext,
  `address` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `otp` int NOT NULL DEFAULT '0',
  `is_verified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Kushagra','Rathore','kushagrarathore002@gmail.com','$2b$10$/c4ZhKZOK5tw7/LJJHUNAOcxUqzdIck9DB30NDsfCgxb7KbttN/7m','+919764811688',NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/profilePhoto/3UFK-id-1.png','451001, Shahpura, Madhya Pradesh, India','2023-01-19 14:32:29',0,1),(2,'John','Doe','Johndoe@example.com','$2b$10$6YQ5vbqdqst90WGfAoHBKudwJjmpLX7fg6jE3543ONfkk2.N9q4y6',NULL,NULL,NULL,NULL,'2023-01-20 13:29:01',0,0),(3,'Jane','Smith','Janesmith@example.com','$2b$10$yNivmoCzu04RwEpXhYa7M.aXIJXSTADb5u9f49Au06LHgIXfil.ba',NULL,NULL,NULL,NULL,'2023-01-20 13:29:26',0,0),(4,'Rohan','Sharma','rohansharma@gmail.com','$2b$10$dBsu4RyU6/X8it8vxYeZe.GFe2VtPgZlLPcc1/glem6ixm1OdGRBO',NULL,NULL,'https://foundo-s3.s3.ap-south-1.amazonaws.com/image/tGQp-user-id-4.jpeg','453331, Indore, Indore Division, Madhya Pradesh, India','2023-01-20 13:32:47',0,0),(5,'Priya','Gupta','priyagupta@gmail.com','$2b$10$tNSU/6ucY790.hVf1r0csOj.wcIFP2X.KN4kzjXq5fFpaJEmJgkqO',NULL,NULL,NULL,NULL,'2023-01-20 13:33:19',0,0),(6,'Anjali','Rao','anjalirao@gamil.com','$2b$10$B/a1KuXVwEOfyqiPMPlvbOvhlB/OKJUBgr2bCv9p4XuQ0GxgreZ5W',NULL,NULL,NULL,NULL,'2023-01-20 13:34:01',0,0),(7,'Vikram','Kumar','vikramkumar@gmail.com','$2b$10$VHSiZIBTjDztYx9J2ZAGSOCx27iPnpkjxjkSSbTgeDtvCT1jDYlCq',NULL,NULL,NULL,NULL,'2023-01-20 13:34:22',0,0),(8,'Sachin','Mishra','sachinmishra@gmail.com','$2b$10$6df/5kxL5b4fVI2V2fiITeI2PkcujEvkTitO89cK49/gJYbsBjzly',NULL,NULL,NULL,NULL,'2023-01-20 13:34:56',0,0),(9,'Sonal','Chauhan','sonalchauhan@gmail.com','$2b$10$WTMiFyIrLIXsNTSlVF4mK.rHz97FBK.NADpePCnJnPsBNqXzJHUlu',NULL,NULL,NULL,NULL,'2023-01-20 13:35:23',0,0),(10,'Rajesh','Verma','rajeshverma@gmail.com','$2b$10$mLKwdO4aR4BSC1YnpHPA8OdUMBENhwXyuDJKRLrB32ERQ7m.GabSC',NULL,NULL,NULL,NULL,'2023-01-20 13:35:40',0,0),(11,'Nidhi','Patel','nidhipatel@gmail.com','$2b$10$tbtqvT/v5vtSXgy.rhTWrescTGpCOwUjLO.9HgScpqu7YcZcziYay',NULL,NULL,NULL,NULL,'2023-01-20 13:36:09',0,0),(12,'Aditya','Jain','adityajain@gmail.com','$2b$10$1UsXTnBEsCacrC/zRBFDGuVHPlMnm9Tv/F/0yjXV7cG.RjLaBXyxq',NULL,NULL,NULL,NULL,'2023-01-20 13:36:43',0,0),(13,'Neha','Goyal','nehagoyal@gmail.com','$2b$10$2OuQBut0A7ItIK9OzbiziO8GQf.SZwfSpSSS74FZKkprD.g5xhjjG',NULL,NULL,NULL,NULL,'2023-01-20 13:37:03',0,0),(14,'Mittu','R','mitalee23@gmail.com','$2b$10$VPefWIkYkUVJST7Lo2ViY.mRLz.mW345/koZPkQCtajoRKBp6DDYO',NULL,NULL,NULL,NULL,'2023-04-14 18:00:05',0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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

-- Dump completed on 2023-08-11  3:22:09
