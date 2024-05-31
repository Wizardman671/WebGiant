function saveTasks(){
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
 
function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks){
        tasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }
}
 
document.getElementById('task-form').addEventListener('submit', function(e){
    e.preventDefault();
 
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
 
    if (task){
        addTask(task);
    }
});
 
function addTask(task, completed=false){
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    if(completed){
        li.classList.add('completed');
    }
 
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);
 
    taskList.appendChild(li);
    saveTasks();
}
 
document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
        e.target.classList.toggle('completed');
    }
});
 
 
document.getElementById('task-list').addEventListener('click', function(e){
    if (e.target.classList.contains('delete-btn')){
        const li = e.target.parentElement;
        li.remove();
        saveTasks();
    }
   
});
 
window.addEventListener('load', loadTasks);
