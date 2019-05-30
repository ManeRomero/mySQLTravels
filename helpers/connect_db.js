const MYSQL = require('mysql2')

const connect = MYSQL.createConnection({
    host: 'localhost',
    user: 'MRC',
    password: 'AoPQNY84Pkk5V8yk',
    database: 'mysqltravels'
})

module.exports = connect

// AoPQNY84Pkk5V8yk