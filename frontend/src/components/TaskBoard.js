import React from 'react';

function TaskBoard({ tasks, onEdit, onDelete }) {
  return (
    <div>
      <h3>Your Tasks</h3>
      {tasks.map((task) => (
        <div key={task.id}>
          <strong>{task.title}</strong> - {task.description}
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskBoard;
