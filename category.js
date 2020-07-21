export default class Category {
  constructor(name) {
    this.id = Math.random();
    this.name = name;
    this.todos = [];
  }

  static render(name, id) {
    const noCategories = document.getElementById('noCategories');

    const categoryEl = document.createElement('div');
    categoryEl.classList.add('category');
    const categoryLink = document.createElement('a');
    categoryLink.classList.add('category-link');
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
      document.querySelector('.items-container').removeChild(categoryEl);
      localStorage.removeItem(`${id}`);
      if (document.querySelector('.items-container').childElementCount <= 4) {
        noCategories.classList.remove('invisible');
      }
    });

    editIcon.addEventListener('click', () => {

    });

    icons.appendChild(editIcon);
    icons.appendChild(trashIcon);

    categoryEl.appendChild(icons);
    noCategories.classList.add('invisible');

    document.querySelector('.items-container').appendChild(categoryEl);


  }
}