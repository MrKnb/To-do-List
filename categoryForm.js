import Category from './category.js'
import Validator from './validator.js'

export default class CategoryForm {
  constructor() {
    this.form = document.getElementById('addCategoryForm');
    this.input = this.form.querySelector('input');
    this.openFormButton = document.getElementById('addCategory');
    this.formOverlay = document.getElementById('addCategoryOverlay');

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
    this.resetFormInput();
  }

  resetFormInput() {
    this.input.value = 'Untitled category';
  }

  passParameterToUrl(id) {
    return `./category.html?categoryid=${id}`
  }

  submitHandler(event) {
    event.preventDefault();
    const inputValue = this.input.value;

    if (!Validator.validate(inputValue)) {
      return;
    }

    const newCategory = new Category(inputValue);
    newCategory.render();
    localStorage.setItem(newCategory.id, JSON.stringify(newCategory));
    this.hideFormHandler();
  }

}