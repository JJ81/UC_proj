var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
	res.render('admin/login', {
		title: 'UC_proj admin page, login'
	});
});

router.get('/dashboard', function(req, res, next) {
	res.render('admin/index', {
		title: 'UC_proj admin page'
	});
});


module.exports = router;
