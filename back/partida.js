var partidaDAO = require('./query/partidaDAO')

var getPartidasQueFezGol = function (req, res) {
    var idJogador = req.params.idJogador;
  var promise = partidaDAO.getPartidasQueFezGol(idJogador);
  promise.then(function(partidas) {
    res.json(partidas);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

module.exports = {
  getPartidasQueFezGol: getPartidasQueFezGol
}
