

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Photographer = sequelize.define('Photographer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true

    },
    Name: {
      type: DataTypes.STRING,  // need some validation to disallow blank space string
      allowNull: false,
      validate: { isAlphanumeric: true }
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
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
    ProfilePic: DataTypes.STRING,
    Languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    Causes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Country: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Photographer.associate = (models) => {
    // associations can be defined here
    Photographer.hasMany(models.Photos, {foreignKey: 'photographerId'});
    Photographer.belongsToMany(models.Project,
    {through: {
      model: models.Application,
      unique: false
    }, foreignKey: 'photographerId', otherKey: 'projectId'});

  };

  Photographer.beforeCreate((photographer, options) => bcrypt.hash(photographer.Password, 10)
    .then(hash => {
      photographer.Password = hash;
    })
    .catch(err => {
      throw new Error(err);
    }));

  Photographer.prototype.isValidPassword = function (password) {
    return bcrypt.compare(password, this.Password);
  };


  return Photographer;
};
