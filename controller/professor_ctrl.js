"use strict";

const path = require('path');
const professorDAO = require("../model/professorDAO");

async function click_btn(req, res) {
    try {
        res.sendFile(path.join(__dirname , '../views/startPage.html'));
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

async function click_start(req, res) {
    try {
        const db_data = await professorDAO.readyZero();
        res.send({ result: "zero time success"});
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

async function click_end(req, res) {
    try {
        const db_data = await professorDAO.readyZero();
        res.send({ result: "zero time success"});
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

async function show_graph(req, res) {
    try {
        const class_time = await professorDAO.class_time();
        console.log(class_time)
        const db_data = await professorDAO.cntForgraph();
        res.render(path.join(__dirname, '../views/linechart'), { result: db_data });
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

module.exports = {
    click_btn,
    click_start,
    click_end,
    show_graph
}