function includeHeader() {
    document.addEventListener("DOMContentLoaded", function() {
        var links = document.querySelectorAll('.nav ul li a');
    
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                links.forEach(function(link) {
                    link.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        });
    });
    
    var xhr = new XMLHttpRequest();

    var headerPath = '../views/header.html';

    xhr.open('GET', headerPath, true);

    xhr.responseType = 'text';

    // Define what to do when the request is completed
    xhr.onload = function() {
        // Check if the request was successful
        if (xhr.status === 200) {
            // Insert the header HTML into the page
            document.getElementById('header-container').innerHTML = xhr.responseText;
        } else {
            // Log an error message if the request failed
            console.error('Failed to load header:', xhr.statusText);
        }
    };

    // Send the request
    xhr.send();
}

// Call the includeHeader function when the window is loaded
window.onload = includeHeader;