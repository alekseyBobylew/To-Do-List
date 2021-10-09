const addTaskBtn = document.getElementById("add-task-btn");
const deskTaskInput = document.getElementById("description-task");
const todosWrapper = document.querySelector(".todos-wrapper");

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
	this.description = description;  // конструктор ввода в input
	this.completed = false;
}

const createTemplate = (task, index) => {
	return `
	    	<div class="todo-item ${task.completed ? 'checked' : ''}">
				<div class="description">${task.description}</div>
				<div class="buttons">
					<input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
					<button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
				</div>
			</div>
	`
}

const filterTasks = () => {
	const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
	const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
	tasks = [...activeTasks, ...completedTasks];
}

const fillHtmlList = () => {
	todosWrapper.innerHTML = "";  // зачистка данных
	if (tasks.length > 0) {
		filterTasks();
		tasks.forEach((item, index) => {
			todosWrapper.innerHTML += createTemplate(item, index);
		});
		todoItemElems = document.querySelectorAll('.todo-item')
	} //если массив не пустой то(есть таски внутри)
}

//  когда пользователь ввел текст в unput, при нажатии на кнопку "добавить", 
//это текст должен попатсть в тот объект для которого создан конструктор
//должен создаться объект
// и этот объект мы отправим в массив(следующие таски тоже добавляются в массив)
// этот массив будем отправлять в local storage

fillHtmlList();

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
	tasks[index].completed = !tasks[index].completed;
	if (tasks[index].completed) {
		todoItemElems[index].classList.add('checked');
	} else {
		todoItemElems[index].classList.remove('checked');
	}
	updateLocal();
	fillHtmlList();
}

addTaskBtn.addEventListener("click", () => {
	tasks.push(new Task(deskTaskInput.value));
	updateLocal();
	fillHtmlList();
	deskTaskInput.value = ''; // зачистка введенного текста после добавленя таска
})

const deleteTask = index => {
	todoItemElems[index].classList.add('delition');
	setTimeout(() => {
		tasks.splice(index, 1);
		updateLocal();
		fillHtmlList();
	}, 500)
}



