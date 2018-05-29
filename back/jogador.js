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

var getJogadorComMaisTipoLance = function (req, res) {
  var tipoLance = req.params.tipoLance;
  var promise = jogadorDAO.getJogadoresOrderDescTipoLance(tipoLance);
  promise.then(function(jogadores) {
    res.json(jogadores[0]);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

module.exports = {
  getJogadoresPorSelecao: getJogadoresPorSelecao,
  getJogadorComMaisTipoLance: getJogadorComMaisTipoLance
}
