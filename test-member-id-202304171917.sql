-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: test-member-id
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `award`
--

DROP TABLE IF EXISTS `award`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `award` (
  `id` int NOT NULL AUTO_INCREMENT,
  `award_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `award_type_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_id` varchar(100) NOT NULL,
  `award_price` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `award_description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `award_un` (`award_id`),
  KEY `award_FK` (`user_id`),
  KEY `award_FK_1` (`award_type_id`),
  CONSTRAINT `award_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `award_FK_1` FOREIGN KEY (`award_type_id`) REFERENCES `award_type` (`award_type_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award`
--

LOCK TABLES `award` WRITE;
/*!40000 ALTER TABLE `award` DISABLE KEYS */;
INSERT INTO `award` VALUES (1,'9f695c8e-dbf7-11ed-84a4-04421a2c0a04','5c9b249a-dbf4-11ed-84a4-04421a2c0a04','c6030a4e-dbf2-11ed-84a4-04421a2c0a04',500000,'2023-04-16 08:40:09','2023-04-16 08:40:09','Gift Cards IDR Rp. 500.000'),(2,'b453d1d1-dbf7-11ed-84a4-04421a2c0a04','5c9b249a-dbf4-11ed-84a4-04421a2c0a04','c6030a4e-dbf2-11ed-84a4-04421a2c0a04',200000,'2023-04-16 08:40:44','2023-04-16 08:40:44','Gift Cards IDR Rp. 200.000'),(3,'a43cda23-dbf9-11ed-84a4-04421a2c0a04','928a14d7-dbf9-11ed-84a4-04421a2c0a04','c6030a4e-dbf2-11ed-84a4-04421a2c0a04',125000,'2023-04-16 08:54:36','2023-04-16 08:54:36','Vouchers IDR Rp. 125.000'),(4,'b0757930-dbf9-11ed-84a4-04421a2c0a04','928a14d7-dbf9-11ed-84a4-04421a2c0a04','c6030a4e-dbf2-11ed-84a4-04421a2c0a04',75000,'2023-04-16 08:54:57','2023-04-16 08:54:57','Vouchers IDR Rp. 75.000'),(5,'38fc2eeb-dcfd-11ed-84a4-04421a2c0a04','147b4732-dcfd-11ed-84a4-04421a2c0a04','c6030a4e-dbf2-11ed-84a4-04421a2c0a04',10000,'2023-04-17 15:52:45','2023-04-17 15:52:45','Others IDR Rp 10.000'),(6,'480a91aa-dcfd-11ed-84a4-04421a2c0a04','147b4732-dcfd-11ed-84a4-04421a2c0a04','c6030a4e-dbf2-11ed-84a4-04421a2c0a04',7000,'2023-04-17 15:53:11','2023-04-17 15:53:11','Others IDR Rp. 7.000');
/*!40000 ALTER TABLE `award` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_before_insert_award` BEFORE INSERT ON `award` FOR EACH ROW BEGIN
  IF new.award_id IS NULL THEN
    SET new.award_id = uuid();
  END IF;
 
 set new.createdAt =NOW();
 set new.updatedAt =NOW();
 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `award_type`
--

DROP TABLE IF EXISTS `award_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `award_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `award_type_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `award_type_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `award_type_un` (`award_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award_type`
--

LOCK TABLES `award_type` WRITE;
/*!40000 ALTER TABLE `award_type` DISABLE KEYS */;
INSERT INTO `award_type` VALUES (1,'5c9b249a-dbf4-11ed-84a4-04421a2c0a04','Products','2023-04-16 08:16:49','2023-04-16 08:16:49'),(2,'928a14d7-dbf9-11ed-84a4-04421a2c0a04','Vouchers','2023-04-16 08:54:07','2023-04-16 08:54:07'),(3,'147b4732-dcfd-11ed-84a4-04421a2c0a04','Others','2023-04-17 15:51:44','2023-04-17 15:51:44');
/*!40000 ALTER TABLE `award_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_before_insert_award_type` BEFORE INSERT ON `award_type` FOR EACH ROW BEGIN
  IF new.award_type_id IS NULL THEN
    SET new.award_type_id = uuid();
  END IF;
 
 set new.createdAt =NOW();
 set new.updatedAt =NOW();
 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_un` (`user_id`),
  UNIQUE KEY `user_un_1` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'c6030a4e-dbf2-11ed-84a4-04421a2c0a04','user1@member.id','2023-04-16 08:05:26','2023-04-16 08:05:26'),(2,'f0d27ad0-dcbb-11ed-84a4-04421a2c0a04','user2@member.id','2023-04-17 08:05:27','2023-04-17 08:05:27');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_before_insert_user` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
  IF new.user_id IS NULL THEN
    SET new.user_id = uuid();
  END IF;
 
 set new.createdAt =NOW();
 set new.updatedAt =NOW();
 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'test-member-id'
--

--
-- Dumping routines for database 'test-member-id'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-17 19:17:20
