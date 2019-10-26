'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
,
    queryInterface.addColumn('Photographers','emailVerified', {
      type: Sequelize.BOOLEAN
    }),
    queryInterface.addColumn('Photographers','lastLogin', {
      type: Sequelize.DATE
    }),
    queryInterface.addColumn('Photographers','loginsCount', {
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

    queryInterface.removeColumn('Photographers','emailVerified'),
    queryInterface.removeColumn('Photographers','lastLogin'),
    queryInterface.removeColumn('Photographers','loginsCount')
    ]
  )
  }
};
