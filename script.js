// * The Procedural Way

const date = new Date();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
// date
const indexDate = document.getElementById('categoriesDate');
if (indexDate) {
  indexDate.textContent = `Today, ${date.getDate()} ${
  months[date.getMonth()]
} ${date.getFullYear()}`;
}

const categoryDate = document.getElementById('categoryDate');
if (categoryDate) {
  categoryDate.textContent = `Today, ${date.getDate()} ${
  months[date.getMonth()]
} ${date.getFullYear()}`;
}


// containers
const categories = document.getElementById('categories');
const toDos = document.getElementById('toDos');
// add category or to-do
const addToDo = document.getElementById('addToDo');
const addCategory = document.getElementById('addCategory');

const backToCategory = document.getElementById('backToCategory');

const addCategoryForm = document.getElementById('addCategoryForm');
const addCategoryOverlay = document.getElementById('addCategoryOverlay');

const addTodoForm = document.getElementById("addTodoForm");
const addTodoOverlay = document.getElementById("addTodoOverlay");

if (backToCategory) {
  backToCategory.addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5500/index.html'
  })
}

// start handling todos

if (addToDo) {
  const currentUrl = new URL(window.location.href);
  const currentUrlParam = currentUrl.searchParams.get('categoryid');
  const todoInput = addTodoForm.querySelector('input');
  const noTodos = document.getElementById('noTodos');
  const categoryHeading = document.getElementById('categoryHeading');
  const categoryObject = JSON.parse(localStorage.getItem(currentUrlParam));

  addToDo.addEventListener('click', () => {
    addTodoForm.classList.remove('invisible');
    addTodoOverlay.classList.remove('invisible');
  })

  addTodoOverlay.addEventListener("click", () => {
    addTodoForm.classList.add("invisible");
    addTodoOverlay.classList.add("invisible");
    todoInput.value = '';
  })

  // display correct category name on each category page
  categoryHeading.textContent = categoryObject.name;

  function renderTodos(name) {
    const todoEl = document.createElement("div");
    todoEl.classList.add("category");

    const circleLink = document.createElement("div");
    circleLink.classList.add("circle-link");

    const circle = document.createElement("div");
    circle.classList.add("circle");

    const checkMark = document.createElement('i');
    checkMark.textContent = 'done';
    checkMark.classList.add('material-icons');
    checkMark.classList.add('invisible');
    checkMark.classList.add('check-mark');
    circle.appendChild(checkMark);

    const todoName = document.createElement("p");
    todoName.classList.add("category-link");
    todoName.textContent = name;
    circleLink.appendChild(circle);
    circleLink.appendChild(todoName);
    todoEl.appendChild(circleLink);

    circleLink.addEventListener('click', () => {
      todoName.classList.toggle('done');
      checkMark.classList.toggle('invisible');
      for (category of categoryObject.todos) {
        if (category.name == name) {
          category.done = !category.done;
        }
      }
      localStorage.setItem(currentUrlParam, JSON.stringify(categoryObject));
    })


    const icons = document.createElement('div');
    icons.classList.add('icons');

    const editIcon = document.createElement('i');
    editIcon.classList.add('material-icons');
    editIcon.textContent = 'create';

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('material-icons');
    trashIcon.textContent = 'delete';

    trashIcon.addEventListener('click', () => {
      document.querySelector('.categories-container').removeChild(todoEl);
      categoryObject.todos = categoryObject.todos.filter(todo => (todo.name != name));
      localStorage.setItem(currentUrlParam, JSON.stringify(categoryObject));
      if (document.querySelector('.categories-container').childElementCount <= 4) {
        noTodos.classList.remove('invisible');
      }
    })

    icons.appendChild(editIcon);
    icons.appendChild(trashIcon);

    todoEl.appendChild(icons);
    noTodos.classList.add('invisible');
    document.querySelector('.categories-container').appendChild(todoEl);
  }

  for (todo of categoryObject.todos) {
    renderTodos(todo.name);
  }



  addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (todoInput.value.trim()) {

      const todo = {
        name: todoInput.value.trim(),
        done: false
      }

      // add todos to localstorage
      categoryObject.todos.push(todo);
      localStorage.setItem(currentUrlParam, JSON.stringify(categoryObject));
      renderTodos(todo.name);

      addTodoForm.classList.add("invisible");
      addTodoOverlay.classList.add("invisible");
      todoInput.value = '';
    }
  })
}

// Start Handling Categories


function renderCategories(id, name) {

  const noCategories = document.getElementById('noCategories');

  const categoryEl = document.createElement('div');
  categoryEl.classList.add('category');
  const categoryLink = document.createElement("a");
  categoryLink.classList.add("category-link");
  categoryLink.href = `./category.html?categoryid=${id}`;
  categoryLink.textContent = name;
  categoryEl.appendChild(categoryLink);

  const icons = document.createElement('div');
  icons.classList.add('icons');

  const editIcon = document.createElement('i');
  editIcon.classList.add('material-icons');
  editIcon.textContent = 'create';

  const trashIcon = document.createElement('i');
  trashIcon.classList.add('material-icons');
  trashIcon.textContent = 'delete';

  trashIcon.addEventListener('click', () => {
    document.querySelector('.categories-container').removeChild(categoryEl);
    localStorage.removeItem(`${id}`);
    if (document.querySelector('.categories-container').childElementCount <= 4) {
      noCategories.classList.remove('invisible');
    }
  })

  editIcon.addEventListener('click', () => {
    console.log(name);
  })

  icons.appendChild(editIcon);
  icons.appendChild(trashIcon);

  categoryEl.appendChild(icons);
  noCategories.classList.add('invisible');

  document.querySelector('.categories-container').appendChild(categoryEl);


  addCategoryForm.classList.add('invisible');
  addCategoryOverlay.classList.add('invisible');
}





if (addCategory) {

  if (localStorage.length > 0) {
    for (id in localStorage) {
      if (localStorage.hasOwnProperty(id)) {
        renderCategories(id, JSON.parse(localStorage[id]).name)
      }
    }
  }

  const categoryFormInput = addCategoryForm.querySelector('input');

  addCategory.addEventListener('click', () => {
    addCategoryForm.classList.remove('invisible');
    addCategoryOverlay.classList.remove('invisible');
  })

  addCategoryOverlay.addEventListener('click', () => {
    addCategoryForm.classList.add('invisible');
    addCategoryOverlay.classList.add('invisible');
    categoryFormInput.value = 'Untitled category';
  })

  addCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (categoryFormInput.value.trim()) {

      const category = {
        id: Math.random(),
        name: categoryFormInput.value.trim(),
        todos: []
      }
      localStorage.setItem(`${category.id}`, JSON.stringify(category));
      renderCategories(category.id, category.name);

      addCategoryForm.classList.add('invisible');
      addCategoryOverlay.classList.add('invisible');
      categoryFormInput.value = 'Untitled category';
    }
  })
}