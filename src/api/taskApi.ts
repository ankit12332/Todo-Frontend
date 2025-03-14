import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = 'http://54.85.34.222:3000/tasks';  // Change this when deploying

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const res = await axios.get<Task[]>(API_URL);
    return res.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const addTask = async (title: string): Promise<Task | null> => {
  if (!title.trim()) return null;
  try {
    const res = await axios.post<Task>(API_URL, { title });
    return res.data;
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};
