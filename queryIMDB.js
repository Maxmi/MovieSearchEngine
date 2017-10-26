const cheerio = require('cheerio');
const rp = require('request-promise');

//http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchTerm}&s=all
//http://www.imdb.com/find?q=${searchTerm}&s=tt&ref_=fn_al_tt_mr
const queryIMDB = (searchTerm) => {
  let options = {
    url: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchTerm}&s=all`,
    json: true,
    transform: body => {
      return cheerio.load(body);
    }
  };
// console.log(options);
  return rp(options)
    .then($ => {
      const movieTitles = $(".findSection:contains('Titles')")
        .find('.result_text')
        .map((i, elm) => $(elm).text())
        .toArray();
        // console.log(movieTitles);
        return movieTitles;
    })
    .catch(err => {
      console.error(err.message);
    });
};


module.exports = {
  queryIMDB
}