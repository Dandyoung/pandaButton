"use strict";

const express = require("express");
const router = express.Router();
const professor_ctrl = require('../controller/professor_ctrl');

//시작종료버튼
router.get('/', professor_ctrl.click_btn);
router.post('/start', professor_ctrl.click_start);
router.post('/end', professor_ctrl.click_end);

//그래프 보여주는 페이지
router.get('/graph', professor_ctrl.show_graph);

module.exports = router;