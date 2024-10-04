document.addEventListener('DOMContentLoaded', function () {

    // Helper function to normalize text (removes spaces, converts to lowercase, removes special characters)
    function normalizeText(text) {
        return text.toLowerCase().replace(/[\s-]+/g, ''); // remove spaces and hyphens
    }

    // Helper function to simulate tab click, supports partial and word matches
    function clickTab(tabHash) {
        const tabs = document.querySelectorAll('.tabs-wrapper button');
        tabs.forEach(tab => {
            const normalizedTabText = normalizeText(tab.innerText);
            const normalizedHash = normalizeText(tabHash);

            // Check if the normalized hash is part of any word in the tab text
            if (normalizedTabText.includes(normalizedHash)) {
                tab.click();
            }
        });
    }

    // Function to scroll to element after a delay, considering the <store-header> height
    function scrollToElement(id, delay = 1000) {
        const element = document.getElementById(id);
        const header = document.querySelector('store-header'); // Select the store-header element
        const headerHeight = header ? header.offsetHeight : 0; // Get the header's height (default to 0 if not found)

        if (element) {
            setTimeout(() => {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight; // Adjust scroll position by header height

                window.scrollTo({
                    top: (offsetPosition - 16),
                    behavior: 'smooth'
                });
            }, delay);
        }
    }

    // Function to decode hash and handle Safari's `%23` encoding issue
    function decodeHash(hash) {
        return decodeURIComponent(hash);
    }

    // Handle hash routing
    function handleHashRouting() {
        const hash = window.location.hash;

        if (hash) {
            const decodedHash = decodeHash(hash); // Decode any encoded characters
            const [tabHash, scrollHash] = decodedHash.split('#').filter(Boolean); // Filter to remove empty strings

            if (tabHash) {
                clickTab(tabHash); // Click on the corresponding tab based on the hash
            }

            if (scrollHash) {
                scrollToElement(scrollHash, 1000); // Scroll to the element after a delay
            }
        }
    }

    // Existing code: SORT ITEMS BY SORT ORDER...
    const instructionsIndex = document.querySelector('.instructions-index');
    const items = Array.from(instructionsIndex.querySelectorAll('.instruction-item'));
    const sortedItems = items.sort((a, b) => {
        const sortA = parseInt(a.getAttribute('sort'), 10);
        const sortB = parseInt(b.getAttribute('sort'), 10);
        return sortA - sortB;
    });
    instructionsIndex.innerHTML = '';
    sortedItems.forEach(item => instructionsIndex.appendChild(item));

    // Tabs functionality
    const tabs = document.querySelectorAll('.tabs-wrapper button');

    function handleTabClick() {
        if (this.classList.contains('btn--primary')) {
            return;
        }
        tabs.forEach(t => {
            t.classList.remove('btn--primary');
            t.classList.add('btn--secondary');
        });

        this.classList.add('btn--primary');
        this.classList.remove('btn--secondary');

        const instructionItems = document.querySelectorAll('.instruction-item');
        instructionItems.forEach(item => {
            item.classList.remove('active');
        });

        const tabName = this.innerText;
        instructionItems.forEach(item => {
            if (item.getAttribute('tabName') === tabName) {
                item.classList.add('active');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });

    if (tabs.length > 0) {
        tabs[0].click(); // Ensure the first tab is clicked by default
    }

    // Function to detect if the browser is Safari
    function isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
    
    // Handle selects
    const selectElements = document.querySelectorAll('select');
    Array.prototype.forEach.call(selectElements, function(select) {
        select.addEventListener('change', function () {
            const value = this.value;
            if (value !== "") {
                if (isSafari()) {
                    // Open in the same window for Safari
                    window.location.href = value;
                } else {
                    // Open in a new tab for non-Safari browsers
                    window.open(value, '_blank');
                }
            }
        });
    });

    // Run hash routing logic after the tabs are initialized
    handleHashRouting(); // This ensures the hash logic runs after the DOM is fully ready

});