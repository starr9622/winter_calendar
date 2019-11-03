var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date();
  var week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
  var position = new Array('lecture-01','lecture-02','lecture-03','lecture-04','lecture-05','lecture-06','lecture-07','lecture-08','lecture-09','lecture-10');
  models.course.findAll().then(course => {
      models.schedule.findAll({
          include: [{
            model: models.course 
          }]
        }).then(schedule => {
          let table = {'월':[],'화':[],'수':[],'목':[],'금':[]};
          let count = 0;
          schedule.forEach(timeSchedule => {
            let week = timeSchedule.course.dayofweek.split("");
            let lecture = timeSchedule.course.lecture;
            let location = timeSchedule.course.location;
            let start_time = timeSchedule.course.start_time;
            let end_time = timeSchedule.course.end_time;
            let memo = timeSchedule.memo ? JSON.parse(timeSchedule.memo) : 0;
            if(count > 10){
              count = 0;
            }
            week.forEach(day => {
              table[day].push({
                lecture: lecture,
                location: location,
                data: position[count], 
                class: end_time - start_time == 1 ? 'hr-'+start_time : 'hr-'+start_time+" two-hr",
                memo : memo
              });
            });
            count++;
          });
          let table2 = [
            {'day' : 'Mon','lec' : table['월']},
            {'day' : 'Tue','lec' : table['화']},
            {'day' : 'Wed','lec' : table['수']},
            {'day' : 'Thu','lec' : table['목']},
            {'day' : 'Fri','lec' : table['금']},
          ];
          res.render('index', { title: 'programmers 과제 테스트 템플릿 - Node.js', course: course, schedule:table2, today:week[d.getDay()]});
        });
  });
});

module.exports = router;
