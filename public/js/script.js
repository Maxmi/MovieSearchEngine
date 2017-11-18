const saveSearchData = (searchTerm) => {
  return $.post('/history', {searchTerm}).catch(err => {console.log(err)});
};

$(document).ready(() => {
  $('#searchForm').submit(e => {
    e.preventDefault(); //prevents the form from being submitted as normally
    let searchField = $('#searchField');
    let searchTerm = searchField.val();
    saveSearchData(searchTerm);
    getMovies(searchTerm);

  })
});

const getMovies = (searchTerm) => {
  $.ajax({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?api_key=88423b3772a17526c8dc420cae5a84a8&query=${searchTerm}`,
      dataType: 'json'
    })
    .then(res => {
      let content = '';
      if (res.total_results === 0) {
        content = `<p>Nothing found on "${searchTerm}"</p>`;
        $('#responseContainer').html(content);
        $('#searchField').val('');
      } else {
        content = '<h2>Search Results</h2>' + '<div>' + res.results.map(movie =>
          `<div class="movieInfo">
            <span class='image'>
            <img src='https://image.tmdb.org/t/p/w300/${movie.poster_path}' height="150"/></span>
            <span class='title'>
            ${movie.original_title}</span>
            <span class='date'>${movie.release_date}</span>
            </div>`
        ).join('') + '</div>';
        //add the generated content to the page
        $('#responseContainer').html(content);
        //clear the searchField
        $('#searchField').val('');
      }

    })
    .catch(err => {
      console.log('Error occured when retrieving data', err);
    })
};
