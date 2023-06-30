"use strict";

const path = require('path');
const studentDAO = require("../model/studentDAO");

async function show_btn(req, res) {
    try {
        res.sendFile(path.join(__dirname , '../views/index.html'));
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

async function click_btn(req, res) {
    try {
        const db_data = await studentDAO.upCnt_click();
        res.send({ result: "Plus 1 Success" });
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

module.exports = {
    show_btn,
    click_btn
}