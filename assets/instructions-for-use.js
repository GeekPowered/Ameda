document.addEventListener('DOMContentLoaded', function() {

    // SORT ITEMS BY SORT ORDER
    const instructionsIndex = document.querySelector('.instructions-index');
    const items = Array.from(instructionsIndex.querySelectorAll('.instruction-item'));
    const sortedItems = items.sort((a, b) => {
        const sortA = parseInt(a.getAttribute('sort'), 10);
        const sortB = parseInt(b.getAttribute('sort'), 10);
        return sortA - sortB;
    });
    instructionsIndex.innerHTML = '';
    sortedItems.forEach(item => instructionsIndex.appendChild(item));
    // DONE SORTING

    const tabs = document.querySelectorAll('.tabs-wrapper button');

    // Function to handle tab click
    function handleTabClick() {
        // Check if the button already has the 'btn--primary' class
        if (this.classList.contains('btn--primary')) {
            return;
        }

        // Remove 'btn--primary' from all buttons and add 'btn--secondary'
        tabs.forEach(t => {
            t.classList.remove('btn--primary');
            t.classList.add('btn--secondary');
        });

        // Add 'btn--primary' to the clicked button and remove 'btn--secondary'
        this.classList.add('btn--primary');
        this.classList.remove('btn--secondary');

        // Get all instruction items
        const instructionItems = document.querySelectorAll('.instruction-item');

        // Remove 'active' class from all instruction items
        instructionItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add 'active' class to instruction items that match the tab name
        const tabName = this.innerText;
        instructionItems.forEach(item => {
            if (item.getAttribute('tabName') === tabName) {
                item.classList.add('active');
            }
        });
    }

    // Add click event listener to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });

    // Simulate a click on the first tab if it exists
    if (tabs.length > 0) {
        tabs[0].click();
    }

    // Find all select elements
    const selectElements = document.querySelectorAll('select');

    // Function to handle select change
    function handleSelectChange() {
        const value = this.value;
        // Check if the value is not empty and is a valid URL
        if (value !== "") {
            // Open the value in a new tab
            window.open(value, '_blank');
        }
    }

    // Add change event listener to each select element
    selectElements.forEach(select => {
        select.addEventListener('change', handleSelectChange);
    });
    
});
