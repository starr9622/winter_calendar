var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelize = require("sequelize");
var Op = sequelize.Op;

router.get('/searchItem', function(req, res, next){
    models.course.findAndCountAll({
        where: {
            [Op.or]:[
            {professor: {
                [Op.like]: "%"+req.query.search+"%"
            }},
            {code:{
                [Op.like]: "%"+req.query.search+"%"
            }},
            {lecture:{
                [Op.like]: "%"+req.query.search+"%"
            }},
            {location:{
                [Op.like]: "%"+req.query.search+"%"
            }},
            {start_time:{
                [Op.like]: "%"+req.query.search+"%"
            }},
            {end_time:{
                [Op.like]: "%"+req.query.search+"%"
            }},
            {dayofweek:{
                [Op.like]: "%"+req.query.search+"%"
            }}]
        }
    })
    .then(result => {
        res.send(result);
        console.log(result.count);
        console.log(result.rows);
    });
})
router.get('/seleteItem', function(req, res, next){
    models.course.findOne({
        where: {
            code:req.query.code,
        }
    })
    .then(result => {
        res.send(result);
    });
})
router.post('/addschedule', function (req, res, next) {
    models.schedule.findAll({
        include :[{
            model: models.course
        }]
    }).then((schedule) =>{
        if(schedule.length <= 0){
            createschedule();
        }
        models.course.findOne({
            where:{
                code : req.body.code
            }
        }).then((course)=>{
            let table = {'월':[],'화':[],'수':[],'목':[],'금':[]};
            let c_week = course.dayofweek.split("");
            let insert = true;
            schedule.forEach(sche=>{
                if(sche.course.code == req.body.code){
                    insert = false;
                } 
                let week = sche.course.dayofweek.split("");
                week.forEach(day => {
                    table[day].push({
                        lecture: sche.course.lecture,
                        start_time: sche.course.start_time,
                        end_time: sche.course.end_time
                    });
                });
                c_week.forEach(c=>{
                    table[c].forEach(t=>{
                        if(course.start_time == t.start_time
                        || (course.start_time < t.start_time && course.start_time >  t.end_time )){
                            insert = false;
                        }
                    })
                })
            })
            if(insert){
                createschedule();
            }else{
                res.send(false);
            }
        });
    }).catch(function(err) {
        console.log("find:::",err);
    });
    function createschedule() {
        models.schedule.create({
            code : req.body.code,
            memo : ''
        }).then(result => {
            res.send(result);
        }).catch(function(err) {
            console.log("insert:::",err);
        });
    }
})

router.post('/deleteschedule', function (req, res, next) {
    models.schedule.destroy({where:{code:req.body.code}}).then(schedule => {
        res.send(schedule > 0)
      }).catch(function (error){
        console.log(error);
      });
})
router.post('/addMemo', function (req, res, next) {
    models.schedule.findOne({where:{code:req.body.code}}).then(schedule => {
        var newMemo = !(schedule.memo) ? [] : JSON.parse(schedule.memo);
        newMemo.push({title: req.body.title, message: req.body.message});

        schedule.update({memo: JSON.stringify(newMemo)}).then(result=>{
            res.send(result);
        })
    }).catch(function (error){
        console.log(error);
    });
})

router.get('/seletescheduleItem', function(req, res, next){
    models.schedule.findOne({
        include: [{
          model: models.course,
          where: {
            lecture:req.query.lecture,
            } 
        }]
      }).then(result => {
        res.send({
            lecture: result.course.lecture,
            dayofweek: result.course.dayofweek,
            location: result.course.location,
            start_time: result.course.start_time,
            end_time: result.course.end_time,
            professor: result.course.professor,
            code: result.code,
            memo: result.memo
        });
    });  
})

router.post('/deleteMemo', function (req, res, next) {
    models.schedule.findOne({
        where:{code:req.body.code}
    }).then(schedule => {
        var memo = JSON.parse(schedule.memo);
        memo.splice(req.body.deletememo, 1);
        schedule.update({memo: JSON.stringify(newMemo)}).then(result=>{
            res.send(result);
        })
    });
})
module.exports = router;
