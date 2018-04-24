'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photographer = sequelize.define('Photographer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true

    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true}
    },
    Skill: {
      type: DataTypes.ENUM('Student', 'Amateur', 'Professional'),
      allowNull: false
    },
    Biography: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    webpage: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    ProfPicture: DataTypes.STRING
  }, {});
  Photographer.associate = (models) => {
    // associations can be defined here
    // Create :
    // causes
    // country
    // location
  };
  return Photographer;
};