-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: shoes
-- ------------------------------------------------------
-- Server version	8.0.32

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

--
-- Table structure for table `catogory`
--

DROP TABLE IF EXISTS `catogory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catogory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` longtext,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catogory`
--

LOCK TABLES `catogory` WRITE;
/*!40000 ALTER TABLE `catogory` DISABLE KEYS */;
INSERT INTO `catogory` VALUES (1,'Urbas','Urbas'),(2,'Basas','Basas'),(3,'Vintas','Vintas'),(4,'demo demo','demo222');
/*!40000 ALTER TABLE `catogory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `users_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhnaqj709m7d4g1vmqr8blc6d1` (`users_id`),
  CONSTRAINT `FKhnaqj709m7d4g1vmqr8blc6d1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (2,'hcm city','https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1622470096048-avatar.png','nguyen','huynh','0939776570',2),(3,'Quan 3, TPHCM','https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1622470096048-avatar.png','phong','nguyen','0909988810',4),(4,'Quan 7 HCM','https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1622470096048-avatar.png','khach','hang','0987654321',5),(5,'man thien, q9, hcm','https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1622470096048-avatar.png','detttt','motttt','0987654321',6),(6,'Man Thien, Q9, HCM','https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1622470096048-avatar.png','dedede','momomo','0987663532',7),(7,'Man Thien, Q9, HCM','https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1622470096048-avatar.png','dedede','momomo','0987765432',8);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `id` varchar(255) NOT NULL,
  `deadline` datetime NOT NULL,
  `percent` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` VALUES ('0606','2023-06-14 03:51:00',30),('demo','2023-07-01 06:24:00',50),('TET','2023-04-05 15:19:00',20);
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `productid` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4pw6o9gyseypangjr47ge5og6` (`productid`),
  CONSTRAINT `FK4pw6o9gyseypangjr47ge5og6` FOREIGN KEY (`productid`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680235834536-Pro_AV00174_1.jpeg',1),(2,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680235845391-Pro_AV00174_3.jpeg',1),(3,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680235877282-Pro_AV00174_4.jpeg',1),(4,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680235906148-Pro_AV00174_2.jpeg',1),(5,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680235917263-Pro_AV00174_5.jpeg',1),(6,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680236098291-Pro_AV00174_1.jpeg',2),(7,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680236109098-Pro_AV00174_2.jpeg',2),(8,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680238014134-Pro_AV00174_1.jpeg',3),(9,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680240901862-Pro_AV00174_2.jpeg',4),(10,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680241661675-pro_AV00146_1.jpg',5),(11,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680241670214-pro_AV00146_2.jpg',5),(12,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680241677331-Pro_AV00146_3.jpg',5),(13,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680241687876-pro_AV00146_4.jpg',5),(14,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680241698096-pro_AV00146_5.jpg',5),(15,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680245722407-Pro_AV00077_1.jpg',6),(16,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680254306600-Pro_AV00174_5.jpeg',7),(17,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680254752558-Pro_AV00174_5.jpeg',8),(18,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680255116200-Pro_AV00174_5.jpeg',9),(19,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680271361183-Pro_AV00077_1.jpg',10),(20,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680271573418-Pro_AV00077_1.jpg',11),(21,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680271622462-pro_AV00146_4.jpg',12),(22,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680271728414-Pro_AV00174_5.jpeg',13),(23,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680271790222-pro_AV00146_1.jpg',14),(24,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680272285196-pro_AV00146_4.jpg',15),(25,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680273786613-Pro_AV00077_1.jpg',16),(26,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680278128210-Pro_AV00146_3.jpg',17),(27,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680278503964-Pro_AV00174_1.jpeg',18),(28,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680311801590-Pro_AV00192_1.jpg',19),(29,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1680311809122-Pro_AV00192_3.jpg',19),(30,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1685981981937-4.jpg',20),(31,'https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1685982080699-3.jpg',21);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `productdetailid` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfxkmvpbfxqect54pd7slj4ll9` (`order_id`),
  KEY `FKemb0u1fj8a133xi73schcv8m4` (`productdetailid`),
  CONSTRAINT `FKemb0u1fj8a133xi73schcv8m4` FOREIGN KEY (`productdetailid`) REFERENCES `productdetail` (`id`),
  CONSTRAINT `FKfxkmvpbfxqect54pd7slj4ll9` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orderdetail_chk_1` CHECK ((`quantity` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (1,780000,1,'kh41680277003632',1),(2,2340000,3,'kh41680277080440',1),(3,3120000,4,'kh41680277270336',1),(4,780000,1,'kh41680278605795',1),(5,650000,1,'kh41680312854876',200),(6,650000,1,'kh41680312854876',201),(7,650000,1,'kh41680314295382',200),(8,650000,1,'kh41685886746946',44),(9,650000,1,'kh41685978601078',200),(10,455000,1,'kh41685980601399',44),(11,5915000,13,'kh41685981554499',44),(12,5000050,10,'kh41685982563601',214),(13,910000,2,'de61685982864384',44);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total` float NOT NULL,
  `customer_id` bigint DEFAULT NULL,
  `payment_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpxtb8awmi0dk6smoh2vp1litg` (`customer_id`),
  KEY `FKag8ppnkjvx255gj7lm3m18wkj` (`payment_id`),
  CONSTRAINT `FKag8ppnkjvx255gj7lm3m18wkj` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`),
  CONSTRAINT `FKpxtb8awmi0dk6smoh2vp1litg` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('de61685982864384','Man Thien, Q9, HCM',NULL,'2023-06-05 23:34:24','demo@gmail.com','dedede','admin@gmail.com','2023-06-05 23:34:47','0987663532','DELIVERING',910000,6,34),('kh41680277003632','Quan 7 HCM',NULL,'2023-03-31 22:36:44','khachhang@gmail.com','khach','admin@gmail.com','2023-03-31 22:44:28','0987654321','CANCEL',780000,4,NULL),('kh41680277080440','Quan 7 HCM',NULL,'2023-03-31 22:38:00','khachhang@gmail.com','khach','admin@gmail.com','2023-03-31 22:46:44','0987654321','DELIVERED',2340000,4,NULL),('kh41680277270336','Quan 7 HCM',NULL,'2023-03-31 22:41:10','khachhang@gmail.com','khach','admin@gmail.com','2023-03-31 22:42:14','0987654321','DELIVERING',3120000,4,NULL),('kh41680278605795','Quan 7 HCM',NULL,'2023-03-31 23:03:26','khachhang@gmail.com','khach','admin@gmail.com','2023-03-31 23:04:14','0987654321','DELIVERED',780000,4,26),('kh41680312854876','Quan 7 HCM',NULL,'2023-04-01 08:34:15','khachhang@gmail.com','khach','admin@gmail.com','2023-04-01 09:03:18','0987654321','CANCEL',1300000,4,27),('kh41680314295382','Quan 7 HCM',NULL,'2023-04-01 08:58:15','khachhang@gmail.com','khach','admin@gmail.com','2023-04-01 08:58:54','0987654321','DELIVERED',650000,4,28),('kh41685886746946','Quan 7 HCM',NULL,'2023-06-04 20:52:27','khachhang@gmail.com','khach','khachhang@gmail.com','2023-06-05 23:12:49','0987654321','CANCEL',650000,4,29),('kh41685978601078','Quan 7 HCM',NULL,'2023-06-05 22:23:21','khachhang@gmail.com','khach',NULL,NULL,'0987654321','UNCONFIRM',650000,4,30),('kh41685980601399','Quan 7 HCM',NULL,'2023-06-05 22:56:41','khachhang@gmail.com','khach','admin@gmail.com','2023-06-05 23:32:00','0987654321','CANCEL',455000,4,31),('kh41685981554499','Quan 7 HCM',NULL,'2023-06-05 23:12:34','khachhang@gmail.com','khach','khachhang@gmail.com','2023-06-05 23:12:43','0987654321','CANCEL',5915000,4,32),('kh41685982563601','Quan 7 HCM',NULL,'2023-06-05 23:29:24','khachhang@gmail.com','khach','admin@gmail.com','2023-06-05 23:31:49','0987654321','DELIVERED',5000050,4,33);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (26,'SHIPCOD',NULL),(27,'SHIPCOD',NULL),(28,'SHIPCOD',NULL),(29,'SHIPCOD',NULL),(30,'SHIPCOD',NULL),(31,'SHIPCOD',NULL),(32,'SHIPCOD',NULL),(33,'SHIPCOD',NULL),(34,'SHIPCOD',NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productdetail`
--

DROP TABLE IF EXISTS `productdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productdetail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `inventory` bigint NOT NULL,
  `size` int NOT NULL,
  `productid` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKka10kh3nxxciojyl1x7x7xbmm` (`productid`),
  CONSTRAINT `FKka10kh3nxxciojyl1x7x7xbmm` FOREIGN KEY (`productid`) REFERENCES `products` (`id`),
  CONSTRAINT `productdetail_chk_1` CHECK ((`inventory` >= 0)),
  CONSTRAINT `productdetail_chk_2` CHECK ((`size` >= 35))
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productdetail`
--

LOCK TABLES `productdetail` WRITE;
/*!40000 ALTER TABLE `productdetail` DISABLE KEYS */;
INSERT INTO `productdetail` VALUES (1,10,35,1),(2,0,36,1),(3,20,37,1),(4,0,38,1),(5,0,39,1),(6,0,40,1),(7,0,41,1),(8,0,42,1),(9,0,43,1),(10,0,44,1),(11,0,45,1),(12,1,36,2),(13,0,37,2),(14,0,38,2),(15,0,39,2),(16,0,40,2),(17,0,41,2),(18,0,42,2),(19,0,43,2),(20,0,44,2),(21,0,45,2),(22,0,35,3),(23,0,36,3),(24,0,37,3),(25,0,38,3),(26,0,39,3),(27,0,40,3),(28,0,41,3),(29,0,42,3),(30,0,43,3),(31,0,44,3),(32,0,45,3),(33,0,35,4),(34,0,36,4),(35,0,37,4),(36,0,38,4),(37,0,39,4),(38,0,40,4),(39,0,41,4),(40,0,42,4),(41,0,43,4),(42,0,44,4),(43,0,45,4),(44,18,35,5),(45,0,36,5),(46,0,37,5),(47,0,38,5),(48,0,39,5),(49,0,40,5),(50,0,41,5),(51,0,42,5),(52,50,43,5),(53,0,44,5),(54,0,45,5),(55,0,35,2),(56,0,35,2),(57,0,35,6),(58,0,36,6),(59,0,37,6),(60,0,38,6),(61,0,39,6),(62,0,40,6),(63,0,41,6),(64,0,42,6),(65,0,43,6),(66,0,44,6),(67,0,45,6),(68,100,35,7),(69,0,36,7),(70,0,37,7),(71,0,38,7),(72,0,39,7),(73,0,40,7),(74,0,41,7),(75,0,42,7),(76,0,43,7),(77,0,44,7),(78,0,45,7),(79,0,35,8),(80,0,36,8),(81,0,37,8),(82,0,38,8),(83,0,39,8),(84,0,40,8),(85,0,41,8),(86,0,42,8),(87,0,43,8),(88,0,44,8),(89,0,45,8),(90,0,35,9),(91,0,36,9),(92,0,37,9),(93,0,38,9),(94,0,39,9),(95,0,40,9),(96,0,41,9),(97,0,42,9),(98,0,43,9),(99,0,44,9),(100,0,45,9),(101,0,35,10),(102,0,36,10),(103,0,37,10),(104,0,38,10),(105,0,39,10),(106,0,40,10),(107,0,41,10),(108,0,42,10),(109,0,43,10),(110,0,44,10),(111,0,45,10),(112,0,35,11),(113,0,36,11),(114,0,37,11),(115,0,38,11),(116,0,39,11),(117,0,40,11),(118,0,41,11),(119,0,42,11),(120,0,43,11),(121,0,44,11),(122,0,45,11),(123,0,35,12),(124,0,36,12),(125,0,37,12),(126,0,38,12),(127,0,39,12),(128,0,40,12),(129,0,41,12),(130,0,42,12),(131,0,43,12),(132,0,44,12),(133,0,45,12),(134,0,35,13),(135,0,36,13),(136,0,37,13),(137,0,38,13),(138,0,39,13),(139,0,40,13),(140,0,41,13),(141,0,42,13),(142,0,43,13),(143,0,44,13),(144,0,45,13),(145,0,35,14),(146,0,36,14),(147,0,37,14),(148,0,38,14),(149,0,39,14),(150,0,40,14),(151,0,41,14),(152,0,42,14),(153,0,43,14),(154,0,44,14),(155,0,45,14),(156,0,35,15),(157,0,36,15),(158,0,37,15),(159,0,38,15),(160,0,39,15),(161,0,40,15),(162,0,41,15),(163,0,42,15),(164,0,43,15),(165,0,44,15),(166,0,45,15),(167,0,35,16),(168,0,36,16),(169,0,37,16),(170,0,38,16),(171,0,39,16),(172,0,40,16),(173,0,41,16),(174,0,42,16),(175,0,43,16),(176,0,44,16),(177,0,45,16),(178,0,35,17),(179,0,36,17),(180,0,37,17),(181,0,38,17),(182,0,39,17),(183,0,40,17),(184,0,41,17),(185,0,42,17),(186,0,43,17),(187,0,44,17),(188,0,45,17),(189,0,35,18),(190,0,36,18),(191,0,37,18),(192,0,38,18),(193,0,39,18),(194,0,40,18),(195,0,41,18),(196,0,42,18),(197,0,43,18),(198,0,44,18),(199,0,45,18),(200,8,36,19),(201,20,39,19),(202,0,43,19),(203,0,35,20),(204,0,36,20),(205,0,37,20),(206,0,38,20),(207,0,39,20),(208,0,40,20),(209,0,41,20),(210,0,42,20),(211,0,43,20),(212,0,44,20),(213,0,45,20),(214,90,35,21),(215,0,36,21),(216,0,37,21),(217,0,38,21),(218,0,39,21),(219,0,40,21),(220,0,41,21),(221,0,42,21),(222,0,43,21),(223,0,44,21),(224,0,45,21);
/*!40000 ALTER TABLE `productdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `color` varchar(255) NOT NULL,
  `createdby` varchar(255) NOT NULL,
  `createddate` datetime DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `description` longtext NOT NULL,
  `modifiedby` varchar(255) DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `rating` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `unitype` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `discount_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2eai1d8yo225tbgcr61l7uh7e` (`category_id`),
  KEY `FKdka7s7ph7n8erp8ryftjx8kch` (`discount_id`),
  CONSTRAINT `FK2eai1d8yo225tbgcr61l7uh7e` FOREIGN KEY (`category_id`) REFERENCES `catogory` (`id`),
  CONSTRAINT `FKdka7s7ph7n8erp8ryftjx8kch` FOREIGN KEY (`discount_id`) REFERENCES `discount` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'white','admin@gmail.com','2023-03-31 11:12:17',NULL,'Gender: Unisex\nSize run: 35 – 45\nUpper: Canvas/Leather\nOutsole: Rubber','admin@gmail.com','2023-06-05 23:17:27','Vintas Jazico - High Top',780000,9,'INACTIVE','Ananas',3,NULL),(2,'white','admin@gmail.com','2023-03-31 11:15:23',NULL,'Gender: Unisex\nUpper: Canvas/Leather\nOutsole: Rubber','admin@gmail.com','2023-06-05 23:20:45','VINTAS JAZICO',780000,0,'ACTIVE','Ananas',3,NULL),(3,'white','admin@gmail.com','2023-03-31 11:47:34',NULL,'mo ta 1',NULL,NULL,'Pro_AV00174_1',780000,0,'INACTIVE','Ananas',3,NULL),(4,'white','admin@gmail.com','2023-03-31 12:35:32',NULL,'mo ta san pham',NULL,NULL,'Pro_AV00174_1',78000,0,'INACTIVE','ANANAS',3,NULL),(5,'green','admin@gmail.com','2023-03-31 12:48:42',NULL,'Gender: Unisex\nUpper: Canvas NE\nOutsole: Rubber','admin@gmail.com','2023-06-04 21:56:53','BASAS EVERGREEN - HIGH TOP',650000,3,'ACTIVE','ANANAS',2,'0606'),(6,'black','admin@gmail.com','2023-03-31 13:55:37',NULL,'Gender: Unisex\nUpper: Canvas NE\nOutsole: Rubber\nCó thêm 01 bộ dây đi kèm','admin@gmail.com','2023-04-01 08:05:01','BASAS SIMPLE LIFE NE - HIGH TOP',580000,0,'INACTIVE','ANANAS',2,NULL),(7,'white','admin@gmail.com','2023-03-31 16:19:16',NULL,'test mo ta',NULL,NULL,'test ten san pham',500000,0,'INACTIVE','test',1,NULL),(8,'white','admin@gmail.com','2023-03-31 16:26:10',NULL,'testttt',NULL,NULL,'testtt',344444,0,'INACTIVE','tstst',1,NULL),(9,'white','admin@gmail.com','2023-03-31 16:32:06',NULL,'testestset',NULL,NULL,'tesdtt',454544,0,'INACTIVE','sfss',1,NULL),(10,'green','admin@gmail.com','2023-03-31 21:03:06',NULL,'Gender: Unisex\nUpper: Canvas NE\nOutsole: Rubber','admin@gmail.com','2023-04-01 07:56:08','URBAS SC - MULE - FOLIAGE',580000,0,'ACTIVE','ANANAS',1,NULL),(11,'white','admin@gmail.com','2023-03-31 21:06:21',NULL,'trertwertwer',NULL,NULL,'rtttewrtert',450000,0,'INACTIVE','tetee',1,NULL),(12,'white','admin@gmail.com','2023-03-31 21:07:36',NULL,'eeeeeeeeee',NULL,NULL,'eeeeee',456000,0,'INACTIVE','erwww',1,NULL),(13,'white','admin@gmail.com','2023-03-31 21:09:06',NULL,'hhhhhhhhhhhhh',NULL,NULL,'hhhhhhhhhhhhhh',565555,0,'INACTIVE','h6565',1,NULL),(14,'white','admin@gmail.com','2023-03-31 21:09:56',NULL,'dfgsdfgsdfg',NULL,NULL,'sdfgsdfgsdf',345333,0,'INACTIVE','sefsdf',1,NULL),(15,'white','admin@gmail.com','2023-03-31 21:18:13',NULL,'fgsdsss',NULL,NULL,'gdfgsdfg',322222,0,'INACTIVE','rrrr',1,NULL),(16,'white','admin@gmail.com','2023-03-31 21:43:17',NULL,'asdasdasdasd',NULL,NULL,'fasdasd',566666,0,'INACTIVE','aaaa',1,NULL),(17,'white','admin@gmail.com','2023-03-31 22:55:38',NULL,'dssssssssss',NULL,NULL,'tetststt',30000,0,'INACTIVE','33332d',1,NULL),(18,'white','admin@gmail.com','2023-03-31 23:01:49',NULL,'ewewewe','admin@gmail.com','2023-04-01 07:59:12','33333333eeee',440000,0,'ACTIVE','jjj',1,NULL),(19,'yellow','admin@gmail.com','2023-04-01 08:17:08',NULL,'Gender: Unisex\nUpper: Canvas NE\nOutsole: Rubber','admin@gmail.com','2023-04-01 08:17:34','URBAS SC - HIGH TOP - CORNSILK',650000,1,'ACTIVE','A',1,NULL),(20,'white','admin@gmail.com','2023-06-05 23:19:49',NULL,'11111',NULL,NULL,'11111',1111110,0,'INACTIVE','12121',4,NULL),(21,'white','admin@gmail.com','2023-06-05 23:21:33',NULL,'demo222111','admin@gmail.com','2023-06-05 23:24:50','demodemo',1000010,10,'ACTIVE','demo',1,'demo');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repository`
--

DROP TABLE IF EXISTS `repository`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repository` (
  `id` varchar(255) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `datecreated` datetime DEFAULT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `productdetailid` bigint DEFAULT NULL,
  `type_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhr36logtr3ab1op2n0ft1gvi7` (`productdetailid`),
  KEY `FKhalpcmthea5ry4j2w16452xv3` (`type_id`),
  CONSTRAINT `FKhalpcmthea5ry4j2w16452xv3` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  CONSTRAINT `FKhr36logtr3ab1op2n0ft1gvi7` FOREIGN KEY (`productdetailid`) REFERENCES `productdetail` (`id`),
  CONSTRAINT `repository_chk_1` CHECK ((`quantity` >= 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repository`
--

LOCK TABLES `repository` WRITE;
/*!40000 ALTER TABLE `repository` DISABLE KEYS */;
INSERT INTO `repository` VALUES ('PN1680301380000','admin@gmail.com','2023-04-01 05:23:00',333333,20,12,'PHIEUNHAP'),('PN1680301620000','admin@gmail.com','2023-04-01 05:27:00',1000000,100,68,'PHIEUNHAP'),('PN1680301740000','admin@gmail.com','2023-04-01 05:29:00',1000000,10,1,'PHIEUNHAP'),('PN1680336780000','admin@gmail.com','2023-04-01 15:13:00',450000,20,44,'PHIEUNHAP'),('PN1680336840000','admin@gmail.com','2023-04-01 15:14:00',450000,50,52,'PHIEUNHAP'),('PN1680337080000','admin@gmail.com','2023-04-01 15:18:00',300000,20,201,'PHIEUNHAP'),('PN1680339000000','admin@gmail.com','2023-04-01 15:50:00',200000,20,3,'PHIEUNHAP'),('PN1686007620000','admin@gmail.com','2023-06-06 06:27:00',400000,100,214,'PHIEUNHAP');
/*!40000 ALTER TABLE `repository` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN'),(2,'USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopcart`
--

DROP TABLE IF EXISTS `shopcart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopcart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `customersid` bigint DEFAULT NULL,
  `productdetailid` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaxa2ldsbpop80m90sap00xslc` (`customersid`),
  KEY `FKgaeld1612bt5wvgoipdyefr54` (`productdetailid`),
  CONSTRAINT `FKaxa2ldsbpop80m90sap00xslc` FOREIGN KEY (`customersid`) REFERENCES `customers` (`id`),
  CONSTRAINT `FKgaeld1612bt5wvgoipdyefr54` FOREIGN KEY (`productdetailid`) REFERENCES `productdetail` (`id`),
  CONSTRAINT `shopcart_chk_1` CHECK ((`quantity` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopcart`
--

LOCK TABLES `shopcart` WRITE;
/*!40000 ALTER TABLE `shopcart` DISABLE KEYS */;
INSERT INTO `shopcart` VALUES (11,2,4,200);
/*!40000 ALTER TABLE `shopcart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` varchar(255) NOT NULL,
  `nametype` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES ('PHIEUNHAP','Phiếu nhập'),('PHIEUXUAT','phiếu xuất');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`),
  CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKj345gk1bovqvfame88rcx7yyx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (2,1),(3,1),(4,2),(5,2),(6,2),(7,2),(8,2);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'admin@gmail.com','nguyen','$2a$10$k769P0aT/.gRbrgObe.Ls.byeY4M56.i0dNRBhFehstVSGUdecpmi','admin@gmail.com'),(3,'admin2@gmail.com','admin2','$2a$10$OH8SVBVVxqAlYXDO6aS1ceyAXI/xfxbNQpoFxJtZXd/TemfUoe2Se','admin2@gmail.com'),(4,'phong@gmail.com','nguyen','$2a$10$6c5MEsXb5RgAtDPmd3Gi7O6kXaH7S2QiOMzenKjTzI6PWlUQTlGr2','phong@gmail.com'),(5,'khachhang@gmail.com','khach','$2a$10$GuzBcmhrEj5Y.FEr67EdwuxQKI.Y4UuWd08yznA3HnGwL4aLguMVu','khachhang@gmail.com'),(6,'test@gmail.com','detttt','$2a$10$HwCz9ychB/tOzHvkqSoqMuqsO7HJAYG/ZeGzQx66Sii5IWm/ntX6.','test@gmail.com'),(7,'demo@gmail.com','dedede','$2a$10$10HDkQoE0ku9T5cjKUKGx.f/fvEhc9xT2/c3z.Cu1Uy8DAYR9T8G.','demo@gmail.com'),(8,'demo2@gmail.com','dedede','$2a$10$7uRB.eSCWxR4OlNRtIwB6.zpMlhg2ZMkpk0OoiAnWQHdiFbBrr5RS','demo2@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint DEFAULT NULL,
  `productid` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk6lal9w7ut5e4xvta479rq06y` (`customer_id`),
  KEY `FKmuppk1kk7nwi10yiho98emujv` (`productid`),
  CONSTRAINT `FKk6lal9w7ut5e4xvta479rq06y` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `FKmuppk1kk7nwi10yiho98emujv` FOREIGN KEY (`productid`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (1,4,19);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-06  7:51:59
