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