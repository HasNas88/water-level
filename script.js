// Unique ID: 123456789

// JavaScript code for handling button toggling, updating distance label, and displaying unique ID

document.getElementById('pumpButton').addEventListener('click', function() {
    toggleButton('pumpButton');
});

document.getElementById('sensorButton').addEventListener('click', function() {
    toggleButton('sensorButton');
});

function toggleButton(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.toggle('on');
    button.classList.toggle('off');
}

function updateData() {
    fetch('/water_level')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch water level data');
        }
    })
    .then(function(data) {
        const distance = data.water_level;
        const uniqueID = data.unique_id; // Extract the unique ID from the response

        // Update distance label
        document.getElementById('distance').textContent = distance + ' cm';

        // Update unique ID display
        document.getElementById('uniqueID').textContent = uniqueID;
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}

// Update data every 5 seconds
setInterval(updateData, 5000);

// Initial update
updateData();
