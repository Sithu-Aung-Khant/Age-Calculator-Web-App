// Elements for Displaying Results
const year_result = document.getElementById('year');
const month_result = document.getElementById('month');
const day_result = document.getElementById('day');
// Input Elements
const year_input = document.getElementById('yy');
const month_input = document.getElementById('mm');
const day_input = document.getElementById('dd');

const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');
const error_messages = document.querySelectorAll('error-message');
const submit_btn = document.getElementById('submit');

// Used text input instead of number for flexible customization.
// restricting text input to only allow numeric values.
function restrictInput(input) {
  input.value = input.value.replace(/[^\d]/g, '');
}

function validateAndHandleError(value, index, errorMessage, maxValue) {
  const errorText =
    value.length === 0 ? 'This field is required' : errorMessage;
  if (value.length === 0 || (maxValue !== undefined && value > maxValue)) {
    error_messages[index].innerHTML = errorText;
    error_messages[index].classList.add('error');
    labels[index].classList.add('error');
    inputs[index].classList.add('error');
    return false; // Indicates validation failure
  }
  return true; // Indicates validation success
}

function calculateAge() {
  // Validate Day
  validateAndHandleError(day_input, 0, 'Must be a valid date', 31);

  // Validation for Month
  validateAndHandleError(month_input, 1, 'Must be a valid month', 12);

  // Validation for Year
  validateAndHandleError(
    year_input,
    2,
    'Must be in the past',
    new Date().getFullYear()
  );

  let dob = new Date(
    `${month_input.value}/ ${day_input.value}/ ${year_input.value}`
  );
  let ageDiff = Date.now() - dob;
  let ageDate = new Date(ageDiff);
  let ageYears = ageDate.getUTCFullYear() - 1970;
  let ageMonth = ageDate.getUTCMonth();
  let ageDay = ageDate.getUTCDate();

  year_result.textContent = ageYears;
  month_result.textContent = ageMonth;
  day_result.textContent = ageDay;
}

submit_btn.addEventListener('click', (e) => {
  e.preventDefault();
  calculateAge();
});

year_input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    calculateAge();
  }
});
