const mysql = require('mysql2')
// 導入dotenv 使用 .env 檔案中的設定值 process.env
require('dotenv').config()

// 資料庫連結資訊
const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
}

// 一般使用
//module.exports.pool = mysql.createPool(connection)

// promise用
module.exports.promisePool = mysql.createPool(connection).promise()
