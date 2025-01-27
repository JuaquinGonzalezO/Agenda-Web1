
let tasks = [];
let editingIndex = null; 


const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('priority');
const taskListElement = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');


function renderTasks() {
    
    taskListElement.innerHTML = '';

    tasks.sort((a, b) => a.priority - b.priority);


    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${task.description} (${getPriorityName(task.priority)})
            <div>
                <button class="btn btn-sm btn-success me-2" onclick="editTask(${index})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Eliminar</button>
            </div>
        `;
        taskListElement.appendChild(li);
    });
}


function addTask(event) {
    event.preventDefault();

    const taskDescription = taskInput.value.trim();
    const taskPriority = prioritySelect.value;


    if (!taskDescription) {
        alert('Por favor, ingresa una descripción de la tarea.');
        return;
    }

    if (taskPriority === 'default') {
        alert('Por favor, selecciona una prioridad.');
        return;
    }

    if (editingIndex !== null) {
        tasks[editingIndex] = { description: taskDescription, priority: parseInt(taskPriority) };
        editingIndex = null;
    } else {

        tasks.push({ description: taskDescription, priority: parseInt(taskPriority) });
    }
    taskInput.value = '';
    prioritySelect.value = 'default';
    renderTasks();
}
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}


function editTask(index) {
    const task = tasks[index];
    taskInput.value = task.description;
    prioritySelect.value = task.priority;
    editingIndex = index;
}

function getPriorityName(priority) {
    const priorityNames = {
        1: 'Alta',
        2: 'Media',
        3: 'Baja'
    };
    return priorityNames[priority] || 'Desconocida';
}

taskForm.addEventListener('submit', addTask);

renderTasks();
