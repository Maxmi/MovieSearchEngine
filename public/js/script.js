const CONTROLLER = {
  searchMovie: function(event) {
    event.preventDefault();
    let searchField = ELEMENTS.searchInput();
    let searchTerm = searchField.value;
    DATA.searchMovie(searchTerm).then(movies => {
      UI.updateSearchResults(movies.results);
      DATA.saveSearch(searchTerm);
      UI.clearSearchInput();
    });
  }
};

const DATA = {
  searchMovie: function(searchTerm) {
    return fetch(`/movie/${searchTerm}`).then(res => res.json());
  },
  saveSearch: function(searchTerm) {
    return fetch('/history', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ searchTerm: searchTerm })
    });
  }
};

const ELEMENTS = {
  searchResutsDiv: () => document.getElementById('responseContainer'),
  searchInput: () => document.getElementById('searchField'),
  searchForm: () => document.getElementById('searchForm')
};

const UI = {
  buildHTMLForMovie: function(movie) {
    return `<div class="movieInfo">
              <span class='image'>
                <img src='https://image.tmdb.org/t/p/w300/${movie.poster_path}' height="150"/>
              </span>
              <span class='title'>
                ${movie.original_title}
              </span>
              <span class='overview'>
                ${movie.overview}
              </span>
              <span class='date'>
                ${movie.release_date}
              </span>
            </div>`;
  },

  clearSearchInput: function() {
    ELEMENTS.searchInput().value = '';
  },

  updateSearchResults: function(movies) {
    let searchField = ELEMENTS.searchInput();
    let searchTerm = searchField.value;
    let moviesHTML = `<h2>Search Results for "${searchTerm}"</h2>`;
    moviesHTML += movies.map(UI.buildHTMLForMovie).join('');
    ELEMENTS.searchResutsDiv().innerHTML = moviesHTML;
  }
};

const addEventHandlers = () => {
  ELEMENTS.searchForm().addEventListener('submit', CONTROLLER.searchMovie);
};

addEventHandlers();
