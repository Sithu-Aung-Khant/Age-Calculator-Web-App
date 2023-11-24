// Elements to display Results
const year = document.getElementById('y');
const month = document.getElementById('m');
const day = document.getElementById('d');

const error_message = document.querySelectorAll('error-message');
const label = document.querySelectorAll('label');
const submitBtn = document.getElementById('submit');
const input = document.querySelectorAll('input');

let dd = document.getElementById('day').value;
let mm = document.getElementById('month').value;
let yy = document.getElementById('year').value;
// Restricting Inputs
function restrictInput(input) {
  input.value = input.value.replace(/[^\d]/g, '');
}

function calculateAge() {
  function validateAndHandleError(value, index, errorMessage, maxValue) {
    const errorText =
      value.length === 0 ? 'This field is required' : errorMessage;
    if (value.length === 0 || (maxValue !== undefined && value > maxValue)) {
      p[index].innerHTML = errorText;
      p[index].classList.add('error');
      lb[index].classList.add('error');
      input[index].classList.add('error');
      return false; // Indicates validation failure
    }
    return true; // Indicates validation success
  }

  // Get the inputs
  let dd = document.getElementById('day').value;
  let mm = document.getElementById('month').value;
  let yy = document.getElementById('year').value;

  // Validate Day
  validateAndHandleError(dd, 0, 'Must be a valid date', 31);

  // Validation for Month
  validateAndHandleError(mm, 1, 'Must be a valid month', 12);

  // Validation for Year
  validateAndHandleError(
    yy,
    2,
    'Must be in the past',
    new Date().getFullYear()
  );

  // Current Date Infos
  let today = new Date();
  let thisDay = today.getDate();
  let thisMonth = 1 + today.getMonth();
  let thisYear = today.getFullYear();

  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // For Leap Year
  if ((thisYear % 4 == 0 && thisYear % 100 != 0) || thisYear % 400 == 0) {
    months[1]++;
  }

  // For Negative Values
  if (day > thisDay) {
    thisDay += month[thisMonth + 1];
    thisMonth--;
  }
  if (month > thisMonth) {
    thisMonth += 12;
    thisYear--;
  }

  // Calculate age in years and days
  yearDiff = thisYear - year;
  monthDiff = thisMonth - month;
  dayDiff = thisDay - day;

  y.innerHTML = yearDiff;
  m.innerHTML = monthDiff;
  d.innerHTML = dayDiff;
}

// function handleInputError(index, errorMessage) {
//   p[index].innerHTML = errorMessage;
//   p[index].classList.add('error');
//   lb[index].classList.add('error');
//   input[index].classList.add('error');
// }

// if (dd.length === 0) {
//   handleInputError(0, 'This field is required');
// } else if (dd.value > 31) {
//   handleInputError(0, 'Must be a valid day');
// }

submitBtn.addEventListener('click', (e) => {
  calculateAge();
});

// Validating

// if (dd.length === 0) {
//   p[0].innerHTML = 'This field is required';
//   p[0].classList.add('error');
//   lb[0].classList.add('error');
//   input[0].classList.add('error');
// } else if (dd > 31) {
//   p[0].innerHTML = 'Must be a valid day';
//   p[0].classList.add('error');
//   lb[0].classList.add('error');
//   input[0].classList.add('error');
// }

// if (mm.length === 0) {
//   p[1].innerHTML = 'This field is required';
//   p[1].classList.add('error');
//   lb[1].classList.add('error');
//   input[1].classList.add('error');
// } else if (mm > 12) {
//   p[1].innerHTML = 'Must be a valid month';
//   p[1].classList.add('error');
//   lb[1].classList.add('error');
//   input[1].classList.add('error');
// }

// if (yy.length === 0) {
//   p[2].innerHTML = 'This field is required';
//   p[2].classList.add('error');
//   lb[2].classList.add('error');
//   input[2].classList.add('error');
// } else if (yy > thisYear) {
//   p[2].innerHTML = 'Must be in the past';
//   p[2].classList.add('error');
//   lb[2].classList.add('error');
//   input[2].classList.add('error');
// }
