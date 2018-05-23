
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Photographers', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    webpage: {
      type: Sequelize.STRING
    },
    facebook: {
      type: Sequelize.STRING
    },
    instagram: {
      type: Sequelize.STRING
    },
    ProfilePic: {
      type: Sequelize.STRING
    },
    Languages: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    Skill: {
      type: Sequelize.ENUM('Student', 'Amateur', 'Professional'),
      allowNull: false
    },
    Biography: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    Causes: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    City: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Country: {
      type: Sequelize.STRING,
      allowNull: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Photographers')
};
