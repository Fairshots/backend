'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Organizations',
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });

    */

    'accountInactive', {
      type: Sequelize.BOOLEAN,
      //allowNull: false
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Organizations', 'accountInactive'
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  )
};
