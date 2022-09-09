const newTodoForm = document.querySelector('#newTodoForm');
const todoList = document.querySelector('#todoList');
const list = document.querySelector('.list'); //a class
const errorMessage = document.querySelector('#newTaskError');
const alphabeticallySorts = document.querySelector('#alphabetically');
//-------------------------------------------------------------
//This loads up as you start the app
//todos is our array which we store our tasks
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	newTodoForm.addEventListener('submit', addTodo);
	displayTodos();
});
//-------------------------------------------------------------
//This function essentially saves the array to our local storage on the browser
const renderLocalStorage = () => {
	localStorage.setItem('todos', JSON.stringify(todos));
};
//-------------------------------------------------------------
//This is what we need to push into our todo's array created above
let id;
let taskContent;
let taskCategory;
let done;
let createdAt;
//---------------------------------------------------
//Our Task class
class Task {
	constructor(
		idParameter,
		taskContentParameter,
		taskCategoryParameter,
		doneParameter,
		createdAtParameter
	) {
		this.id = idParameter;
		this.taskContent = taskContentParameter;
		this.taskCategory = taskCategoryParameter;
		this.done = doneParameter;
		this.createdAt = createdAtParameter;
	}
}
//-------------------------------------------------------------
//The addTodo function takes the todo object and adds it to our todos
//array and then displays it using the DisplayTodos function.
//-------------------------------------------------------------
const addTodo = (event) => {
	event.preventDefault();
	id = 1;
	for (let i = 0; i < todos.length; i++) {
		id = todos.length + 1;
	}
	taskContent = event.target.elements.content.value;
	taskCategory = event.target.elements.category.value;
	done = false;
	createdAt = new Date().getTime();
	//-----------------------------------------------
	//Here our app creates a new task uses our class created above to create an object
	let newTask = new Task(id, taskContent, taskCategory, done, createdAt);
	console.log(newTask);
	if (newTask.taskContent.length <= 0) {
		errorMessage.style.display = 'block';
	} else {
		errorMessage.style.display = 'none';
		todos.push(newTask);
		renderLocalStorage();
		event.target.reset();
		displayTodos();
	}
};
//-------------------------------------------------------------
//Very Important
//this function essentially renders our todos on the page
//Also includes functions we could use inside our task item
const displayTodos = () => {
	//important so the code does'nt overlap with each entry
	todoList.innerHTML = '';

	//This forEach is responsible for creating the html for our
	//tasklist item(newTask)
	todos.forEach((newTask) => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
		input.type = 'checkbox';
		input.checked = newTask.done;
		span.classList.add('bubble');
		//checks what category and adds the appropriate class
		if (newTask.taskCategory == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		edit.classList.add('fa-solid');
		edit.classList.add('fa-edit');
		deleteButton.classList.add('delete');
		deleteButton.classList.add('fa-solid');
		deleteButton.classList.add('fa-trash');
		content.innerHTML = `<input type="text" value="${newTask.taskContent}" readonly>`;
		edit.innerHTML = '';
		deleteButton.innerHTML = '';
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoList.appendChild(todoItem);
		// this allows our done class to be displayed
		if (newTask.done) {
			todoItem.classList.add('done');
		}
		//this function allows us to check if our task has been done or not
		//and applies the appropriate class
		const checkIfDone = (event) => {
			newTask.done = event.target.checked;
			console.log(newTask.done);
			renderLocalStorage();
			if (newTask.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}
			displayTodos();
		};
		//this function allows us to edit our task item and change what we typed in
		const editTask = (event) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (event) => {
				input.setAttribute('readonly', true);
				newTask.taskContent = event.target.value;
				renderLocalStorage();
				displayTodos();
			});
		};
		//This function simply deletes existing task items
		const deleteTask = () => {
			todos = todos.filter((task) => task != newTask);
			renderLocalStorage();
			displayTodos();
		};

		//our event listeners we use in display function
		edit.addEventListener('click', editTask);
		input.addEventListener('change', checkIfDone);
		deleteButton.addEventListener('click', deleteTask);
	});
};
//This function simply sorts our tasks in alphabetical order
const sortAlphabetically = () => {
	//list is a global variable
	let i, switching, listItems, shouldSwitch;
	switching = true;
	while (switching) {
		switching = false;
		listItems = list.getElementsByClassName('todo-item');
		for (i = 0; i < listItems.length - 1; i++) {
			shouldSwitch = false;
			if (
				listItems[i].innerHTML.toLowerCase() >
				listItems[i + 1].innerHTML.toLocaleLowerCase()
			) {
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			listItems[i].parentNode.insertBefore(listItems[i + 1], listItems[i]);
			switching = true;
		}
	}
};
//this our event listener responsible for sorting our tasks. Its linked to the 'sort alphabetically' button
alphabeticallySorts.addEventListener('click', sortAlphabetically);
//-------------------------------------------------------------
