'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Applications', {

      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id',
          as: 'projectId'
        }
      },
      photographerId: {
        type: Sequelize.UUID,
        references: {
          model: 'Photographers',
          key: 'id',
          as: 'photographerId'
        }
      },
      answer1: {
        type: Sequelize.STRING
      },
      answer2: {
        type: Sequelize.STRING
      },
      answer3: {
        type: Sequelize.STRING
      },
      selected: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Applications');
  }
};