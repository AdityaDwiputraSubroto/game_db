const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.dbName
});

const promisePool = pool.promise();

module.exports = promisePool;
