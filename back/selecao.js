var selecaoDAO = require('./query/selecaoDAO')

var getSelecaoMelhorAtaque = function (req, res) {
  var promise = selecaoDAO.getSelecoesOrderByGolsDesc();
  promise.then(function(selecoes) {
    res.json(selecoes[0]);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

var getSelecaoMelhorDefesa = function (req, res) {
  var promise = selecaoDAO.getSelecoesOrderByGolsSofridosAsc();
  promise.then(function(selecoes) {
    res.json(selecoes[0]);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

var getSelecaoMaisCartoes = function (req, res) {
  var promise = selecaoDAO.getSelecoesMaisCartoes();
  promise.then(function(selecoes) {
    res.json(selecoes[0]);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

module.exports = {
  getSelecaoMelhorAtaque: getSelecaoMelhorAtaque,
  getSelecaoMelhorDefesa: getSelecaoMelhorDefesa,
  getSelecaoMaisCartoes: getSelecaoMaisCartoes
}
