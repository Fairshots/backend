

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Photos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    cloudlink: {
      type: Sequelize.STRING
    },
    organizationId: {
      type: Sequelize.UUID,
      references: {
        model: 'Organizations',
        key: 'id',
        as: 'organizationId'
      },
    },
    photographerId: {
      type: Sequelize.UUID,
      references: {
        model: 'Photographers',
        key: 'id',
        as: 'photographerId'
      },
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Photos')
};
