const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('todolist', 'postgres', 'ocholamo1', {
  host: 'localhost',
  dialect: 'postgres'
});

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

sequelize.sync()
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Failed to create database & tables:', err));

module.exports = Task;
