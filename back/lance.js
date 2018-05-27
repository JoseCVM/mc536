var lanceDAO = require('./query/lanceDAO')

var getLancesPorIdPartida = function (req, res) {
  var idPartida = parseInt(req.params.idPartida);
  var promise = lanceDAO.getLancesPorIdPartida(idPartida);
  promise.then(function(lances) {

    for (var i=0; i < lances.length; i++) {
      var horario = lances[i].minuto.split(/[:]/);
      var h = parseInt(horario[0]);
      var m = parseInt(horario[1]);
      var minuto = h*60 + m;

      lances[i].minuto = minuto;
    }

    res.json(lances);
  }).catch(function(error) {
    res.status(500).send(error.message);
  });
}

module.exports = {
  getLancesPorIdPartida: getLancesPorIdPartida
}
