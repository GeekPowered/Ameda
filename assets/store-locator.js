document.addEventListener('DOMContentLoaded', function() {
    // Sorting the state list alphabetically
    var stateList = document.getElementById('stateList');
    var items = stateList.getElementsByClassName('state-link');
    var itemsArray = Array.from(items);

    itemsArray.sort(function(a, b) {
      var textA = a.textContent || a.innerText;
      var textB = b.textContent || b.innerText;
      return textA.localeCompare(textB);
    });

    itemsArray.forEach(function(item) {
      stateList.appendChild(item);
    });

    // Sorting store locations by state
    var storeLocations = document.querySelectorAll('.store-location');
    var storeLocationsArray = Array.from(storeLocations);

    storeLocationsArray.sort(function(a, b) {
      var stateA = a.querySelector('span[state]').getAttribute('state');
      var stateB = b.querySelector('span[state]').getAttribute('state');
      return stateA.localeCompare(stateB);
    });

    var storeLocationsContainer = document.querySelector('.store-locations');
    storeLocationsArray.forEach(function(item) {
      storeLocationsContainer.appendChild(item);
    });

    // Click event listener for state links
    stateList.addEventListener('click', function(event) {
      if (event.target.tagName === 'A') {
        event.preventDefault();

        // Get the target state from the clicked link
        var targetState = event.target.getAttribute('href').substring(1);

        // Find the nearest store-location with a matching state attribute
        var matchingCard = document.querySelector('.store-location span[state="' + targetState + '"]').closest('.store-location');

        // Scroll to the matching card, accounting for header height
        if (matchingCard) {
          var headerHeight = document.querySelector('.header').offsetHeight;
          var targetScrollPosition = matchingCard.offsetTop - headerHeight;

          window.scrollTo({
            top: targetScrollPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });