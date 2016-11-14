# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.13-MariaDB)
# Database: uc_proj
# Generation Time: 2016-11-14 14:42:12 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table car
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car`;

CREATE TABLE `car` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `company` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` bigint(255) unsigned NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `dealer_id` bigint(255) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `hit_count` bigint(20) DEFAULT '0',
  `ref_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_car_dealer` (`dealer_id`),
  KEY `FK_car_to_pr` (`ref_id`),
  CONSTRAINT `FK_car_dealer` FOREIGN KEY (`dealer_id`) REFERENCES `dealer` (`id`),
  CONSTRAINT `FK_car_to_pr` FOREIGN KEY (`ref_id`) REFERENCES `car_pr` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table car_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_details`;

CREATE TABLE `car_details` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `car_id` bigint(255) NOT NULL,
  `birth` int(4) unsigned NOT NULL COMMENT '생산년도',
  `fuel_type` varchar(10) NOT NULL COMMENT '연료타입',
  `fuel_ratio` int(5) unsigned NOT NULL COMMENT '연비',
  `fuel_grade` tinyint(1) unsigned NOT NULL COMMENT '연료등급',
  `type` varchar(10) NOT NULL COMMENT '차종(경차, 소형차, 준중형차, 중형차, 대형차)',
  `displacement` int(5) unsigned NOT NULL COMMENT '배기량',
  `color` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_car_details` (`car_id`),
  CONSTRAINT `FK_car_details` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table car_history
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_history`;

CREATE TABLE `car_history` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `car_id` bigint(255) NOT NULL,
  `accident` tinyint(1) DEFAULT '1',
  `water` tinyint(1) DEFAULT '1',
  `remodel` tinyint(1) DEFAULT '1',
  `repair` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_car_history` (`car_id`),
  CONSTRAINT `FK_car_history` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table car_option
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_option`;

CREATE TABLE `car_option` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `car_id` bigint(255) NOT NULL,
  `navi` tinyint(1) DEFAULT '1',
  `blackbox` tinyint(1) DEFAULT '1',
  `sunroof` tinyint(1) DEFAULT '1',
  `as` tinyint(1) DEFAULT '1',
  `rear_sensor` tinyint(1) DEFAULT '1',
  `rear_camera` tinyint(1) DEFAULT '1',
  `heat_seat` tinyint(1) DEFAULT '1',
  `smart_key` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_car_option` (`car_id`),
  CONSTRAINT `FK_car_option` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table car_pr
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_pr`;

CREATE TABLE `car_pr` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `company` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `max_price` bigint(255) unsigned DEFAULT '0',
  `min_price` bigint(255) unsigned DEFAULT '0',
  `thumbnail` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `car_pr` WRITE;
/*!40000 ALTER TABLE `car_pr` DISABLE KEYS */;

INSERT INTO `car_pr` (`id`, `company`, `name`, `max_price`, `min_price`, `thumbnail`, `status`)
VALUES
	(26,'현대','아반떼',0,0,'600dcc819a943e90e9a445908a95f19c',1),
	(27,'현대','아반떼',0,0,'1bd5ac9e8940d5cbe53516ab7861a51e',1);

/*!40000 ALTER TABLE `car_pr` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dealer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dealer`;

CREATE TABLE `dealer` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tel` (`tel`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `dealer` WRITE;
/*!40000 ALTER TABLE `dealer` DISABLE KEYS */;

INSERT INTO `dealer` (`id`, `name`, `password`, `tel`, `email`)
VALUES
	(1,'김동수','$2a$10$3lXs.d/chnDfvcZiI6y7.ueJPsNQl2V7CCRo6m4xRtQVOK0wlYXBS','01011112222','dongsoo@intertoday.com'),
	(7,'이재준','$2a$10$IRP5kWV3ek00pOU6INgX1OGxKiyoeXbEzpLdrG29Rrd2jWB8ocOiG','01033650510','j.lee@intertoday.com');

/*!40000 ALTER TABLE `dealer` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
