$(document).ready(() => {
  $('#searchForm').submit(e => {
    e.preventDefault(); //prevents the form from being submitted as normally
    let searchField = $('#searchField');
    let searchTerm = searchField.val();
    // let searchBtn = $('#searchBtn');
    
    getMovies(searchTerm);

  })
});

const getMovies = (searchTerm) => {
  // console.log(searchTerm);
  // searchField.prop('disabled', true);
  // searchBtn.val('Searching...');
  
  
  $.ajax({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?api_key=88423b3772a17526c8dc420cae5a84a8&query=${searchTerm}`,
      dataType: 'json'
    })
    .then(res => {
      // console.log(res);
      let content = '';
      if (res.total_results === 0) {
        content = `<p>Nothing found on "${searchTerm}"</p>`;
        $('#responseContainer').html(content);
        $('#searchField').val('');
      } else {
        content = '<h2>Search Results</h2>' + '<ul>' + res.results.map(movie =>
          `<li class='movieInfo'>
            ${movie.original_title} --- ${movie.release_date} --- <a href='https://image.tmdb.org/t/p/w300/${movie.poster_path}' target='_blank'>Link to poster</a>
          </li>`
        ).join('') + '</ul>';
        $('#responseContainer').html(content);
        
        // searchTerm = '';
        $('#searchField').val('');
        // searchField.val('').prop('disabled', false);
        // searchBtn.attr('disabled', false).val('Search');
        
      }

    })
    .catch(err => {
      console.log('Error occured when retrieving data', err);
    })
};