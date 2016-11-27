# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.13-MariaDB)
# Database: uc_proj
# Generation Time: 2016-11-27 03:57:10 +0000
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
  `company_id` bigint(20) DEFAULT '69' COMMENT '제조사',
  `name` varchar(100) NOT NULL,
  `type_id` bigint(20) DEFAULT '13' COMMENT '차종',
  `max_price` bigint(255) unsigned DEFAULT '0',
  `min_price` bigint(255) unsigned DEFAULT '0',
  `hit_count` bigint(20) DEFAULT '0',
  `thumbnail` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_prcar_company` (`company_id`),
  KEY `FK_prcar_type` (`type_id`),
  CONSTRAINT `FK_prcar_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `FK_prcar_type` FOREIGN KEY (`type_id`) REFERENCES `car_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `car_pr` WRITE;
/*!40000 ALTER TABLE `car_pr` DISABLE KEYS */;

INSERT INTO `car_pr` (`id`, `company_id`, `name`, `type_id`, `max_price`, `min_price`, `hit_count`, `thumbnail`, `status`)
VALUES
	(1,3,'K5',4,0,0,0,'e23fd37cddf8c57a7a537cd85043fac1',1),
	(2,3,'K3',3,0,0,0,'598a234e6096802416b134575b24e407',1),
	(30,3,'K7',5,0,0,0,'4debc47723415fba9177ca00ab3413b3',1),
	(31,3,'프라이드',2,0,0,0,'f70ecf5ba8616b3514b1980260eaa221',1),
	(32,3,'포르테',3,0,0,0,'fec82ab75573feec8f9553f2b76e3dc3',1),
	(33,3,'카렌스',7,0,0,0,'6b1d46908c398e842767751992c8a198',1),
	(34,3,'쏘렌토',7,0,0,0,'b792c1aa89d7dedced4ea21d9d2d81a6',1),
	(35,3,'쎄라토',2,0,0,0,'6bdf5da6442a69a5ada11eca29566479',1),
	(36,3,'스포티지',7,0,0,0,'20884f642371db9ee0748af819bc34bd',1),
	(37,3,'봉고프론티어',10,0,0,0,'c048963d3306ac73e97665b68fa33891',1),
	(38,3,'봉고3트럭 더블캡',10,0,0,0,'445fb4ce07c88d1110a1df5f68039625',1),
	(39,3,'봉고3트럭 1톤',10,0,0,0,'c83d5902f0cefbc9c5314bb2e04ecccb',1),
	(40,3,'레토나 밴',7,0,0,0,'a58bbcaeb43a68eaf328d8acc6d46631',1),
	(41,3,'레이',2,0,0,0,'898431b9e96c2df9fcac1b3f9579cb61',1),
	(42,3,'K9',5,0,0,0,'eb72a068a47735ce3898c917953361f9',1),
	(43,3,'뉴카니발',7,0,0,0,'ac0fe0097c158d609cec6b647630b4fb',1),
	(44,3,'카니발',7,0,0,0,'f9ebe0f7e51ebc38573e402ed5560600',1),
	(45,5,'SM3',2,0,0,0,'f13ca4b0db66ade1f763df9532b62a80',1);

/*!40000 ALTER TABLE `car_pr` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table car_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_type`;

CREATE TABLE `car_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `car_type` WRITE;
/*!40000 ALTER TABLE `car_type` DISABLE KEYS */;

INSERT INTO `car_type` (`id`, `type`)
VALUES
	(1,'경차'),
	(2,'소형'),
	(3,'준중형'),
	(4,'중형'),
	(5,'대형'),
	(6,'스포츠카'),
	(7,'SUV/RV'),
	(8,'경승합'),
	(9,'승합'),
	(10,'화물'),
	(11,'버스'),
	(12,'기타'),
	(13,'임시');

/*!40000 ALTER TABLE `car_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `oversee` tinyint(1) DEFAULT '0',
  `active` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;

INSERT INTO `company` (`id`, `name`, `oversee`, `active`)
VALUES
	(1,'현대',0,0),
	(2,'제네시스',0,0),
	(3,'기아',0,0),
	(4,'쉐보레',0,0),
	(5,'르노삼성',0,1),
	(6,'쌍용',0,0),
	(7,'BMW',1,0),
	(8,'GMC',1,0),
	(9,'닛산',1,0),
	(10,'다이하쯔',1,0),
	(11,'닷지',1,0),
	(12,'도요타',1,0),
	(13,'람보르기니',1,0),
	(14,'랜드로버',1,0),
	(15,'렉서스',1,0),
	(16,'MG로버',1,0),
	(17,'로터스',1,0),
	(18,'롤스로이스',1,0),
	(19,'르노',1,0),
	(20,'링컨',1,0),
	(21,'마세라티',1,0),
	(22,'마이바흐',1,0),
	(23,'마쯔다',1,0),
	(24,'맥라렌',1,0),
	(25,'머큐리',1,0),
	(26,'미니',1,0),
	(27,'미쯔비시',1,0),
	(28,'미쯔오까',1,0),
	(29,'벤츠',1,0),
	(30,'벤틀리',1,0),
	(31,'볼보',1,0),
	(32,'부가티',1,0),
	(33,'북기은상',1,0),
	(34,'뷰익',1,0),
	(35,'사브',1,0),
	(36,'사이언',1,0),
	(37,'새턴',1,0),
	(38,'쉐보레',1,0),
	(39,'스마트',1,0),
	(40,'스바루',1,0),
	(41,'스즈키',1,0),
	(42,'시트로엥',1,0),
	(43,'아우디',1,0),
	(44,'알파 로메오',1,0),
	(45,'애스턴마틴',1,0),
	(46,'어큐라',1,0),
	(47,'오펠',1,0),
	(48,'올즈모빌',1,0),
	(49,'이스즈',1,0),
	(50,'인피니티',1,0),
	(51,'재규어',1,0),
	(52,'지프',1,0),
	(53,'캐딜락',1,0),
	(54,'코닉세그',1,0),
	(55,'크라이슬러',1,0),
	(56,'파가니',1,0),
	(57,'페라리',1,0),
	(58,'포드',1,0),
	(59,'포르쉐',1,0),
	(60,'포톤',1,0),
	(61,'폭스바겐',1,0),
	(62,'폰티악',1,0),
	(63,'푸조',1,0),
	(64,'피아트',1,0),
	(65,'험머',1,0),
	(66,'캘핌트레일러',1,0),
	(67,'기타 국내차',0,0),
	(68,'기타 수입차',1,0),
	(69,'임시',0,0);

/*!40000 ALTER TABLE `company` ENABLE KEYS */;
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
  `banned` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tel` (`tel`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `dealer` WRITE;
/*!40000 ALTER TABLE `dealer` DISABLE KEYS */;

INSERT INTO `dealer` (`id`, `name`, `password`, `tel`, `email`, `banned`)
VALUES
	(1,'김동수','$2a$10$3lXs.d/chnDfvcZiI6y7.ueJPsNQl2V7CCRo6m4xRtQVOK0wlYXBS','01011112222','dongsoo@intertoday.com',0),
	(7,'이재준','$2a$10$IRP5kWV3ek00pOU6INgX1OGxKiyoeXbEzpLdrG29Rrd2jWB8ocOiG','01033650510','j.lee@intertoday.com',0),
	(8,'김성원','$2a$10$lEHDAy6DpH0r3nkGgDWWye3yVYpP64.1fmE3fKMCWJqnK642INjDu','01025857652','kimco13@hanmail.net',0);

/*!40000 ALTER TABLE `dealer` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
