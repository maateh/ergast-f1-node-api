const mysql = require('mysql2')

const host = process.env.MYSQL_HOST
const database = process.env.MYSQL_DATABASE
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD

const pool = mysql.createPool({
  host,
  database,
  user,
  password
})

module.exports = pool.promise()
