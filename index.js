// Elements
const elements = {
  labels: document.querySelectorAll('label'),
  inputs: document.querySelectorAll('input'),
  errorMessages: document.querySelectorAll('.error-message'),
  submitBtn: document.getElementById('submit'),
};

// Elements to Display Results
const results = {
  year: document.getElementById('year'),
  month: document.getElementById('month'),
  day: document.getElementById('day'),
};

// Variables to store previous input values
let prevYearInput = '';
let prevMonthInput = '';
let prevDayInput = '';

// Used text input instead of number for flexible customization.
// Therefore, Restricting text input to only allow numeric values.
function restrictInput(input) {
  input.value = input.value.replace(/[^\d]/g, '');
}

// Function to Validate and Handle Errors
function validateAndHandleError(value, index, errorMessage, maxValue) {
  const errorText =
    value.length === 0 ? 'This field is required' : errorMessage;

  if (value.length === 0 || (maxValue !== undefined && value > maxValue)) {
    setErrorStyles(index);
    elements.errorMessages[index].innerHTML = errorText;
    return false; // Indicates validation failure
  }

  clearErrorStyles(index);
  return true; // Indicates validation success
}

// Adding Error Styles
function setErrorStyles(index) {
  elements.errorMessages[index].classList.add('error');
  elements.labels[index].classList.add('error');
  elements.inputs[index].classList.add('error');
}

// Removing Error Styles
function clearErrorStyles(index) {
  elements.errorMessages[index].innerHTML = '';
  elements.errorMessages[index].classList.remove('error');
  elements.labels[index].classList.remove('error');
  elements.inputs[index].classList.remove('error');
}

// Calculate Age
function calculateAge() {
  const [year_input, month_input, day_input] = ['yy', 'mm', 'dd'].map(
    (id) => document.getElementById(id).value
  );

  const maxDays = new Date(year_input, month_input, 0).getDate();

  const validations = [
    validateAndHandleError(day_input, 0, 'Must be a valid date', maxDays),
    validateAndHandleError(month_input, 1, 'Must be a valid month', 12),
    validateAndHandleError(
      year_input,
      2,
      'Must be in the past',
      new Date().getFullYear()
    ),
  ];

  // Check if the inputs have changed
  if (
    year_input === prevYearInput &&
    month_input === prevMonthInput &&
    day_input === prevDayInput
  ) {
    return; // No need to recalculate if inputs haven't changed
  }

  if (validations.every((validation) => validation)) {
    const dob = new Date(`${month_input}/${day_input}/${year_input}`);
    const ageDiff = Date.now() - dob;
    const ageDate = new Date(ageDiff);

    // Extract the target values for the animation
    const targetYears = ageDate.getUTCFullYear() - 1970;
    const targetMonths = ageDate.getUTCMonth();
    const targetDays = ageDate.getUTCDate();

    // Call animateCount for each part of the result
    animateCount('year', targetYears);
    animateCount('month', targetMonths);
    animateCount('day', targetDays);

    // Update previous input values
    prevYearInput = year_input;
    prevMonthInput = month_input;
    prevDayInput = day_input;
  }
}

function animateCount(elementId, targetValue) {
  const element = results[elementId];
  const initialValue = 0;
  const duration = 500;
  const increment = (targetValue - initialValue) / (duration / 50);

  let currentValue = initialValue;

  const intervalId = setInterval(() => {
    currentValue += increment;
    element.textContent = Math.round(currentValue);

    if (currentValue >= targetValue) {
      clearInterval(intervalId);
    }
  }, 50);
}

elements.submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  calculateAge();
});

elements.inputs.forEach((input) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      calculateAge();
    }
  });
});
