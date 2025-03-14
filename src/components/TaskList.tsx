import React from 'react';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-50 p-2 mb-2 rounded-lg shadow-sm"
        >
          <span>{task.title}</span>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
