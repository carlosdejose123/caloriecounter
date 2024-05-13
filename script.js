const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories" />
  `;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}
function calculateCalories(e) {
    // Existing code
}

function editRow(event) {
    const row = event.target.closest('tr');
    const cells = row.querySelectorAll('td');
  
    const cellValues = [];
  
    cells.forEach(cell => {
        const isNonEditableCell = cell.parentElement.querySelector('th').textContent === 'Total' ||
                                cell.parentElement.querySelector('th').textContent === 'Deficit';
        if (isNonEditableCell) {
            return;
        }
        cellValues.push(cell.textContent.trim());
    });
  
    const newValues = prompt('Enter new values for the row:', cellValues.join(', '));
  
    if (!newValues) {
        return;
    }
  
    const newValuesArray = newValues.split(',').map(value => value.trim());
  
    cells.forEach((cell, index) => {
        if (index === 0 || index === 4 || index === 5) {
            return;
        }
        cell.textContent = newValuesArray[index];
    });
  
    const budget = parseFloat(newValuesArray[1]);
    const consumed = parseFloat(newValuesArray[2]);
    const burned = parseFloat(newValuesArray[3]);
    const totalCalories = budget + burned - consumed;
    const deficit = totalCalories < 0 ? 'Surplus' : 'Deficit';
  
    cells[4].textContent = totalCalories;
    cells[5].textContent = Math.abs(totalCalories);
}

function deleteRow(event) {
    // Existing code
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        editRow(event);
    }
});

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);

