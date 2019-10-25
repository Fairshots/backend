'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Organizations',
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    'featured', {
      type: Sequelize.BOOLEAN,
      //allowNull: false
    }

  )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  ,

  down: (queryInterface, Sequelize) => 
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    
    queryInterface.removeColumn('Organizations',
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    'featured', {
      type: Sequelize.BOOLEAN,
      //allowNull: false
    },
    'emailVerified', {
      type: Sequelize.BOOLEAN
    },
    'lastLogin', {
      type: Sequelize.DATE
    },
    'loginsCount', {
      type: Sequelize.INTEGER
    }
  )
};
