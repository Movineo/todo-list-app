// src/components/AddTodo.js

import React, { useState } from 'react';

function AddTodo({ addTodo }) {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.trim()) {
            try {
                const response = await fetch('/api/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text })
                });
                const newTodo = await response.json();
                addTodo(newTodo);
                setText('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodo;
