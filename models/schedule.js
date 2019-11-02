'use strict';
module.exports = (sequelize, DataTypes) => {
  const schedule = sequelize.define('schedule', {
    code: DataTypes.STRING,
    memo: DataTypes.TEXT
  }, {});
  schedule.associate = function(models) {
    // associations can be defined here
  };
  return schedule;
};