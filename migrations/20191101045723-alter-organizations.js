'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('Organizations',
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });

    */

    'Background', {
      type: Sequelize.TEXT
      //allowNull: false
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Organizations', 'Background'
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  )
};
