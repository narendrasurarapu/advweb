import React, { useState } from 'react';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState('');

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleEditChange = (e) => {
        setEditTask(e.target.value);
    };

    const handleEditSave = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: editTask } : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditTask('');
    };

    const handleDelete = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Enter a new task"
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {editIndex === index ? (
                            <span>
                                <input
                                    type="text"
                                    value={editTask}
                                    onChange={handleEditChange}
                                />
                                <button onClick={() => handleEditSave(index)}>Save</button>
                            </span>
                        ) : (
                            <span onClick={() => toggleTaskCompletion(index)}>
                                {task.text}
                            </span>
                        )}
                        <button onClick={() => setEditIndex(index) || setEditTask(task.text)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
