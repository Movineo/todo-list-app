// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        if (!newTodo.trim()) return;
        try {
            const response = await axios.post('http://localhost:5000/api/todos', { title: newTodo });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleComplete = async (id) => {
        try {
            const todo = todos.find(todo => todo.id === id);
            const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !todo.completed });
            setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Todo List</h1>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task"
                />
                <button type="submit">Add</button>
            </form>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <span onClick={() => toggleComplete(todo.id)}>{todo.title}</span>
                        <div>
                            <button className="edit" onClick={() => toggleComplete(todo.id)}>
                                {todo.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
