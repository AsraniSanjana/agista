import React from 'react';

const GroupSelector = ({ grouping, ordering, onGroupingChange, onOrderingChange }) => {
  return (
    <div className="group-selector">
      <select value={grouping} onChange={onGroupingChange}>
        <option value="status">Group by Status</option>
        <option value="user">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>
      <select value={ordering} onChange={onOrderingChange}>
        <option value="priority">Order by Priority</option>
        <option value="title">Order by Title</option>
      </select>
    </div>
  );
};

export default GroupSelector;
