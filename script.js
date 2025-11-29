// script.js
// Advanced To-Do List application with DOM manipulation and localStorage persistence.

// Wait until the DOM is fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory tasks array (source of truth)
    let tasks = [];

    // Load tasks from localStorage and render them
    function loadTasks() {
        const stored = localStorage.getItem('tasks');
        if (stored) {
            try {
                tasks = JSON.parse(stored);
                if (!Array.isArray(tasks)) tasks = [];
            } catch (e) {
                // If parsing fails, reset tasks to an empty array.
                tasks = [];
            }
        } else {
            tasks = [];
        }
        renderTasks();
    }

    // Save current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render the tasks array to the DOM
    function renderTasks() {
        // Clear current list
        taskList.innerHTML = '';

        // Create li for each task and attach remove handler
        tasks.forEach((taskText, index) => {
            const li = document.createElement('li');

            // Task text container (so we can allow future formatting)
            const span = document.createElement('span');
            span.textContent = taskText;
            li.appendChild(span);

            // Remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';

            // When clicked, remove this task from tasks array and re-render & save
            removeBtn.addEventListener('click', () => {
                // Remove the task at this index
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Create a new task and (optionally) save it to localStorage
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Add to in-memory array and persist
        tasks.push(taskText);
        saveTasks();

        // Re-render list and clear input
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }

    // Event listeners
    addButton.addEventListener('click', addTask);

    // Allow "Enter" key to add task
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
