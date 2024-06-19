function summarize() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    var inputText = document.getElementById("inputText").value;
    var selectedAlgorithm = document.getElementById("algorithm").value;
    var selectedLanguage = document.getElementById("language").value;
    var selectedCompression = document.getElementById("compression").value;
    
    console.log(selectedAlgorithm)
    console.log(selectedLanguage)
    // Make a POST request to the server API endpoint
    fetch('/summarize/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
             text: inputText, 
             algorithm: selectedAlgorithm,
             language: selectedLanguage,
             compression: selectedCompression
            })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Display the summary received from the server
        document.getElementById("summary").innerText = data.message;
    })
    .finally(() => {
        // Hide the spinner when the request is complete
        spinner.style.display = 'none';
    })
    .catch(error => {
        alert('There was a problem with the POST request:', error);
    });
}

function updateAlgorithms() {
    const languageSelect = document.getElementById("language");
    const algorithmSelect = document.getElementById("algorithm");
    const vietnameseSelected = languageSelect.value === "vietnamese";

    // Check if T5 option already exists
    let t5Option = Array.from(algorithmSelect.options).find(option => option.value === "t5");

    if (vietnameseSelected && !t5Option) {
        // Add T5 option if it doesn't exist and Vietnamese is selected
        t5Option = document.createElement("option");
        t5Option.value = "t5";
        t5Option.text = "T5";
        algorithmSelect.appendChild(t5Option);
    } else if (!vietnameseSelected && t5Option) {
        // Remove T5 option if it exists and Vietnamese is not selected
        algorithmSelect.removeChild(t5Option);
    }
}

function updateCompress() {
    const compressSelect = document.getElementById("compression-container");
    const algorithmSelect = document.getElementById("algorithm");
    const t5Selected = algorithmSelect.value === "t5";

    if (t5Selected) {
        compressSelect.style.display = 'none';
    } else if (!t5Selected) {
        compressSelect.style.display = 'block';
    }
}