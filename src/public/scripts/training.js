// Function to add data set
document.addEventListener("DOMContentLoaded", function() {
    updateRemoveButtons();
});

function addSummarizeText() {
    const container = document.getElementById('summarizeContainer');

    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container2';


    const textarea = document.createElement('textarea');
    textarea.name = 'summarizeText';

    const addButton = document.createElement('button');
    addButton.className = 'add-button';
    addButton.innerText = '+';
    addButton.onclick = addSummarizeText;

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerText = '×';
    removeButton.onclick = function() {
        removeSummarizeText(removeButton);
    };

    inputContainer.appendChild(addButton);
    inputContainer.appendChild(removeButton);
    inputContainer.appendChild(textarea);

    container.appendChild(inputContainer);

    updateRemoveButtons();
}

function removeSummarizeText(button) {
    const inputContainer = button.closest('.input-container2');
    inputContainer.remove();
    updateRemoveButtons();
}

function updateRemoveButtons() {
    const containers = document.querySelectorAll('#summarizeContainer .input-container2');
    containers.forEach((container, index) => {
        const removeButton = container.querySelector('.remove-button');
        if (index === 0) {
            removeButton.style.display = 'none';
        } else {
            removeButton.style.display = 'inline-block';
        }
    });
}

function getSummarizeTexts() {
    const summarizeTextareas = document.querySelectorAll('#summarizeContainer textarea[name="summarizeText"]');
    const texts = Array.from(summarizeTextareas).map(textarea => textarea.value);
    return texts;
}

function addToDataSet() {
    // Get the values from the input fields
    const rawTextValue = document.getElementById("textInput").value;
    const selectedlanguage = document.getElementById("language").value;
    const listSummarizeTexts = getSummarizeTexts();

    console.log('Summarize Texts:', listSummarizeTexts);

    // Construct the data object
    const data = {
        text: rawTextValue,
        summary: listSummarizeTexts,
        language: selectedlanguage
    };

    // Send a POST request to the API endpoint to add the data set
    fetch('/training/addDataset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Data added successfully, handle response if needed
        console.log('Data added successfully:', data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error adding data set:', error);
    });
}

function trainModel() {
    alert("Train model functionality");
}