

module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define('Photos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cloudlink: DataTypes.STRING
  }, {});
  Photos.associate = (models) => {
    // associations can be defined here
    Photos.belongsTo(models.Photographer, { foreignKey: 'photographerId', onDelete: 'CASCADE' });
    Photos.belongsTo(models.Organization, { foreignKey: 'organizationId', onDelete: 'CASCADE' });
  };
  return Photos;
};
