const newTodoForm = document.querySelector('#newTodoForm');
const todoList = document.querySelector('#todoList');
//-------------------------------------------------------------
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	newTodoForm.addEventListener('submit', addTodo);
	DisplayTodos();
});
//-------------------------------------------------------------
const renderLocalStorage = () => {
	localStorage.setItem('todos', JSON.stringify(todos));
};
//-------------------------------------------------------------
const addTodo = (event) => {
	event.preventDefault();
	//Our Object

	const todo = {
		content: event.target.elements.content.value,
		category: event.target.elements.category.value,
		done: false,
		createdAt: new Date().getTime(),
	};

	console.log(todo);
	if (todo.content.length <= 0) {
		document.querySelector('#newTaskError').style.display = 'block';
	} else {
		todos.push(newTodoItem);
		console.log(todos);
		renderLocalStorage();
		event.target.reset();
		DisplayTodos();
	}
};
//-------------------------------------------------------------

//Very Important
//this function essentially renders our todos on the page
//Also includes functions we could use inside our task item
const DisplayTodos = () => {
	//important so the code does'nt overlap with each entry
	todoList.innerHTML = '';

	//This forEach is responsible for creating the html for our
	//tasklist item(todo)
	todos.forEach((todo) => {
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
		input.checked = todo.done;
		span.classList.add('bubble');
		//checks what category and adds the appropriate class
		if (todo.category == 'personal') {
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
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
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
		if (todo.done) {
			todoItem.classList.add('done');
		}
		//this function allows us to check if our task has been done or not
		//and applies the appropriate class
		const inputFunction = (event) => {
			todo.done = event.target.checked;
			renderLocalStorage();
			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}
			DisplayTodos();
		};
		//this function allows us to edit our task item and change what we typed in
		const editFunction = (event) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (event) => {
				input.setAttribute('readonly', true);
				todo.content = event.target.value;
				renderLocalStorage();
				DisplayTodos();
			});
		};
		//This function simply deletes existing task items
		const deleteFunction = () => {
			todos = todos.filter((t) => t != todo);
			renderLocalStorage();
			DisplayTodos();
		};

		//our event listeners
		edit.addEventListener('click', editFunction);
		input.addEventListener('change', inputFunction);
		deleteButton.addEventListener('click', deleteFunction);
	});
};
//-------------------------------------------------------------
