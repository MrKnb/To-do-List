import CategoryForm from './categoryForm.js'
import Category from './category.js'
class Categories {
  static renderCategories() {
    for (let prop in localStorage) {
      if (localStorage.hasOwnProperty(prop)) {
        const parsedCategory = JSON.parse(localStorage.getItem(prop))
        new Category(parsedCategory.name);
        Category.render(parsedCategory.name, parsedCategory.id);
      }
    }
  }
}
new CategoryForm();
Categories.renderCategories();