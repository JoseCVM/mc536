var partidaDAO = require('./query/partidaDAO')

var getPartidasPorSelecao = function (req, res) {
    var codigoSelecao = req.params.codigoSelecao;
  var promise = partidaDAO.getPartidasPorSelecao(codigoSelecao);
  promise.then(function(partidas) {
    res.json(partidas);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

var getPartidaPorId = function (req, res) {
  var idPartida = parseInt(req.params.idPartida);
  var promise = partidaDAO.getPartidaPorId(idPartida);
  promise.then(function(partida) {
    res.json(partida);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

var getPartidas = function (req, res) {
  var promise = partidaDAO.getPartidas();
  promise.then(function(partidas) {
    res.json(partidas);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

module.exports = {
  get: getPartidas,
  getPartidasPorSelecao: getPartidasPorSelecao,
  getPartidaPorId: getPartidaPorId
}
