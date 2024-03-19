document.addEventListener("DOMContentLoaded", function () {
    function updatePackageIncludesFromValue(selectedValue) {
        const productDropdown = document.querySelector('[data-productdropdown="Package Includes"]');
        const packageIncludes = document.querySelector(`[data-packageincludes="${selectedValue}"]`);

        if (productDropdown && packageIncludes) {
            productDropdown.innerHTML = packageIncludes.innerHTML;
        } else if (productDropdown) {
            // If packageIncludes element is not found, handle it here
            productDropdown.innerHTML = "No matching content found";
        }
        // If productDropdown is not found, handle it here
    }

    function updatePackageIncludes(event) {
        const selectedInputVal = event.target.value; // Get the selected value
        updatePackageIncludesFromValue(selectedInputVal);
    }

    // Function to detect and handle the default-selected variant upon page load
    function handleDefaultSelectedVariant() {
        const defaultSelectedVariant = document.querySelector(".opt-btn:checked") || document.querySelector(".opt-btn[selected]");
        if (defaultSelectedVariant) {
            updatePackageIncludesFromValue(defaultSelectedVariant.value);
        }
    }

    // Add an event listener for variant changes
    document.addEventListener("change", function (event) {
        if (event.target.classList.contains("opt-btn")) {
            updatePackageIncludes(event);
        }
    });

    // Handle the default-selected variant upon page load
    handleDefaultSelectedVariant();
});
