import React from 'react';

const TaskItem = ({ task, updateTask, deleteTask, setCurrentTask }) => {
  const handleComplete = () => {
    updateTask(task.id, {
      ...task,
      status: task.status === 'Completed' ? 'Pending' : 'Completed',
      completed_at: task.status === 'Completed' ? null : new Date(),
    });
  };

  return (
    <div className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Due Date: {task.due_date}</p>
        {task.completed_at && (
          <p>Completed At: {new Date(task.completed_at).toLocaleString()}</p>
        )}
      </div>
      <div>
        <button className="add" onClick={() => setCurrentTask(task)}>
          Edit
        </button>
        <button className="add" onClick={handleComplete}>
          {task.status === 'Completed' ? 'Undo' : 'Complete'}
        </button>
        <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
