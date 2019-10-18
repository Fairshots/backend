'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Photos',
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    'projectId', {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Projects',
        key: 'id',
        as: 'projectId'
      },
    }
  ),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn('Projects', 'projectId');

  }
};