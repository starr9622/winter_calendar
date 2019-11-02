'use strict';
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    code: DataTypes.STRING,
    lecture: DataTypes.TEXT,
    professor: DataTypes.TEXT,
    location: DataTypes.TEXT,
    start_time: DataTypes.INTEGER,
    end_time: DataTypes.INTEGER,
    dayofweek: DataTypes.TEXT
  }, {});
  course.associate = function(models) {
    // associations can be defined here
  };
  course.removeAttribute('id');
  return course;
};