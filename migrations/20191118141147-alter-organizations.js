'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn('Organizations','emailVerified', {
      type: Sequelize.BOOLEAN
    }),
    queryInterface.addColumn('Organizations','lastLogin', {
      type: Sequelize.DATE
    }),
    queryInterface.addColumn('Organizations','loginsCount', {
      type: Sequelize.INTEGER
    })
    ]
  )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  ,

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      
      
    */
    
    Promise.all([
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    queryInterface.removeColumn('Organizations','emailVerified'),
    queryInterface.removeColumn('Organizations','lastLogin'),
    queryInterface.removeColumn('Organizations','loginsCount')
    ]
  )
  }
};
