// Simple mock API using localStorage with small artificial delay
const STORAGE_KEY = 'task-tracker:tasks';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const read = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const write = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export async function fetchTasks() {
  await delay(120);
  return read();
}

export async function createTask(task) {
  await delay(100);
  const tasks = read();
  const newTask = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...task };
  tasks.unshift(newTask);
  write(tasks);
  return newTask;
}

export async function updateTask(id, patch) {
  await delay(80);
  const tasks = read();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error('Task not found');
  tasks[idx] = { ...tasks[idx], ...patch };
  write(tasks);
  return tasks[idx];
}

export async function deleteTask(id) {
  await delay(60);
  const tasks = read().filter((t) => t.id !== id);
  write(tasks);
  return true;
}

export async function clearAllTasks() {
  await delay(20);
  write([]);
}
