var express = require('express');
var router = express.Router();
require('mysql');
var mysql_dbc = require('../commons/db_conn')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);
require('../commons/helpers');
/**
TODO async 기능
TOOD transaction 기능
TODO partials 기능
TODO admin login 페이지 -> homefit것을 그대로 연결??

*/
var SERVICE_NAME = '달링카, ';

/**
 * client app index page
 */
router.get('/', function(req, res) {
	var stmt = "select " +
	"c.name as `company`, ct.type, cp.name, cp.max_price, cp.min_price, cp.hit_count, cp.thumbnail " +
	"from `car_pr` as cp " +
	"left join `company` as c " +
	"on cp.company_id = c.id " +
	"left join `car_type` as ct " +
	"on cp.type_id = ct.id;";
	connection.query(stmt, function (err, rows) {
		if(err){
			console.error('[ERR] ' + err);
		}else{
			res.render('index', {
				title: SERVICE_NAME + '홈',
				data: rows,
				part: 'mobile'
			});
		}
	});
});

module.exports = router;