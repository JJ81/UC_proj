var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql_dbc = require('../commons/db_conn')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);


router.get('/', function(req, res, next) {
  res.render('index', { title: 'UC_proj' });
});

module.exports = router;
