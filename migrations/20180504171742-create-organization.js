
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Organizations', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Parent: {
      type: Sequelize.STRING
    },
    Logo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    ContactPerson: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Position: {
      type: Sequelize.STRING
    },
    Phone: {
      type: Sequelize.STRING
    },
    Background: {
      type: Sequelize.STRING
    },
    website: {
      type: Sequelize.STRING,
      allowNull: false
    },
    facebook: {
      type: Sequelize.STRING
    },
    FundingPartner: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    City: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Languages: {
      type:Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false
    },
    Causes: {
      type:Sequelize.ARRAY(Sequelize.STRING),
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Organizations')
};
