import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get(`${API_URL}/api/tasks`);
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/api/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
    };

    const editTask = (task) => {
        setIsEditing(task._id);
        setEditTitle(task.title);
    };

    const saveTask = async (id) => {
        await axios.put(`${API_URL}/api/tasks/${id}`, { title: editTitle });
        setTasks(tasks.map(task => task._id === id ? { ...task, title: editTitle } : task));
        setIsEditing(null);
    };

    const toggleCompletion = async (id, completed) => {
        await axios.put(`${API_URL}/api/tasks/${id}`, { completed: !completed });
        setTasks(tasks.map(task => task._id === id ? { ...task, completed: !task.completed } : task));
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Task List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            <td>
                                {isEditing === task._id ? (
                                    <input 
                                        type="text" 
                                        value={editTitle} 
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                ) : (
                                    task.title
                                )}
                            </td>
                            <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
                            <td className="action-buttons">
                                {isEditing === task._id ? (
                                    <button className="save" onClick={() => saveTask(task._id)}>Save</button>
                                ) : (
                                    <button className="edit" onClick={() => editTask(task)}>Edit</button>
                                )}
                                <button className="delete" onClick={() => deleteTask(task._id)}>Delete</button>
                                <button className="complete" onClick={() => toggleCompletion(task._id, task.completed)}>
                                    {task.completed ? 'Undo' : 'Complete'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
