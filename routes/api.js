var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelize = require("sequelize");
var Op = sequelize.Op;

router.get('/getList', function(req, res, next){
    models.course.findAll().then(course => {
        res.send(course)
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

module.exports = router;
