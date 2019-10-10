'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all( [
    
    queryInterface.removeColumn('Organizations', 'FundingPartner'),
    queryInterface.removeColumn('Organizations', 'Parent'),
    
    ]
  ),

  down: (queryInterface, Sequelize) => queryInterface.addColumn('Organizations', 
  
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.addColumn('Organizations', 'Parent', { type: Sequelize.STRING }),
    queryInterface.addColumn('Organizations', 'FundingPartner', { type: Sequelize.STRING }),
    
    
  )
};
