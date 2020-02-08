

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.TEXT
    },
  });

  return Admin;
};
