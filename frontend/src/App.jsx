import React, { useState, useEffect } from 'react';
import TaskForm from './components/Taskform';
import TaskList from './components/TaskList';
import axios from 'axios';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Due Date');
  const [currentTask, setCurrentTask] = useState(null); 

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const response = await axios.post('http://localhost:5000/api/tasks', task);
    setTasks((prevTasks) => [...prevTasks, response.data]);
  };

  const updateTask = async (id, updatedTask) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
    setTasks((prevTasks) => 
      prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
    setCurrentTask(null); 
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === 'All' || task.status === filter;

    return matchesSearch && matchesStatus;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'Due Date') {
      return new Date(a.due_date) - new Date(b.due_date);
    } else if (sort === 'Title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm 
        addTask={addTask} 
        updateTask={updateTask} 
        currentTask={currentTask} 
      />
      <div className="filter-sort">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="Due Date">Sort by Due Date</option>
          <option value="Title">Sort by Title</option>
        </select>
      </div>

      <TaskList 
        tasks={sortedTasks} 
        updateTask={updateTask} 
        deleteTask={deleteTask} 
        setCurrentTask={setCurrentTask} 
      />
    </div>
  );
};

export default App;
