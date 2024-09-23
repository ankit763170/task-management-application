import React from 'react';

const TaskHistory = ({ completedTasks }) => {
  return (
    <div className="task-history">
      <h2>Completed Tasks History</h2>
      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        completedTasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title} (Completed on: {task.completedAt})</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskHistory;
