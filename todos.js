import TodoForm from './todoForm.js'
import Todo from './todo.js';

const CATEGORY_ID = new URL(window.location.href).searchParams.get('categoryid');
const PARENT_CATEGORY = JSON.parse(localStorage.getItem(CATEGORY_ID));
const categoryNameHeading = document.getElementById('categoryHeading');
categoryNameHeading.textContent = PARENT_CATEGORY.name;
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
new TodoForm();
Todos.renderTodos();