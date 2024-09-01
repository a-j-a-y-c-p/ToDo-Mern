import React, { useState } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:5000';

const TaskForm = () => {
    const [title, setTitle] = useState('');

    const addTask = async (e) => {
        e.preventDefault();
        if (title.trim()) {
            await axios.post(`${API_URL}/api/tasks`, { title });
            setTitle('');
            window.location.reload();
        }
    };

    return (
        <form onSubmit={addTask}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
