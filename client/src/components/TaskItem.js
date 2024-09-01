import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';


const TaskItem = ({ task, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);

    const toggleCompletion = async () => {
        await axios.put(`${API_URL}/api/tasks/${task._id}`, { isCompleted: !task.isCompleted });
        window.location.reload();
    };

    const saveEdit = async () => {
        await axios.put(`${API_URL}/api/tasks/${task._id}`, { title });
        setIsEditing(false);
        window.location.reload();
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <button onClick={saveEdit}>Save</button>
                </>
            ) : (
                <>
                    <span style={{ textDecoration: task.isCompleted ? 'line-through' : '' }}>{task.title}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={toggleCompletion}>
                {task.isCompleted ? 'Unmark' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
    );
};

export default TaskItem;
