var express = require('express');
var router = express.Router();
require('../commons/helpers');
require('mysql');

var mysql_dbc = require('../commons/db_conn')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


var fs = require('fs');
var formidable = require('formidable');
var md5 = require('md5');

var bcrypt = require('bcrypt');
var async = require('async');

// 로그인 설정
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

// 로그인 인증 후 세션에 정보를 저장할 때
passport.serializeUser(function (user, done) {
	done(null, user);
});

// 세션에서 정보를 꺼낼 때
passport.deserializeUser(function (user, done) {
	done(null, user);
});

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/admin/login'); // 로그인이 되지 않을 경우 로그인 페이지로 이동시킨다.
};

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, email, password, done) {
		var stmt = "select * from `dealer` where `email`='" + email + "'";
		console.log(stmt);

		connection.query(stmt, function (err, data) {
			if (err) {
				return done(null, false);
			} else {
				if (data.length === 1) {
					if (!bcrypt.compareSync(password, data[0].password)){
						console.log('password is not matched.');
						return done(null, false);
					} else {
						console.log('password is matched.');
						console.info(data[0]);
						return done(null, {
							'name': data[0].name,
							'email': data[0].email
						});
					}
				} else {
					return done(null, false);
				}
			}
		});
	}
));

router.get('/login', function (req, res) {
	if (req.user == null) {
		res.render('admin/login', {
			title: '달링카, 로그인',
			part: 'login',
			loggedIn : req.user
		});
	} else {
		res.redirect('/admin/dashboard');
	}
});

router.post('/login',
	passport.authenticate('local', {
		failureRedirect: '/admin/login',
		failureFlash: true
	}), function (req, res) {
		res.redirect('/admin/dashboard');
	});

router.get('/login', function(req, res, next) {
	res.render('admin/login', {
		title: '달링카, 로그인'
	});
});

/**
 * 로그아웃
 */
router.get('/logout', isAuthenticated, function (req, res) {
	req.logout();
	res.redirect('/');
});


/**
 * 딜러 생성 페이지 (관리자 포함)
 */
router.get('/create/dealer', function (req, res) {
	var stmt = "select * from `dealer`";
	connection.query(stmt, function (err, data) {
		if(err){
			console.error(err);
		}else{
			res.render('admin/create_dealer', {
				title : '달링카, 딜러 생성',
				data : data
			});
		}
	});
});

router.post('/result/dealer', function (req, res) {
	// TODO 기존 데이터와 중복 검사를 해야 한다.??


	var _obj = {
		name : req.body.name.trim(),
		tel : req.body.tel.trim(),
		email : req.body.email.trim(),
		password: req.body.password.trim()
	};

	var hash = bcrypt.hashSync(_obj.password, 10);
	var stmt = "insert into `dealer` (`name`, `tel`, `email`, `password`)" +
		"values('"+_obj.name+"','"+_obj.tel+"','"+_obj.email+"','"+hash+"');";

	connection.query(stmt, function (err, data) {
		if(err){
			console.error(err);
		}else{
			console.info(data);
		}
		res.redirect('/admin/create/dealer');
	});
});


/**
 * 데이터 내용 미정
 */
router.get('/dashboard', isAuthenticated, function(req, res, next) {
	res.render('admin/index', {
		title: '달링카',
		nav : 'Dashboard',
		loggedIn: req.user
	});
});


router.get('/pr/list', function (req, res) {
	var stmt = "select * from `car_pr` order by `status` asc;";
	connection.query(stmt, function (err, data){
		if(err){
			console.info(err);
		}else{
			res.render('admin/pr_list', {
				title : '달링카, 홍보차 관리',
				nav : '홍보차 관리',
				data: data
			});
		}
	});
});


router.get('/pr/activate/:id/:status', function (req, res) {
	var stmt = null;
	var status = req.params.status;
	if(status == 0 || status == false){
		stmt = "update `car_pr` set `status`=true where `id`="+req.params.id+";";
	}else{
		stmt = "update `car_pr` set `status`=false where `id`="+req.params.id+";";
	}

	console.info(stmt);

	connection.query(stmt, function (err, data) {
		if(err){
			console.error('[err] ' + err);
		}else{
			res.redirect('/admin/pr/list');
		}
	});
});


router.post('/pr/create/car', function (req, res) {
	//if(req.body.company == undefined || req.body.name == undefined){
	//	console.error('값 입력이 올바르게 되지 않았습니다.');
	//	res.rediect('/admin/pr/list');
	//}

	console.info(req.body);

	// var form = new formidable.IncomingForm();
	var form = new formidable.IncomingForm({
		encoding: 'utf-8',
		keepExtensions: true,
		multiples: true
		//uploadDir: appRoot + '/public/upload/representatives/' // todo check
		//type: true
		//bytesReceived : ''
	});

	//form.on('fileBegin', function(name, file) {
	//	console.info(name);
	//	//file.path = form.uploadDir + "/" + file.name;
	//});
	//
	//form.on('file', function(name, file) {
	//	console.info(name);
	//	console.info(file);
	//});
	//
	//form.on('error', function(err) {
	//	console.info(err);
	//});
	//
	//form.on('aborted', function() {
	//	console.info('aborted');
	//});
	//
	//

	//
	//form.on('end', function () {
	//	console.log('upload done');
	//});


	//form.on('field', function(name, value) {
	//	console.info(name + '/' + value);
	//});


	// todo  임시 저장소에 보관된 이미지들은 언제 사라지는가??? /var/folders/pp

	var _obj = {
		filename : null,
		company : null,
		name : null
	};


	form.parse(req, function (err, fields, files) {
		if(err){
			console.info(err);
		}

		_obj.company = fields.company;
		_obj.name = fields.name;

		console.log(files);
		_obj.filename = md5(files.upload.name + new Date());

		fs.renameSync(files.upload.path, appRoot + '/public/upload/representatives/'+_obj.filename);

		var stmt = "insert into `car_pr` (`company`, `name`, `thumbnail`) values('"+_obj.company+"', '"+_obj.name+"', '"+_obj.filename+"');";

		connection.query(stmt, function (err, data){
			if(err){
				console.error('[err] ' + err);
			}else{
				res.redirect('/admin/pr/list');
			}
		});
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