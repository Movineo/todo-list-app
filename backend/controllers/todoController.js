// Import Sequelize models
const { Todo } = require('../models');

// Controller methods
const getAllTodos = async (req, res) => {
    try {
        // Fetch all todos from the database
        const todos = await Todo.findAll();
        // Send the todos as JSON response
        res.json(todos);
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createTodo = async (req, res) => {
    // Extract todo data from request body
    const { title, description } = req.body;
    try {
        // Create a new todo in the database
        const newTodo = await Todo.create({ title, description });
        // Send the newly created todo as JSON response
        res.status(201).json(newTodo);
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTodo = async (req, res) => {
    // Extract todo ID and updated data from request body
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        // Find the todo by ID in the database
        const todo = await Todo.findByPk(id);
        if (!todo) {
            // If todo with the specified ID is not found, send a 404 response
            return res.status(404).json({ error: 'Todo not found' });
        }
        // Update the todo with the new data
        todo.title = title;
        todo.description = description;
        // Save the updated todo to the database
        await todo.save();
        // Send the updated todo as JSON response
        res.json(todo);
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteTodo = async (req, res) => {
    // Extract todo ID from request parameters
    const { id } = req.params;
    try {
        // Find the todo by ID in the database
        const todo = await Todo.findByPk(id);
        if (!todo) {
            // If todo with the specified ID is not found, send a 404 response
            return res.status(404).json({ error: 'Todo not found' });
        }
        // Delete the todo from the database
        await todo.destroy();
        // Send a success response
        res.status(204).end();
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export controller methods
module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
