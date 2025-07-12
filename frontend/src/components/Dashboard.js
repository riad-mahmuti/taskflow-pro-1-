import React, { useState, useEffect } from 'react';
import TaskBoard from './TaskBoard';
import TaskModal from './TaskModal';
import API from '../api';
import { logout } from '../auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreate = async (task) => {
    await API.post('/tasks', task);
    fetchTasks();
  };

  const handleUpdate = async (task) => {
    await API.put(`/tasks/${task.id}`, task);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>Task Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <TaskModal onSave={editingTask ? handleUpdate : handleCreate} task={editingTask} />
      <TaskBoard tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
