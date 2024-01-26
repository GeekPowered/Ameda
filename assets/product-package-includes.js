document.addEventListener("DOMContentLoaded", function () {
    // This code will run when the document is fully loaded and ready

    function updatePackageIncludes(event) {
    const selectedInputVal = event.target.value; // Get the selected value

    const productDropdown = document.querySelector('[data-productdropdown="Package Includes"]');
    const packageIncludes = document.querySelector(`[data-packageincludes="${selectedInputVal}"]`);

    if (productDropdown && packageIncludes) {
        productDropdown.innerHTML = packageIncludes.innerHTML;
    } else if (productDropdown) {
        // If packageIncludes element is not found, you can handle it here
        productDropdown.innerHTML = "No matching content found";
    }
    // If productDropdown is not found, you can also handle it here
    }

    // Add an event listener to the document and use event delegation
    document.addEventListener("change", function (event) {
    if (event.target.classList.contains("opt-btn")) {
        updatePackageIncludes(event);
    }
    });
});