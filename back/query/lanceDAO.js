var db = require('../db')

var findAllQuery = 'SELECT * FROM lance'

var findAll = function() {
  return db.query(findAllQuery);
}

module.exports = {
  findAll: findAll
}
