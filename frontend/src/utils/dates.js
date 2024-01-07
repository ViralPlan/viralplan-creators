export function getNextBusinessDay(dateStr) {
  // Create a date object from the input string
  var date = new Date(dateStr);

  // Increase the date by one day
  date.setDate(date.getDate() + 1);

  // Check if the new date falls on a weekend
  // If it does, keep increasing the date until it's a weekday
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }

  // Format the date back to YYYY-MM-DD
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export function getPreviousMonday() {
  var date = new Date();
  var day = date.getDay();
  var prevMonday = new Date();
  if (date.getDay() == 1) {
    prevMonday.setDate(date.getDate() - 7);
  } else {
    prevMonday.setDate(date.getDate() - (day - 1));
  }

  let month = '' + (prevMonday.getMonth() + 1);
  day = '' + prevMonday.getDate();
  let year = prevMonday.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export function getNextMonday() {
  var date = new Date();
  var day = date.getDay();
  var prevMonday = new Date();
  if (day == 1) {
    prevMonday.setDate(date.getDate());
  } else {
    prevMonday.setDate(date.getDate() - (day - 1) + 7);
  }

  let month = '' + (prevMonday.getMonth() + 1);
  day = '' + prevMonday.getDate();
  let year = prevMonday.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


export function getXDaysAgo(x) {
  var date = new Date();
  var prevMonday = new Date();
  prevMonday.setDate(date.getDate() - x);

  let month = '' + (prevMonday.getMonth() + 1);
  let day = '' + prevMonday.getDate();
  let year = prevMonday.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


export function formatDate() {
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}