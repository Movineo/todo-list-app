// src/components/TodoItem.js
import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <span onClick={() => toggleTodo(todo.id)}>
        {todo.text}
      </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;
