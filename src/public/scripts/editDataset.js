// Function to add data set
document.addEventListener("DOMContentLoaded", function() {
    fetchGetDataEdit(); 
    console.log("kasdfjkasd")
    updateRemoveButtons();
});

async function fetchGetDataEdit() {
    // Simulate fetching data from the server with example data
    try {
        const response = await fetch('/dataset/getDataEdit');
        const data = await response.json();
        console.log(data)
        renderData(data);
    } catch (error) {
        console.error('Error fetching dataset:', error);
    }
}

function renderData(data) {
    const textInput = document.getElementById('textInput');
    textInput.value = data.text;
    addSummarizeText(data.summary);
}

function addSummarizeText(textList) {
    textList.forEach((item, index) => {
        if (index < 1) {
            const textOutput = document.getElementById('textOutput');
            textOutput.value = item;
            return; 
        }
        const container = document.getElementById('summarizeContainer');

        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container2';
    
        const textarea = document.createElement('textarea');
        textarea.name = 'summarizeText';
        textarea.value = item;
    
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
    })
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
