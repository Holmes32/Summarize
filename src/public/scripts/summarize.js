function summarize() {
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
    .catch(error => {
        alert('There was a problem with the POST request:', error);
    });
}