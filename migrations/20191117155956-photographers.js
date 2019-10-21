'use strict';

const worker = require('../seeders/worker');

const [photographers, photos] = worker();



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
    const result = await queryInterface.bulkInsert('Photographers', photographers)
    return queryInterface.bulkInsert('Photos', photos)
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
  queryInterface.bulkDelete('Photographers', null, {})
};
