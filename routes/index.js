var express = require('express');
var router = express.Router();
require('mysql');
var mysql_dbc = require('../commons/db_conn')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

/**
TODO async 기능
TOOD transaction 기능
TODO partials 기능
TODO admin login 페이지 -> homefit것을 그대로 연결??

*/


/**
 * client app index page
 */
router.get('/', function(req, res, next) {
	connection.query('select * from `car`', function (err, rows) {
		if(err){
			console.error('[ERR] ' + err);
		}else{
			res.render('index', {
				title: 'UC_proj',
				data: rows
			});
		}
	});
});




module.exports = router;