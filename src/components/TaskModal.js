import React, { useState, useEffect } from 'react';
import './TaskModal.css';

export default function TaskModal({ isOpen, onClose, onSubmit, task, isLoading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'pending');
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    onClose();
  };

  return (
    <div className="tm-backdrop">
      <form className="tm-modal" onSubmit={submit}>
        <h3>{task ? 'Edit Task' : 'New Task'}</h3>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
        <select value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="tm-actions">
          <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" type="submit" disabled={isLoading}>{isLoading? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
