const addTodos = document.querySelector('.add');
const ul = document.querySelector('.todos')
const searchTodo = document.querySelector('.searchTodo');

// function to be called inside the submit events
const createTodo = todo => {
    // template for the innerText of the todo
    const todoTemplate = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;
    ul.innerHTML += todoTemplate;
};

// used event delegation here on the parent element to automatically add event listener to all trash icon when clicked and get the Todo deleted
ul.addEventListener('click', e => {
    // to check, if actually the delete icon is being clicked
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});

// add todos
addTodos.addEventListener('submit', e => {
    // prevent the page from reloading when a form is submitted.
    e.preventDefault();
    // call the function when the length of a input value is more than or equal 1
    const todo = addTodos.todo.value.trim();
    if (todo.length >= 1) {
        createTodo(todo);
        addTodos.reset();
    }
});

// function to filter the array
const filterTodos = searchValue =>  {
    const arrayOfTodos = Array.from(ul.children);
    arrayOfTodos.filter((todo) => !todo.textContent.toLowerCase().includes(searchValue))
        .forEach((todo) => todo.classList.add('filteredOut'));

    arrayOfTodos.filter((todo) => todo.textContent.toLowerCase().includes(searchValue))
        .forEach((todo) => todo.classList.remove('filteredOut'));
};

// keyup event for search todo
searchTodo.addEventListener('keyup', () => {
    const searchValue = searchTodo.value.toLowerCase().trim();
    // call the filterTodo function
    filterTodos(searchValue);
});