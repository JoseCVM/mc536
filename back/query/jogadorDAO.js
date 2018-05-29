const format = require('string-format')
var db = require('../db')

var filtraPorSelecao =
"select nome_conhecido as nome, posicao, numero_camisa as camisa, \
sum(case l.tipo_lance when 'GOL' then 1 else 0 end) as gols, \
sum(case l.tipo_lance when 'CARTAO VERMELHO' then 1 else 0 end) as cartoesVermelhos, \
sum(case l.tipo_lance when 'CARTAO AMARELO' then 1 else 0 end) as cartoesAmarelos \
from jogador j \
left join lance l on l.id_pessoa = j.id_pessoa \
where j.codigo_pais_joga='{0}' \
group by j.nome_conhecido,j.posicao,j.numero_camisa order by j.numero_camisa"

var queryOrderDescPorLance =
"select MAX(t.numero) as numero, nome_conhecido as nome, bandeira, nome_pais as nomeSelecao \
from  ( \
select j.nome_conhecido, s.bandeira, s.nome_pais, \
sum(case l.tipo_lance when '{0}' then 1 else 0 end) as numero from jogador j \
left join lance l on l.id_pessoa = j.id_pessoa \
inner join selecao s on s.codigo_pais = j.codigo_pais_joga \
group by j.nome_conhecido, s.bandeira, s.nome_pais \
) t \
group by nome, bandeira, nomeSelecao \
order by numero desc"


var getJogadoresPorSelecao = function(codigoSelecao) {
  return db.query(format(filtraPorSelecao, codigoSelecao));
}

var getJogadoresOrderDescTipoLance = function(tipoLance) {
  return db.query(format(queryOrderDescPorLance, tipoLance));
}

module.exports = {
  getJogadoresPorSelecao: getJogadoresPorSelecao,
  getJogadoresOrderDescTipoLance: getJogadoresOrderDescTipoLance
}
