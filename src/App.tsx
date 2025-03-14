import React, { useState, useEffect } from 'react';
import { Task } from './types/Task';
import TaskList from './components/TaskList';
import { fetchTasks, addTask, deleteTask } from './api/taskApi';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = "http://54.85.34.222:3000/";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    loadTasks();

    // Initialize WebSocket connection inside useEffect
    const newSocket = io(SOCKET_URL, { transports: ['websocket'] });
    setSocket(newSocket);

    // Listen for task updates
    newSocket.on('tasksUpdated', (updatedTasks: Task[]) => {
      console.log('Received update from WebSocket:', updatedTasks);
      setTasks(updatedTasks);
    });

    // Cleanup function to close socket and remove listeners on unmount
    return () => {
      newSocket.off('tasksUpdated'); // Remove listener
      newSocket.disconnect(); // Close connection
    };
  }, []);

  const handleAddTask = async () => {
    if (title.trim() === '') return;
    await addTask(title);
    setTitle(''); // No need to manually update, WebSocket will handle it
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
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
