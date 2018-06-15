'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    answer1: DataTypes.STRING,
    answer2: DataTypes.STRING,
    answer3: DataTypes.STRING,
    selected: DataTypes.BOOLEAN
  }, {});
  Application.associate = function(models) {
    // associations can be defined here
  };
  return Application;
};