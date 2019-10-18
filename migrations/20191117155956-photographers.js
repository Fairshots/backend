'use strict';

const worker = require('../seeders/worker');

const [photographers, photos] = worker();



module.exports = {
  up: (queryInterface, Sequelize) => 
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    Promise.all([
    queryInterface.bulkInsert('Photographers', photographers),
    queryInterface.bulkInsert('Photos', photos),
    ]).catch((err) => console.log(err))
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
