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

export default class headerDate {
  static displayDate() {
    const Date = document.querySelector('.date');
    Date.textContent = `Today, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    return Date;
  }
}