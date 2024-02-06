function openTab(event, tabId) {
    // Check if the clicked button is 'btn--secondary'
    if (!event.currentTarget.classList.contains('btn--secondary')) {
        return; // Do nothing if it's not a 'btn--secondary' button
    }

    // Get all tab links
    var tabLinks = document.getElementsByClassName('tab-link');
    
    // Loop through tab links to switch classes
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

    // Function to activate the Video tab based on URL parameter
    function activateTabFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');

        // Check if 'tab' parameter is set to 'videos'
        if (tab === 'videos') {
            // Assuming 'videoTabId' is the ID of the Video tab
            // and 'videoTabLinkId' is the ID of the Video tab's link
            openTab(null, 'videoTabId'); // Replace 'videoTabId' with the actual ID of your Video tab content
            document.getElementById('videoTabLinkId').classList.add('btn--primary'); // Highlight the Video tab link as active
        }
    }

    activateTabFromURL();

});