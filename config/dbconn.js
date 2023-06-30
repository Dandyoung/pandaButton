"use strict";

const mysql = require('mysql');
require('dotenv').config({ path: '.env' });

const db = mysql.createConnection({
    host: 'smartrentalcare.c02oobpyxopx.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'root',
    password: 'duswjd0619',
    database: 'smartRentalCare',
    multipleStatements: true
})

module.exports = {db};