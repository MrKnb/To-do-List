import Validator from './validator.js';
import Todo from './todo.js';

export default class TodoForm {
  constructor() {
    this.form = document.getElementById('addTodoForm');
    this.input = this.form.querySelector('input');
    this.openFormButton = document.getElementById('addToDo');
    this.formOverlay = document.getElementById('addTodoOverlay');


    this.openFormButton.addEventListener('click', this.showFormHandler.bind(this));
    this.formOverlay.addEventListener('click', this.hideFormHandler.bind(this));
    this.form.addEventListener('submit', this.submitHandler.bind(this));
  }

  showFormHandler() {
    this.form.classList.remove('invisible');
    this.formOverlay.classList.remove('invisible');
  }

  hideFormHandler() {
    this.form.classList.add('invisible');
    this.formOverlay.classList.add('invisible');
    this.clearFormInput();
  }

  clearFormInput() {
    this.input.value = '';
  }

  submitHandler(event) {
    event.preventDefault();
    const inputValue = this.input.value;

    if (!Validator.validate(inputValue)) {
      return;
    }

    const newTodo = new Todo(inputValue, false);
    newTodo.render();
    this.hideFormHandler();
  }
}