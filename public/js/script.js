const saveSearchData = (searchTerm) => {
  return $.post('/history', {searchTerm})
  .catch(err => {console.log(err)});
};

$(document).ready(() => {
  $('#searchForm').submit((e) => {
    e.preventDefault(); //prevents the form from being submitted as normally

    // bds: this could be defined once globally, outside the function
    let searchField = $('#searchField');

    // bds: neither of these need to be "let"s -- they can both be "const"s
    let searchTerm = searchField.val();
    saveSearchData(searchTerm);
    getMovies(searchTerm);
  });
});

const getMovies = (searchTerm) => {
  $.ajax({
    method: 'GET',
    // bds: make the base URL a constant at the top of the file
    // bds: make the api_key something you get from AJAX from a server route, and 
    // bds: have the server get it from a .env file that's not committed to github
    // bds: so that your key is not available on github (or in client code) for the world to see
    url: `https://api.themoviedb.org/3/search/movie?api_key=88423b3772a17526c8dc420cae5a84a8&query=${searchTerm}`,
    dataType: 'json',
  })
    .then((res) => {
      let content = '';
      if (res.total_results === 0) {
        // bds: consider making a new element here and setting the element text, rather
        // bds: than writing raw HTML
        content = `<p>Nothing found on "${searchTerm}"</p>`;
        $('#responseContainer').html(content);
        $('#searchField').val('');
      } else {
        // bds: here, DEFINITELY make new elements and hook them up rather than writing
        // bds: raw html

        // bds: also, put the tmdb base URL as a constant at the top of the file
        content = '<h2>Search Results</h2>' + '<div>' + res.results.map(movie =>
          `<div class="movieInfo">
            <span class='image'>
            <img src='https://image.tmdb.org/t/p/w300/${movie.poster_path}' height="150"/></span>
            <span class='title'>
            ${movie.original_title}</span>
            <span class='date'>${movie.release_date}</span>
            </div>` ).join('') + '</div>';
        // add the generated content to the page
        $('#responseContainer').html(content);
        // clear the searchField
        $('#searchField').val('');
      }

    })
    .catch(err => {
      console.log('Error occured when retrieving data', err);
    })
};
