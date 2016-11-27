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
	res.redirect('/admin/login');
});

/**
 * 딜러 생성 페이지 (관리자 포함)
 */
router.get('/dealer/list', function (req, res) {
	var stmt = "select * from `dealer`";
	connection.query(stmt, function (err, data) {
		if(err){
			console.error(err);
		}else{
			res.render('admin/create_dealer', {
				title: '달링카, 딜러 리스트',
				nav : '딜러 관리',
				data : data,
				loggedIn: req.user
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
		res.redirect('/admin/dealer/list');
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

/**
 * 홍보차 등록 리스트
 */
router.get('/pr/list', function (req, res) {
	/*
		todo 회사 정보 내려주기, 차종 리스트 내려주기,
		todo 수정하기 기능 중 기존 데이터 지우고 이미지 파일 지우기
		todo
	 */
	var stmt = "select " +
	"cp.id, c.name as `company`, cp.company_id, cp.name, cp.max_price, cp.min_price, cp.hit_count, cp.thumbnail, cp.status, ct.id as `type_id`" +
	"from `car_pr` as cp " +
	"left join `company` as c " +
	"on cp.company_id = c.id " +
	"left join `car_type` as ct " +
	"on cp.type_id = ct.id " +
	// "where cp.status = true " +
	"order by cp.id asc;";
	var stmt_company = "select * from `company` order by `id` asc;";
	var stmt_type = "select * from `car_type` order by `id` asc;";
	connection.query(stmt, function (err, data){
		if(err){
			console.info(err);
		}else{
			connection.query(stmt_company, function (err, com) {
				if(err){
					console.error(err);
				}else{
					connection.query(stmt_type, function (err, type) {
						if(err){
							console.error(err);
						}else{
							res.render('admin/pr_list', {
								title : '달링카, 홍보차 관리',
								nav : '홍보차 관리',
								data: data,
								com: com,
								type: type,
								loggedIn: req.user
							});
						}
					});
				}
			});
		}
	});
});


router.get('/pr/activate/:id/:status/:company_id', function (req, res) {
	var id = req.params.id;
	var status = req.params.status;
	var company_id = req.params.company_id;

	var stmt = null;

	if(status == 0 || status == false){
		stmt = "update `car_pr` set `status`=true where `id`="+id+";";
	}else{
		stmt = "update `car_pr` set `status`=false where `id`="+id+";";
	}

	// 활성화를 한 번 한 제조사는 계속 열려 있게 된다
	var stmt_com = "update `company` set `active`=true where `id`='"+company_id+"';";

	connection.query(stmt, function (err, data) {
		if(err){
			console.error('[err] ' + err);
		}else{
			connection.query(stmt_com, function (err, com) {
				if(err){
					console.error(err);
				}else{
					res.redirect('/admin/pr/list');
				}
			});
		}
	});
});

/**
 *  새로운 홍보차 등록
 */
router.post('/pr/create/car', function (req, res) {
	console.info(req.body);

	var form = new formidable.IncomingForm({
		encoding: 'utf-8',
		keepExtensions: true,
		multiples: true
	});

	// todo  임시 저장소에 보관된 이미지들은 언제 사라지는가??? /var/folders/pp
	var _obj = {
		filename : null,
		company : null,
		name : null,
		company_id : null,
		type_id : null
	};

	form.parse(req, function (err, fields, files) {
		if(err){
			console.error(err);
		}
		// console.info(fields);

		_obj.company = fields.company;
		_obj.name = fields.name;
		_obj.company_id = fields.company;
		_obj.type_id = fields.type;

		console.log(files);
		_obj.filename = md5(files.upload.name + new Date());

		fs.renameSync(files.upload.path, appRoot + '/public/upload/representatives/'+_obj.filename);

		var stmt = "insert into `car_pr` (`company_id`, `name`, `type_id`, `thumbnail`)" +
			"values('"+_obj.company_id+"','"+_obj.name+"','"+_obj.type_id+"','"+_obj.filename+"');";

		connection.query(stmt, function (err, data){
			if(err){
				console.error('[err] ' + err);
			}else{
				res.redirect('/admin/pr/list');
			}
		});
	});
});


router.post('/pr/modify/car', function (req, res) {

	// todo 만약 파일을 업로드했다면 기존 데이터를 조회하여 해당 파일을 이름을 찾아서 지우고 새로 업로드 한다. (이건 나중에)
	if(req.body.upload !== '') {
		console.info('파일이 새로 업로드되었습니다.');
	}

	var _obj = {
		id: req.body.item_id,
		name : req.body.name,
		type_id : req.body.type,
		company_id : req.body.company,
		thumbnail : null
	};

	var stmt =
		"update `car_pr` set `name`='"+_obj.name+"', `type_id`='"+_obj.type_id+"', `company_id`='"+_obj.company_id+"' where `id`='"+_obj.id+"'";

	connection.query(stmt, function (err, data){
		if(err){
			console.error(err);
		}else{
			res.redirect('/admin/pr/list');
		}
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
				data: rows,
				loggedIn: req.user
			});
		}
	});
});





router.get('/foreign/list', function (req, res) {
	res.render('admin/foreign_list', {
		title: '달링카, 외제차 리스트',
		nav : '외제차 관리',
		loggedIn: req.user
	})
});


router.get('/customer/list', function (req, res) {
	res.render('admin/customer_list', {
		title: '달링카, 고객 리스트',
		nav : '고객 관리',
		loggedIn: req.user
	})
});





router.get('/manage', function (req, res) {
	res.render('admin/manage', {
		title: '달링카, 관리자',
		nav : '관리자',
		loggedIn: req.user
	})
});


module.exports = router;