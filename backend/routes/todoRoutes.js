// backend/routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');

// Routes for todos
router.get('/', TodoController.getAllTodos);
router.post('/', TodoController.createTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
