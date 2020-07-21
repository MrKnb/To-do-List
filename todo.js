export default class Todo {

  constructor(name, doneStatus) {
    this.name = name;
    this.done = doneStatus;
  }

  getCurrentURL() {
    return new URL(window.location.href);
  }
  getCurrentParams() {
    return this.getCurrentURL().searchParams.get('categoryid');
  }

  getParentCategory() {
    return JSON.parse(localStorage.getItem(this.getCurrentParams()));
  }

  render() {
    const parentCategory = this.getParentCategory();
    parentCategory.todos.push(this);

    localStorage.setItem(this.getCurrentParams(), JSON.stringify(parentCategory));

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
    todoName.textContent = this.name;
    circleLink.appendChild(circle);
    circleLink.appendChild(todoName);
    todoEl.appendChild(circleLink);

    // toggle done or undone
    circleLink.addEventListener('click', () => {
      todoName.classList.toggle('done');
      checkMark.classList.toggle('invisible');
      for (todo of this.getParentCategory().todos) {
        if (todo.name == this.name) {
          todo.done = !todo.done;
        }
      }
      console.log(this.getParentCategory().todos);
      localStorage.setItem(this.getCurrentParams(), JSON.stringify(this.getParentCategory()));
    })

    const icons = document.createElement('div');
    icons.classList.add('icons');

    const editIcon = document.createElement('i');
    editIcon.classList.add('material-icons');
    editIcon.textContent = 'create';

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('material-icons');
    trashIcon.textContent = 'delete';

    // delete todo 
    trashIcon.addEventListener('click', () => {
      document.querySelector('.items-container').removeChild(todoEl);
      this.getParentCategory().todos = this.getParentCategory().todos.filter(todo => (todo.name != this.name));
      localStorage.setItem(this.getCurrentParams(), JSON.stringify(this.getParentCategory()));
      if (document.querySelector('.items-container').childElementCount <= 4) {
        noTodos.classList.remove('invisible');
      }
    })

    icons.appendChild(editIcon);
    icons.appendChild(trashIcon);

    todoEl.appendChild(icons);
    noTodos.classList.add('invisible');
    document.querySelector('.items-container').appendChild(todoEl);
  }
}