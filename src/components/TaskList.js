import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

export default function TaskList({ tasks = [], onEdit, onDelete, onToggleStatus, isLoading, emptyMessage }) {
  if (isLoading) return <div className="tl-loading">Loading tasks...</div>;
  if (!tasks || tasks.length === 0) return <div className="tl-empty">{emptyMessage}</div>;

  return (
    <div className="tl-list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} onToggleStatus={onToggleStatus} />
      ))}
    </div>
  );
}
