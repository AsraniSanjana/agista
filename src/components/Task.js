import React from 'react';
import './Task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'; // Import the user and exclamation-circle icons

const Task = ({ task }) => {
  const isFeatureRequest = task.tag.includes('Feature Request'); // Check if the tag array includes 'Feature Request'

  return (
    <div className={`task-container`}>
      <div className="task-header">
        <input type="checkbox" />
        <h3 className='task-title'>{task.title}</h3>
      </div>
      <div className="task-details">
        <p>Priority: {task.priority}</p> 
        <p>Status: {task.status}</p>
        
        <div className="type-label">
          {isFeatureRequest && (
            <p>
              <FontAwesomeIcon icon={faExclamationCircle} className="fa-icon" />
              Feature Request
            </p>
          )}
        </div>
        
        <div className="user-label"><p>
          <FontAwesomeIcon icon={faUser} className="fa-icon" />
          User: {task.user}</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
