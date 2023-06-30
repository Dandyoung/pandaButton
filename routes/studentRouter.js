"use strict";

const express = require("express");
const router = express.Router();
const student_ctrl = require('../controller/student_ctrl');

router.get('/', student_ctrl.show_btn);
router.post('/', student_ctrl.click_btn);

module.exports = router;