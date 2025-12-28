import React, { useState, useMemo } from 'react';
import {
  TaskList,
  TaskModal,
  SearchBar,
  FilterBar,
} from './components';
import { useTasks, useDebounce, useSort } from './hooks';
import './App.css';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalLoading, setModalLoading] = useState(false);

  // Custom hooks
  const { tasks, loading, error, addTask, updateTaskItem, removeTask } = useTasks();
  const debouncedSearch = useDebounce(searchInput, 300);
  const { sortedTasks, sortBy, setSortBy, sortOrder, toggleSortOrder } = useSort(
    tasks,
    'date'
  );

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return sortedTasks.filter((task) => {
      // Filter by status
      if (filterStatus !== 'all' && task.status !== filterStatus) {
        return false;
      }

      // Search in title and description
      const searchLower = debouncedSearch.toLowerCase();
      if (searchLower) {
        const titleMatch = task.title.toLowerCase().includes(searchLower);
        const descriptionMatch =
          task.description && task.description.toLowerCase().includes(searchLower);
        return titleMatch || descriptionMatch;
      }

      return true;
    });
  }, [sortedTasks, filterStatus, debouncedSearch]);

  // Handle adding new task
  const handleAddTask = async (formData) => {
    setModalLoading(true);
    try {
      await addTask({
        ...formData,
        status: formData.status || 'pending',
      });
    } catch (err) {
      console.error('Failed to add task:', err);
    } finally {
      setModalLoading(false);
    }
  };

  // Handle editing task
  const handleEditTask = async (formData) => {
    if (!editingTask) return;

    setModalLoading(true);
    try {
      await updateTaskItem(editingTask.id, formData);
      setEditingTask(null);
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setModalLoading(false);
    }
  };

  // Handle deleting task
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await removeTask(id);
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  // Handle toggling task status
  const handleToggleStatus = async (id, newStatus) => {
    try {
      await updateTaskItem(id, { status: newStatus });
    } catch (err) {
      console.error('Failed to toggle task status:', err);
    }
  };

  // Open modal for creating new task
  const openNewTaskModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  // Open modal for editing existing task
  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>📋 Task Manager</h1>
          <p className="subtitle">Organize and manage your tasks efficiently</p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={openNewTaskModal}>
          + Add Task
        </button>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}

        <div className="controls-section">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onClear={() => setSearchInput('')}
          />

          <FilterBar
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={toggleSortOrder}
            taskCount={filteredTasks.length}
          />
        </div>

        <TaskList
          tasks={filteredTasks}
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
          isLoading={loading}
          emptyMessage={
            debouncedSearch
              ? 'No tasks match your search'
              : 'No tasks found. Create one to get started!'
          }
        />
      </main>

      <TaskModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        task={editingTask}
        isLoading={modalLoading}
      />
    </div>
  );
}

export default App;
