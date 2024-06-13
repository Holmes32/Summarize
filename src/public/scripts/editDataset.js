// Function to add data set
document.addEventListener("DOMContentLoaded", function () {
    fetchGetDataEdit();
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
        alert('Error fetching dataset:', error);
    }
}

function renderData(data) {
    const textInput = document.getElementById('textInput');
    textInput.value = data.text;
    const textList = data.summary;
    textList.forEach((item, index) => {
        if (index < 1) {
            const textOutput = document.getElementById('textOutput');
            textOutput.value = item;
            return;
        }
        addSummarizeText(item);
    })
    const saveButton = document.getElementById('save');
    const deleteButton = document.getElementById('delete');
    saveButton.onclick = function () {
        const rawTextValue = document.getElementById("textInput").value;
        const listSummarizeTexts = getSummarizeTexts();
        save(data.index, data.language, rawTextValue, listSummarizeTexts)
    }
    deleteButton.onclick = function () {
        deleteDataset(data.index, data.language)
    }
}

function addSummarizeText(item) {
    const container = document.getElementById('summarizeContainer');

    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container2';

    const textarea = document.createElement('textarea');
    textarea.name = 'summarizeText';
    if (item) {
        textarea.value = item;
    }

    const addButton = document.createElement('button');
    addButton.className = 'add-button';
    addButton.innerText = '+';
    addButton.onclick = function() {
        addSummarizeText('');
    }

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

async function save(index, language, rawText, summaryText) {
    const data = {
        index: index,
        language: language,
        text: rawText,
        summary: summaryText
    };
    await fetch('/dataset/save', {
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
        alert("Save data successfully")
        location.reload();
    })
}

async function deleteDataset(index, language) {
    Confirm.open({
        title: 'Background Change',
        message: 'Are you sure you wish the background color?',
        onok: () => {
            const data = {
                index: index,
                language: language
            };
            fetch('/dataset/delete', {
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
                alert("Delete data successfully")
                location.reload();
            })
        }
      })

}