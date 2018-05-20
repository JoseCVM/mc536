const format = require('string-format')
var db = require('../db')

var partidasEmQueJogadorFezGolQuery =
'SELECT p.* FROM partida p '+
'JOIN lance l ON p.id_partida = l.id_partida '+
'JOIN jogador j ON l.id_pessoa = {} ' +
'WHERE l.tipo_de_lance=\'Gol\'';

var getPartidasQueFezGol = function(idJogador) {
  return db.query(format(partidasEmQueJogadorFezGolQuery, idJogador));
}

module.exports = {
  getPartidasQueFezGol: getPartidasQueFezGol
}
