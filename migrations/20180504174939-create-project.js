
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Projects', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    Title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    StartingDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    Duration: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ApplicationDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    Delivery: {
      type: Sequelize.DATE,
    },
    FundingOptions: {
      type: Sequelize.ENUM('No Funds', 'Expenses', 'Photographer'),
      allowNull: false
    },
    FundsAvailable: {
      type: Sequelize.STRING,
    },
    FundsDetails: {
      type: Sequelize.STRING,
    },
    FundsFairshot: {
      type: Sequelize.BOOLEAN,
    },
    PhotographersNeeded: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ProfessionalOnly: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    GeographicRestriction: {
      type: Sequelize.ENUM('Anywhere', 'Continent', 'Country', 'Region'),
    },
    Question1: {
      type: Sequelize.STRING,
    },
    Question2: {
      type: Sequelize.STRING,
    },
    Question3: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Projects')
};
