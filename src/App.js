import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import GroupSelector from './components/GroupSelector';
import './App.css';
// import { faEllipsisH,faPlusSquare } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');



  useEffect(() => {
    // fetching data from the API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        // extracting "tickets" & "users" arrays from the API response
        const initialTasks = data.tickets;
        const users = data.users;
  
        //updating the "user" property for each task
        const tasksWithUsers = initialTasks.map(task => {
          const user = users.find(user => user.id === task.userId);
          return { ...task, user: user.name };
        });
  
        setTasks(tasksWithUsers);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);
  

  const onGroupingChange = (e) => {
    setGrouping(e.target.value);
    // console.log("grouping changed to: ",e.target.value);
  };

  const onOrderingChange = (e) => {
    setOrdering(e.target.value);
    // console.log("ordering changed to: ",e.target.value);
  };

  const groupTasks = () => {
    let groupedTasks = [];
  
    // grouping logic
    if (grouping === 'status') {

      /*
The reduce function is used to group tasks into an object, 
where keys are the group criteria values (e.g., status, user, priority), 
and values are arrays of tasks belonging to that group.

      */
      groupedTasks = tasks.reduce((grouped, task) => {
        const status = task.status;
        if (!grouped[status]) {
          grouped[status] = [];
        }
        grouped[status].push(task);
        return grouped;
      }, {});
    } else if (grouping === 'user') {
      groupedTasks = tasks.reduce((grouped, task) => {
        const user = task.user;
        if (!grouped[user]) {
          grouped[user] = [];
        }
        grouped[user].push(task);
        return grouped;
      }, {});
    } else if (grouping === 'priority') {
      groupedTasks = tasks.reduce((grouped, task) => {
        const priority = task.priority;
        if (!grouped[priority]) {
          grouped[priority] = [];
        }
        grouped[priority].push(task);
        return grouped;
      }, []);
    }
  
    // flatten groupedTasks to an array of arrays
    groupedTasks = Object.values(groupedTasks);
  
  // ordering Logic
  if (ordering === 'priority') {
    groupedTasks.sort((groupA, groupB) => groupB[0].priority - groupA[0].priority);
  }


return groupedTasks;
  };

  return (
    <div className="App">

<h1>Agista: Agile Vista - A kanban board to keep track of tasks  &#x1F60A; </h1>
      <hr/>
      <GroupSelector
        grouping={grouping}
        ordering={ordering}
        onGroupingChange={onGroupingChange}
        onOrderingChange={onOrderingChange}
      />
   
      
   <div className="kanban-board">
  {groupTasks().map((group, index) => (

    
    <div className={grouping === 'priority' ? 'task-group priority-group' : 'task-group'} key={index}>
      {grouping === 'priority' && (
        <div className="group-heading">
          
          {/* <FontAwesomeIcon icon={faEllipsisH} className="dots-icon" /> */}
            Priority: {group[0].priority}
            {/* <FontAwesomeIcon icon={faPlusSquare} className="icon" /> */}
        
        </div>
      )}
      {grouping === 'user' && (
        <div className="group-heading">
          
          {/* <FontAwesomeIcon icon={faEllipsisH} className="dots-icon" /> */}
          User: {group[0].user}
          {/* <FontAwesomeIcon icon={faPlusSquare} className="icon" /> */}
        </div>
      )}
      {grouping === 'status' && (
        <div className="group-heading">
          
          {/* <FontAwesomeIcon icon={faEllipsisH} className="dots-icon" /> */}
          Status: {group[0].status}
          {/* <FontAwesomeIcon icon={faPlusSquare} className="icon" /> */}
        </div>
      )}
      {group.map(task => (
        <Task key={task.id} task={task} />



        
      ))}
    </div>
  ))}
</div> 
    </div>
  );
};

export default App;
