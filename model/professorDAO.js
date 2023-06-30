"use strict";

const {db} = require("../config/dbconn");

function zero_value() {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT click FROM bamboo_stick WHERE ID = 2`;
        db.query(queryData, [], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

function cntForgraph() {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT DATE_FORMAT(click, '%Y-%m-%d %H:%i:00') AS interval_start, COUNT(*) AS count 
                           FROM bamboo_stick GROUP BY UNIX_TIMESTAMP(click) DIV (5 * 60) ORDER BY interval_start;`;
        db.query(queryData, [], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

module.exports = {
    zero_value,
    cntForgraph
}