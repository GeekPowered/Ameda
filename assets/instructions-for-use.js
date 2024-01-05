document.addEventListener('DOMContentLoaded', function() {
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
});
