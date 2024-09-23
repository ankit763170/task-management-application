import React from 'react';

const TaskSorter = ({ filter, setFilter }) => {
  return (
    <div className="mb-4">
      <label className="mr-2">Filter by status:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2">
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskSorter;
