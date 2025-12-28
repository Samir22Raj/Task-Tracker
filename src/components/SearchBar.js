import React from 'react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="sb-root">
      <input className="sb-input" value={value} onChange={(e)=>onChange(e.target.value)} placeholder="Search tasks..." />
      <button className="btn btn-secondary" onClick={onClear}>Clear</button>
    </div>
  );
}
