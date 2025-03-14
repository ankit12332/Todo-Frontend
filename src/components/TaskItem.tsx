import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => (
  <li>
    {task.title}
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </li>
);

export default TaskItem;
