'use strict';

const worker = require('../seeders/orgworker');

const orgs = worker();



module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    try {
    const result = await queryInterface.bulkInsert('Organizations', orgs)
    }
    catch(e) {
      console.log(e)
      return e
    }
  }
  ,

  down: (queryInterface, Sequelize) => 
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  queryInterface.bulkDelete('Organizations', null, {})
};
