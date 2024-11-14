const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

const api = 'http://localhost:3000/api/todo';

// Load tasks from the API
async function loadTasks() {
  try {
    const response = await fetch(api, { cache: 'no-store' });
    const tasks = await response.json();
    taskList.innerHTML = ''; // Clear current list
    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('todo-item');
      taskItem.innerHTML = `
        <span id="task-text-${task._id}">${task.task}</span>
        <div>
          <button class="complete" onclick="toggleComplete('${task._id}', ${task.completed})">${task.completed ? 'Undo' : 'Complete'}</button>
          <button class="edit" onclick="editTask('${task._id}')">Edit</button>
          <button class="delete" onclick="deleteTask('${task._id}')">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

// Add a new task
async function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return; // Don't add empty tasks

  const newTask = { task: taskText, completed: false };
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      taskInput.value = ''; // Clear input field
      loadTasks(); // Reload the task list
    } else {
      alert('Error adding task!');
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

// Edit a task
async function editTask(taskId) {
  const taskText = document.getElementById(`task-text-${taskId}`).textContent;
  const newTaskText = prompt("Edit your task:", taskText);

  if (newTaskText === null || newTaskText === '') return;

  const updatedTask = { task: newTaskText };
  try {
    const response = await fetch(`${api}/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      loadTasks(); // Reload the task list
    } else {
      alert('Error updating task!');
    }
  } catch (error) {
    console.error('Error editing task:', error);
  }
}

// Delete a task
async function deleteTask(taskId) {
  const confirmed = confirm('Are you sure you want to delete this task?');
  if (!confirmed) return;

  try {
    const response = await fetch(`${api}/${taskId}`, { method: 'DELETE' });
    if (response.ok) {
      loadTasks(); // Reload the task list
    } else {
      alert('Error deleting task!');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Toggle task completion
async function toggleComplete(taskId, completed) {
  const updatedTask = { completed: !completed };
  try {
    const response = await fetch(`${api}/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      loadTasks(); // Reload the task list
    } else {
      alert('Error updating task!');
    }
  } catch (error) {
    console.error('Error toggling task completion:', error);
  }
}

// Add event listener to the add task button
addTaskButton.addEventListener('click', addTask);

// Load tasks on page load
window.onload = loadTasks;
