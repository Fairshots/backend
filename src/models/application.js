'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    answer1: DataTypes.STRING,
    answer2: DataTypes.STRING,
    answer3: DataTypes.STRING,
    selected: DataTypes.BOOLEAN
  }, {});
  Application.associate = function(models) {
    Application.belongsTo(models.Photographer, { foreignKey: 'photographerId', onDelete: 'CASCADE', hooks: true });
    Application.belongsTo(models.Project, { foreignKey: 'projectId', onDelete: 'CASCADE', hooks: true });
  };
  return Application;
};