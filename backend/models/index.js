const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('todolist', 'postgres', 'ocholamo1', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define Task model
const Task = require('./task')(sequelize, DataTypes);

// Synchronize the model with the database
(async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchronize the model with the database
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Export the Sequelize instance, sequelize instance, and Task model
module.exports = { Sequelize, sequelize, Task };
