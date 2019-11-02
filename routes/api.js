var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelize = require("sequelize");
var Op = sequelize.Op;

router.get('/getList', function(req, res, next){
    models.course.findAll().then(course => {
        models.schedule.findAll({
            include: [{
              model: models.course 
            }]
          }).then(schedule => {
        res.send(schedule)
          });
    });
})
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
        where: {code:req.query.code}
    })
    .then(result => {
        res.send(result);
    });
})
router.post('/addschedule', function (req, res, next) {
    models.schedule.findOrCreate({
        where:{code:req.body.code},
        defaults:{
            code:req.body.code,
            memo:''
        }
    }).then(([schedule, created]) =>{
        res.send(created);
    });
})

module.exports = router;
