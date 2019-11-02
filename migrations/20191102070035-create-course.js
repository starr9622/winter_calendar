'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('courses', {
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      lecture: {
        type: Sequelize.TEXT
      },
      professor: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.TEXT
      },
      start_time: {
        type: Sequelize.INTEGER
      },
      end_time: {
        type: Sequelize.INTEGER
      },
      dayofweek: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('courses');
  }
};