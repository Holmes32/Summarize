// scripts/dataset.js
document.addEventListener("DOMContentLoaded", () => {
    const datasetList = document.getElementById("dataset-list");
    
    document.getElementById('Button').addEventListener('click', () => {
        window.location.href = '/dataset/download';
      }); 

    // Example dataset for demonstration
    const exampleData = [
        { rawText: "This is the first raw text eaple Certainly! Let's create some example data within the JavaScript file to demonstrate the functionality. We'll modify the fetchDataset function to use this example data instead of fetching it from the server.", summarizedTexts: ["First example summary 1.", "First example summary 2."] },
        { rawText: "Here is another piece of raw text for testing.", summarizedTexts: ["Second example summary 1.", "Second example summary 2."] },
        { rawText: "This raw text is meant to show how the list works.", summarizedTexts: ["Third example summary 1.", "Third example summary 2."] },
        { rawText: "Finally, this is the last raw text example.", summarizedTexts: ["Fourth example summary 1.", "Fourth example summary 2."] }
    ];

    // Function to fetch dataset from server (for now using example data)
    async function fetchDataset() {
        // Simulate fetching data from the server with example data
        // const data = exampleData;
        // renderDataset(data);
        try {
            const response = await fetch('/dataset/getDataset');
            const data = await response.json();
            renderDataset(data);
        } catch (error) {
            console.error('Error fetching dataset:', error);
        }
    }

    // Function to render dataset
    function renderDataset(data) {
        datasetList.innerHTML = ''; // Clear any existing content

        data.forEach((item, index) => {
            const datasetItem = document.createElement('div');
            datasetItem.classList.add('dataset-item');

            const datasetItemHeader = document.createElement('div');
            datasetItemHeader.classList.add('dataset-item-header');
            datasetItemHeader.addEventListener('click', () => {
                datasetItemSummary.classList.toggle('show');
                datasetItemSummary.style.display = datasetItemSummary.style.display === 'none' ? 'block' : 'none';
            });

            const rawText = document.createElement('span');
            rawText.textContent = item.text;

            datasetItemHeader.appendChild(rawText);
            datasetItem.appendChild(datasetItemHeader);

            const datasetItemSummary = document.createElement('div');
            datasetItemSummary.classList.add('dataset-item-summary');
            datasetItemSummary.style.display = 'none';

            item.summary.forEach(it => {
                const summarizedText = document.createElement('p');
                summarizedText.textContent = it;
                datasetItemSummary.appendChild(summarizedText);
            });

            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.innerText = 'Edit';
            editButton.onclick = function() {
                editSummarizeText(index, item.text, item.summary);
            };
            datasetItemSummary.appendChild(editButton);

            datasetItem.appendChild(datasetItemSummary);
            datasetList.appendChild(datasetItem);
        });
    }

    async function editSummarizeText(index) {
        var selectedLanguage = document.getElementById("language").value;
            // Send a POST request to the API endpoint to add the data set
        const data = {
            index: index,
            language: selectedLanguage
        };
        await fetch('/dataset/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text()) // Convert the response to text
        .then(html => {
            document.open();
            document.write(html); // Write the new HTML content
            document.close();
        })
        .catch(error => {
            // Handle errors
            alert('Error adding data set:', error);
        });
    }

    // Initial fetch of the dataset
    fetchDataset();
});
