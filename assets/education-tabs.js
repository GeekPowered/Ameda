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

function sortEducationItems() {
    // Select the container
    const educationList = document.querySelector('.education-list');

    // Select all education items and convert NodeList to Array
    let educationItems = Array.from(educationList.querySelectorAll('.education-item'));

    // Sort the items in reverse order
    educationItems.sort((a, b) => {
        // Get the sort attribute values
        const sortA = a.getAttribute('sort');
        const sortB = b.getAttribute('sort');

        // Check if sort attributes are empty or not set, and handle accordingly
        if (!sortA) return 1; // Move a to the end if sort attribute is missing
        if (!sortB) return -1; // Move b to the end if sort attribute is missing

        // Compare numeric values of sort attributes, reversed
        return parseInt(sortB) - parseInt(sortA);
    });

    // Re-append sorted items to the container
    educationItems.forEach(item => educationList.appendChild(item));
}


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


    // Call the function to sort the items
    sortEducationItems();
});