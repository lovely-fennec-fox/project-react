// const promisePool;
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
host: process.env.SERVER_IP,
port: 3306,
user: 'root',
password: process.env.mysql_password,
database: 'MONEYEXCHANGE'
});


module.exports= pool;