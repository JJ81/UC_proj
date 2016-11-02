# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.13-MariaDB)
# Database: uc_proj
# Generation Time: 2016-11-02 14:23:44 +0000
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
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
