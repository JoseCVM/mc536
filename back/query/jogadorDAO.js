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


var getJogadoresPorSelecao = function(codigoSelecao) {
  return db.query(format(filtraPorSelecao, codigoSelecao));
}

module.exports = {
  getJogadoresPorSelecao: getJogadoresPorSelecao
}
