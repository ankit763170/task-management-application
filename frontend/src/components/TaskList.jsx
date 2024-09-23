import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, updateTask, deleteTask, setCurrentTask }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            updateTask={updateTask} 
            deleteTask={deleteTask} 
            setCurrentTask={setCurrentTask} 
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
