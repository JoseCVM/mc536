var db = require('../db')

var findAllQuery = 'SELECT * FROM pessoa'

var findAll = function() {
  return db.query(findAllQuery);
}

module.exports = {
  findAll: findAll
}
