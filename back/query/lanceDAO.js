const format = require('string-format')
var db = require('../db')

var getLancesPartidaQuery =
"select l.time_stamp as minuto, l.tipo_lance as tituloLance, l.descricao, \
j.nome_conhecido as nomeJogador, s.bandeira \
from lance l \
left join jogador j on j.id_pessoa=l.id_pessoa \
left join selecao s on j.codigo_pais_joga = s.codigo_pais \
where l.id_partida = {0}";

var getLancesPorIdPartida = function(idPartida) {
  return db.query(format(getLancesPartidaQuery, idPartida));
}

module.exports = {
  getLancesPorIdPartida: getLancesPorIdPartida
}
