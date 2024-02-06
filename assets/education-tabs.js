function openTab(event, tabId) {
    // Check if the clicked button is 'btn--secondary'
    if (!event.currentTarget.classList.contains('btn--secondary')) {
        return; // Do nothing if it's not a 'btn--secondary' button
    }

    // Determine which tab is being opened and change URL accordingly
    var newUrl = '?tab=default'; // Default tab parameter
    if (tabId === 'EducationPDFs') { // Replace 'pdfTabContentId' with the actual ID of your PDF tab content
        newUrl = '?tab=pdfs';
    } else if (tabId === 'HowToVideos') { // Replace 'videoTabContentId' with the actual ID of your Video tab content
        newUrl = '?tab=videos';
    }
    history.pushState(null, '', newUrl);

    // Get all tab links and loop through them to switch classes
    var tabLinks = document.getElementsByClassName('tab-link');
    for (var i = 0; i < tabLinks.length; i++) {
        if (tabLinks[i].classList.contains('btn--primary')) {
            tabLinks[i].classList.remove('btn--primary');
            tabLinks[i].classList.add('btn--secondary');
        } else if (tabLinks[i] === event.currentTarget) {
            tabLinks[i].classList.remove('btn--secondary');
            tabLinks[i].classList.add('btn--primary');
        }
    }

    // Hide all tab contents
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Show the current tab
    document.getElementById(tabId).classList.add('active');
}


function sortEducationItems(containerId) {
    // Select the container by ID
    const educationList = document.querySelector(`#${containerId} .education-list`);

    if (!educationList) {
        console.error('Education list container not found for ID:', containerId);
        return;
    }

    let educationItems = Array.from(educationList.querySelectorAll('.education-item'));

    educationItems.sort((a, b) => {
        const sortA = a.getAttribute('sort') || Infinity; // Treat missing sort as a large number
        const sortB = b.getAttribute('sort') || Infinity; // Treat missing sort as a large number

        return parseInt(sortB) - parseInt(sortA);
    });

    educationItems.forEach(item => educationList.appendChild(item));
}

// Call the function for sorting education PDF items
sortEducationItems('EducationPDFs');

// Call the function for sorting education video items
sortEducationItems('HowToVideos');

// Function to be executed when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find all <select> elements within elements with the class .tab-content
    var selects = document.querySelectorAll('.tab-content select');

    // Attach a change event listener to each select element
    selects.forEach(function(select) {
        select.addEventListener('change', function() {
            // Get the value of the selected option
            var value = this.value;

            // Check if the value is not empty
            if (value !== '') {
                // Open the value URL in a new tab
                window.open(value, '_blank');
            }
        });
    });

    // Function to simulate a click on the Video tab based on URL parameter
    function clickVideoTabIfParamSet() {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');

        if (tab === 'videos') {
            const videoTabLink = document.getElementById('video-tab');
            if (videoTabLink) videoTabLink.click();
        }
    }

    clickVideoTabIfParamSet();
    
});