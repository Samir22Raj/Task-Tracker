import React from 'react';
import './FilterBar.css';

export default function FilterBar({ filterStatus, onFilterChange, sortBy, onSortChange, sortOrder, onSortOrderChange, taskCount }) {
  return (
    <div className="fb-root">
      <div className="fb-left">
        <label>
          Status:
          <select value={filterStatus} onChange={(e)=>onFilterChange(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
      </div>
      <div className="fb-right">
        <label>
          Sort:
          <select value={sortBy} onChange={(e)=>onSortChange(e.target.value)}>
            <option value="date">Date</option>
            <option value="name">Name</option>
          </select>
        </label>
        <button className="btn" onClick={onSortOrderChange}>{sortOrder==='asc'? 'Asc' : 'Desc'}</button>
        <div className="fb-count">{taskCount} tasks</div>
      </div>
    </div>
  );
}
