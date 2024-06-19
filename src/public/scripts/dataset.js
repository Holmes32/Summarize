// scripts/dataset.js
document.addEventListener("DOMContentLoaded", () => {
    const datasetList = document.getElementById("dataset-list");

    document.getElementById('Button').addEventListener('click', () => {
        window.location.href = '/dataset/download';
    });

    const selectedLanguage = document.getElementById('language');
    selectedLanguage.addEventListener('change', function () {
        fetchDataset();
    });

    // Function to fetch dataset from server (for now using example data)
    async function fetchDataset() {
        try {
            const language = document.getElementById('language').value;
            const dataSend = {
                language: language
            };
            const response = await fetch('/dataset/getDataset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            });
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
            if (item.text.length >= 100) {
                const subRawText = item.text.substring(100, 0) + '...';
                rawText.textContent = subRawText;
            } else {
                rawText.textContent = item.text
            }

            datasetItemHeader.appendChild(rawText);
            datasetItem.appendChild(datasetItemHeader);

            const datasetItemSummary = document.createElement('div');
            datasetItemSummary.classList.add('dataset-item-summary');
            datasetItemSummary.style.display = 'none';

            item.summary.forEach(it => {
                const summarizedText = document.createElement('p');
                if (it.length >= 100) {
                    const subText = it.substring(100, 0) + '...';
                    summarizedText.textContent = subText;
                } else {
                    summarizedText.textContent = it;
                }
                datasetItemSummary.appendChild(summarizedText);
            });

            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.innerText = 'Edit';
            editButton.onclick = function () {
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
