
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Admins', {
    id: {
      allowNull: false,
      primaryKey: true,
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Admins')
};
