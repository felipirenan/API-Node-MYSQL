const mysql = require('mysql');

var pool = mysql.createPool({
    "user" :  'root',//process.env.MYSQL_USER, 
    "password" : '12345678',//process.env.MYSQL_PASSWORD,
    "database" : 'db_barbearia', //process.env.MYSQL_DATABASE,
    "host" : 'localhost',//process.env.MYSQL_HOST,
    "port" : 3306//process.env.MYSQL_
});

exports.pool = pool;