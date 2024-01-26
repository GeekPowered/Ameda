document.addEventListener("DOMContentLoaded", function () {
    // This code will run when the document is fully loaded and ready
  
    function updatePackageIncludes(event) {
      const selectedInputVal = event.target.value; // Get the selected value
  
      const productDropdown = document.querySelector('[data-productdropdown="Package Includes"]');
      const packageIncludes = document.querySelector(`[data-packageincludes="${selectedInputVal}"]`);
  
      if (packageIncludes) {
        productDropdown.innerHTML = packageIncludes.innerHTML;
      } else {
        productDropdown.innerHTML = "No matching content found";
      }
    }
  
    // Add an event listener to the document and use event delegation
    document.addEventListener("change", function (event) {
      if (event.target.classList.contains("opt-btn")) {
        updatePackageIncludes(event);
      }
    });
  });
  