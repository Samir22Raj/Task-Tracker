import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/mockApi';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (task) => {
    const created = await api.createTask(task);
    setTasks((t) => [created, ...t]);
    return created;
  };

  const updateTaskItem = async (id, patch) => {
    const updated = await api.updateTask(id, patch);
    setTasks((t) => t.map((x) => (x.id === id ? updated : x)));
    return updated;
  };

  const removeTask = async (id) => {
    await api.deleteTask(id);
    setTasks((t) => t.filter((x) => x.id !== id));
  };

  return { tasks, loading, error, addTask, updateTaskItem, removeTask, reload: loadTasks };
}
