var express = require('express');
var router = express.Router();
var {course, schedule} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date();
  var week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
  course.findAll().then(course => {
    schedule.findAll().then(schedule =>{
      res.render('index', { title: 'programmers 과제 테스트 템플릿 - Node.js', course: course, schedule:schedule, today:week[d.getDay()]});
    })
  });
});

module.exports = router;
