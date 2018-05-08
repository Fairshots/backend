'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define('Photos', {
    cloudlink: DataTypes.STRING
  }, {});
  Photos.associate = (models) => {
    // associations can be defined here
  };
  return Photos;
};