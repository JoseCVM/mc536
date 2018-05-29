var db = require('../db')

var querySelecoesOrderByGolsDesc =
"select s.nome_pais as nome, s.bandeira, COUNT(l.id_pessoa) as golsFeitos from \
selecao s \
left join jogador j on j.codigo_pais_joga = s.codigo_pais \
left join lance l on j.id_pessoa = l.id_pessoa and l.tipo_lance='GOL' \
group by s.codigo_pais \
order by golsFeitos desc"

var getSelecoesOrderByGolsDesc = function() {
  return db.query(querySelecoesOrderByGolsDesc);
}

module.exports = {
  getSelecoesOrderByGolsDesc: getSelecoesOrderByGolsDesc
}
