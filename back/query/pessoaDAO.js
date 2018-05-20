var db = require('../db')

// declara os Selects em variáveis
var findAllQuery = 'SELECT * FROM pessoa'

// declara a função que executa o select
var findAll = function() {
  return db.query(findAllQuery);
}

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
  findAll: findAll
}
