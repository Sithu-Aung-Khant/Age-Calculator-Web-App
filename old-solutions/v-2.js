// Elements for Displaying Results
const year_result = document.getElementById('year');
const month_result = document.getElementById('month');
const day_result = document.getElementById('day');

const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');
const error_messages = document.querySelectorAll('.error-message');
const submit_btn = document.getElementById('submit');

// Used text input instead of number for flexible customization.
// Restricting text input to only allow numeric values.
function restrictInput(input) {
  input.value = input.value.replace(/[^\d]/g, '');
}

function validateAndHandleError(value, index, errorMessage, maxValue) {
  const errorText =
    value.length === 0 ? 'This field is required' : errorMessage;

  if (value.length === 0 || (maxValue !== undefined && value > maxValue)) {
    error_messages[index].innerHTML = errorText;
    setErrorStyles(index);
    return false; // Indicates validation failure
  }

  // Clear error messages and styles on successful validation
  clearErrorStyles(index);
  return true; // Indicates validation success
}

function setErrorStyles(index) {
  error_messages[index].classList.add('error');
  labels[index].classList.add('error');
  inputs[index].classList.add('error');
}

function clearErrorStyles(index) {
  error_messages[index].innerHTML = '';
  error_messages[index].classList.remove('error');
  labels[index].classList.remove('error');
  inputs[index].classList.remove('error');
}

function calculateAge() {
  // Input Elements
  const year_input = document.getElementById('yy').value;
  const month_input = document.getElementById('mm').value;
  const day_input = document.getElementById('dd').value;

  // Validate Date, Month & Year
  const maxDays = new Date(year_input, month_input, 0).getDate();

  const validate_day = validateAndHandleError(
    day_input,
    0,
    'Must be a valid date',
    maxDays
  );
  const validate_month = validateAndHandleError(
    month_input,
    1,
    'Must be a valid month',
    12
  );
  const validate_year = validateAndHandleError(
    year_input,
    2,
    'Must be in the past',
    new Date().getFullYear()
  );

  if (validate_day && validate_month && validate_year) {
    let dob = new Date(`${month_input}/${day_input}/${year_input}`);
    let ageDiff = Date.now() - dob;
    let ageDate = new Date(ageDiff);
    let ageYears = ageDate.getUTCFullYear() - 1970;
    let ageMonth = ageDate.getUTCMonth();
    let ageDay = ageDate.getUTCDate();

    year_result.textContent = ageYears;
    month_result.textContent = ageMonth;
    day_result.textContent = ageDay;
  }
}

submit_btn.addEventListener('click', (e) => {
  e.preventDefault();
  calculateAge();
});

inputs.forEach((input) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      calculateAge();
    }
  });
});
