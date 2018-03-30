const { expect } = require('chai');
const { truncateTable } = require('./helpers.js');
const { addUser, getUser, saveSearch, getSearchHistory } = require('../../src/db/actions');

describe('add user', function() {
  beforeEach(() => {
    return truncateTable('users')
  });
  it('should add one user into users table', () => {
    return addUser('test@test.com', 'testpass')
      .then(insertedUser => {
        return getUser(insertedUser.email, insertedUser.password)
          .then(fetchedUser => {
            return expect(fetchedUser).to.deep.eql(insertedUser);
          });
      });
  });
});

describe('save search', function (){
  beforeEach(() => {
    return truncateTable('searches');
  });

  it('should save user\'s search data in searches table', () => {
    return saveSearch('history', 'test@test.com')
      .then(savedData => {
        return getSearchHistory(savedData.email)
          .then(retrievedData => {
            return expect(retrievedData[0].search_term).to.deep.eql(savedData.search_term);
          })
      })
  })
});
