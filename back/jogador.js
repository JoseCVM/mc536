var jogadorDAO = require('./query/jogadorDAO')

var getJogadoresPorSelecao = function (req, res) {
    var codigoSelecao = req.params.codigoSelecao;
  var promise = jogadorDAO.getJogadoresPorSelecao(codigoSelecao);
  promise.then(function(jogadores) {
    res.json(jogadores);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

module.exports = {
  getJogadoresPorSelecao: getJogadoresPorSelecao
}
