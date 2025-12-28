import React from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="ti-card">
      <div className="ti-main">
        <div className="ti-title">{task.title}</div>
        <div className="ti-desc">{task.description}</div>
      </div>
      <div className="ti-actions">
        <select value={task.status} onChange={(e)=>onToggleStatus(task.id,e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button className="btn" onClick={onEdit}>Edit</button>
        <button className="btn btn-secondary" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
