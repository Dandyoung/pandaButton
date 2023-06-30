"use strict";

const {db} = require("../config/dbconn");

function upCnt_click() {
    return new Promise((resolve, reject) => {
        const queryData = `INSERT INTO bamboo_stick (type) values (1)`;
        db.query(queryData, [], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

module.exports = {
    upCnt_click
}