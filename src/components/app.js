//---------------------------------------------------
//Stuff we need to get from our HTML
const form = document.querySelector('#form');
const taskList = document.querySelector('#tasks');
const task = document.querySelector('#task');
const editTask = document.querySelector('#editTask');
const completedTask = document.querySelector('#completedTask');
const deleteTask = document.querySelector('#deleteTask');
//---------------------------------------------------
//The three things we must get from our form
let id;
let taskTitle;
let taskDueDate;
let taskDescription;

//---------------------------------------------------
//Our Task class
class Task {
	constructor(
		taskIdParameter,
		taskTitleParameter,
		taskDueDateParameter,
		taskDescriptionParameter
	) {
		this.id = taskIdParameter;
		this.taskTitle = taskTitleParameter;
		this.taskDueDate = taskDueDateParameter;
		this.taskDescription = taskDescriptionParameter;
	}
	get getTaskId() {
		return this.id;
	}
	get getTaskTitle() {
		return this.taskTitle;
	}
	get getTaskDueDate() {
		return this.taskDueDate;
	}
	get getTaskDescription() {
		return this.taskDescription;
	}
}
//---------------------------------------------------------------------
//Our Tasks Array
let tasksArray = [];
//---------------------------------------------------------------------
const checkStorage = () => {};
//---------------------------------------------------------------------
//This function submits and adds our inputs into the Array using the class
//ADD
const addTask = (event) => {
	event.preventDefault();
	id = 1;
	for (let i = 0; i < tasksArray.length; i++) {
		id = tasksArray.length + 1;
	}
	taskTitle = document.querySelector('#taskTitle').value;
	taskDueDate = document.querySelector('#taskDueDate').value;
	taskDescription = document.querySelector('#taskDescription').value;
	let newTask = new Task(id, taskTitle, taskDueDate, taskDescription);

	tasksArray.push(newTask);

	console.log(tasksArray);

	displayTask(tasksArray);
};
//---------------------------------------------------------------------
const deleteCheck = (event) => {
	const currentTaskId = event.target.id;
	const currentTask = event.target;
	const fullTask = currentTask.parentElement.parentElement;
	console.log(currentTask);
	console.log(fullTask);

	if (currentTaskId === 'deleteTask') {
		fullTask.remove();
	}
};
//---------------------------------------------------------------------
//This function displays our tasks
//Display
const displayTask = (arguments) => {
	taskList.innerHTML = '';
	for (let i = 0; i < arguments.length; i++) {
		taskList.innerHTML += `
 			<div class="singleTask" id="task">
 					<div class="taskItem">
 						<span class="taskName"id="text">${
							arguments[i].getTaskTitle.charAt(0).toUpperCase() +
							arguments[i].getTaskTitle.slice(1)
						}</span>
 						<span class="taskDescription">${arguments[i].getTaskDescription}</span>
 						<span class="taskDate text-secondary">${arguments[i].getTaskDueDate}</span>
 					</div>
 					<div class="options">
 						<i id="editTask"class="fa-solid fa-pen-to-square editBtn"></i>
 						<i id="completedTask"class="fa-solid fa-check checkBtn"></i>
 						<i id="deleteTask"class="fa-solid fa-trash trashBtn"></i>
 					</div>
 				</div>
    `;
	}
};
//---------------------------------------------------------------------
//Our Event Listeners
form.addEventListener('submit', addTask);
deleteTask.addEventListener('click', deleteCheck);
