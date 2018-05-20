// importa o pessoaDAO
var pessoaDAO = require('./query/pessoaDAO')

// função que executa o método contido em pessoaDAO, e a partir do resultado da
// consulta, retorna o json de resposta caso OK, ou uma mensagem de erro, caso NOK
var get = function (req, res) {
  var promise = pessoaDAO.findAll();

  promise.then(function(result) {
    res.json(result);
  }).catch(function(error) {
    res.status(500).send('internal server error');
  })
};

// torna public o método get
module.exports = {
  get: get
};
