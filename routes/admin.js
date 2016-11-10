var express = require('express');
var router = express.Router();
require('../commons/helpers');

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
	res.render('admin/domestic_list', {
		title: '달링카, 국산차 리스트',
		nav : '국산차 관리'
	})
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