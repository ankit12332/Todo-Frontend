import React, { useState, useEffect } from 'react';
import { Task } from './types/Task';
import TaskList from './components/TaskList';
import { fetchTasks, addTask, deleteTask } from './api/taskApi';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (title.trim() === '') return;
    const newTask = await addTask(title);
    if (newTask) {
      setTasks([...tasks, newTask]);
      setTitle('');
    }
  };

  const handleDeleteTask = async (id: string) => {
    const isDeleted = await deleteTask(id);
    if (isDeleted) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </div>
        <TaskList tasks={tasks} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
};

export default App;
