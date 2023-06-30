"use strict";

const express = require("express");
const router = express.Router();
const professorDAO = require("../model/professorDAO");


router.get("/", async (req, res) => {
    const db_data = await professorDAO.cntForgraph();
    const value = db_data.map(({ interval_start, count }) => {
        return `['${interval_start.split(' ')[1]}', ${count}]`
    }).join(", ")

    const script =  `
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['interval_start', 'count'],
        ${value}
    ]);
    var options = {
    title: 'Ping Chart',
    curveType: 'function',
    legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
    }`
    console.log('script', script);
    res.render("index", { script });
  });

module.exports = router;