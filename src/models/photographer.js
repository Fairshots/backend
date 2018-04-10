'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photographer = sequelize.define('Photographer', {
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    ProfPicture: DataTypes.STRING
  }, {});
  Photographer.associate = function(models) {
    // associations can be defined here
  };
  return Photographer;
};