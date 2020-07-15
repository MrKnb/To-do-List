/* 

TODO: get elements (by Id)


*/

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
indexDate.textContent = `Today, ${date.getDate()} ${
  months[date.getMonth()]
} ${date.getFullYear()}`;
const categoryDate = document.getElementById('categoryDate');
categoryDate.textContent = `Today, ${date.getDate()} ${
  months[date.getMonth()]
} ${date.getFullYear()}`;
// containers
const categories = document.getElementById('categories');
const toDos = document.getElementById('toDos');
// add category or to-do
const addToDo = document.getElementById('addToDo');
const addCategory = document.getElementById('addCategory');
