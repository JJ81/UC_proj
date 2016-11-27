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

	// todo 필터 관련 데이터를 내려주어야 한다.
	// 차종에 대한 데이터 (모든 것을 출력한다.)
	// 제조사에 대한 데이터 (활성화된 것만 출력)

	var com_id = req.query.com_id;
	var type_id = req.query.type_id;

	console.info('com : ' + com_id);
	console.info('type : ' + type_id);

	var stmt = "select " +
	"c.name as `company`, ct.type, cp.name, cp.max_price, cp.min_price, cp.hit_count, cp.thumbnail, ct.id as type_id, c.id as company_id " +
	"from `car_pr` as cp " +
	"left join `company` as c " +
	"on cp.company_id = c.id " +
	"left join `car_type` as ct " +
	"on cp.type_id = ct.id " +
	"where `c`.`id`='"+com_id+"'";

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