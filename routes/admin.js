var express = require('express');
var router = express.Router();
require('../commons/helpers');
require('mysql');

var mysql_dbc = require('../commons/db_conn')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


router.get('/login', function(req, res, next) {
	res.render('admin/login', {
		title: '달링카, 로그인'
	});
});

/**
 * 데이터 내용 미정
 */
router.get('/dashboard', function(req, res, next) {
	res.render('admin/index', {
		title: '달링카',
		nav : 'Dashboard'
	});
});

/**
 * 등록한 국산차 리스트
 */
router.get('/domestic/list', function (req, res) {
	var stmt = "select c.`id`, c.`company`, c.`name`, c.`price`, c.`thumbnail`, d.`name` as dealer_name, c.`status` " +
		"from `car` as c " +
		"left join `dealer` as d " +
		"on c.dealer_id = d.id order by `id` desc;";

	connection.query(stmt, function (err, rows) {
		if(err){
			console.error('[ERR] ' + err);
		}else{
			console.info(rows);
			res.render('admin/domestic_list', {
				title: '달링카, 국산차 리스트',
				nav : '국산차 관리',
				data: rows
			});
		}
	});
});





router.get('/foreign/list', function (req, res) {
	res.render('admin/foreign_list', {
		title: '달링카, 외제차 리스트',
		nav : '외제차 관리'
	})
});


router.get('/customer/list', function (req, res) {
	res.render('admin/customer_list', {
		title: '달링카, 고객 리스트',
		nav : '고객 관리'
	})
});


router.get('/dealer/list', function (req, res) {
	res.render('admin/dealer_list', {
		title: '달링카, 딜러 리스트',
		nav : '딜러 관리'
	})
});


router.get('/manage', function (req, res) {
	res.render('admin/manage', {
		title: '달링카, 관리자',
		nav : '관리자'
	})
});




module.exports = router;