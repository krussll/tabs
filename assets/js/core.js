function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (pair[0] === variable) {
      return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    }
  }
}

var searchTerm = getQueryVariable('query');

if (searchTerm) {
  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.
  var idx = lunr(function () {
    this.field('id');
    this.field('title');
    this.field('artist');
    
    window.store.forEach(function (doc) {
      this.add(doc)
    }, this);
  });
  
  var results = idx.search(searchTerm); // Get lunr to perform a search
  displaySearchResults(results, window.store); // We'll write this in the next section
}

function displaySearchResults(results, store) {
  var searchResults = document.getElementById('search-results');

  if (results.length) { // Are there any results?
    var appendString = '';

    for (var i = 0; i < results.length; i++) {  // Iterate over the results
      var item = store[results[i].ref];
      appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
    }

    searchResults.innerHTML = appendString;
  } else {
    searchResults.innerHTML = '<li>No results found</li>';
  }
}

(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
        this.field('id');
        this.field('title');
        this.field('artist');

        window.store.forEach(function (doc) {
          this.add(doc)
        }, this);
      });
    
     var results = idx.search(searchTerm); // Get lunr to perform a search
     displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();
