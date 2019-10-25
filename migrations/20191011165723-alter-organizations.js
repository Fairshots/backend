'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { 
    queryInterface.renameColumn('Organizations', 'Causes', 'PrimaryCause')
    
   /* await queryInterface.changeColumn('Organizations','PrimaryCause',
    {
      type: Sequelize.STRING,
    }) */
  }
  ,

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Organizations', 'PrimaryCause'
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  )
};
