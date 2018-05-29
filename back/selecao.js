var selecaoDAO = require('./query/selecaoDAO')

var getSelecaoComMaisGols = function (req, res) {
  var promise = selecaoDAO.getSelecoesOrderByGolsDesc();
  promise.then(function(selecoes) {
    res.json(selecoes[0]);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

module.exports = {
  getSelecaoComMaisGols: getSelecaoComMaisGols
}
