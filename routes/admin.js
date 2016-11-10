var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
	res.render('admin/login', {
		title: '달링카, 로그인'
	});
});

router.get('/dashboard', function(req, res, next) {
	res.render('admin/index', {
		title: '달링카',
		nav : 'Dashboard'
	});
});


module.exports = router;