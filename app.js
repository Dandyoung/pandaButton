"use strict";

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  credential: true,
};

app.use(cors(corsOptions));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view_pug"));

const cookieParser = require('cookie-parser');

const studentRouter = require("./routes/studentRouter");
const professorRouter = require("./routes/professorRouter");
const chartRouter = require("./routes/chartRouter");

// app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use("/student", studentRouter);
app.use("/professor", professorRouter);

app.use("/chart", chartRouter)
module.exports = app;