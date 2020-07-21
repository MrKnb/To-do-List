import TodoForm from './todoForm.js'
import Todo from './todo.js';
import Date from './date.js'

const CATEGORY_ID = new URL(window.location.href).searchParams.get('categoryid');
const PARENT_CATEGORY = JSON.parse(localStorage.getItem(CATEGORY_ID));

const CATEGORY_NAME_HEADING = document.getElementById('categoryHeading');
CATEGORY_NAME_HEADING.textContent = PARENT_CATEGORY.name;
export default class Todos {
  static renderTodos() {

    for (let todo of PARENT_CATEGORY.todos) {
      const newTodo = new Todo(todo.name, todo.done);
      newTodo.render();
      if (newTodo.done) {
        const check = document.querySelectorAll('.check-mark');
        const todoName = document.querySelectorAll('.category-link');
        check.forEach(item => {
          if (item.attributes[0].value == 'true') {
            item.classList.remove('invisible')
          }
        })
        todoName.forEach(item => {
          if (item.attributes[1].value == 'true') {
            item.classList.add('done')
          }
        })
      }
    }

  }
}
Date.displayDate();
new TodoForm();
Todos.renderTodos();