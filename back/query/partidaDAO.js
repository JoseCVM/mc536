const format = require('string-format')
var db = require('../db')

var todasAsPartidas =
"select t1.id_partida as idPartida, t1.numero_grupo as numeroGrupo, t1.nome_estadio as estadio, \
t1.nome_cidade as cidadePartida, DATE_FORMAT(t1.data, '%d/%m/%Y') as dataPartida, t1.horario as horaPartida, \
t1.nome_pais as nomeSelecao1, t1.codigo_pais as codigoSelecao1, t1.gols as golsSelecao1, t1.bandeira as bandeiraSelecao1, \
t2.nome_pais as nomeSelecao2, t2.codigo_pais as codigoSelecao2, t2.gols as golsSelecao2, t2.bandeira as bandeiraSelecao2 from \
(\
  select part.id_partida, e.nome as nome_estadio, c.nome as nome_cidade, p.numero_grupo, p.data, \
  p.horario, s.nome_pais, part.codigo_pais, count(j.id_pessoa) as gols, s.bandeira from \
  partida p \
  join estadio e on e.id_estadio = p.id_estadio \
  join cidade c on c.id_cidade = e.id_cidade \
  join participacao part on p.id_partida = part.id_partida \
  join selecao s on s.codigo_pais = part.codigo_pais \
  left join lance l on part.id_partida = l.id_partida and l.tipo_lance = 'GOL' \
  left join jogador j on j.id_pessoa = l.id_pessoa and j.codigo_pais_joga = part.codigo_pais \
  group by part.id_partida, part.codigo_pais, e.nome, c.nome \
  order by part.id_partida \
) t1 join \
(select part.id_partida, e.nome as nome_estadio, c.nome as nome_cidade, p.numero_grupo, \
  p.data, p.horario, s.nome_pais, part.codigo_pais, count(j.id_pessoa) as gols, s.bandeira from \
partida p \
join estadio e on e.id_estadio = p.id_estadio \
join cidade c on c.id_cidade = e.id_cidade \
join participacao part on p.id_partida = part.id_partida \
join selecao s on s.codigo_pais = part.codigo_pais \
left join lance l on part.id_partida = l.id_partida and l.tipo_lance = 'GOL' \
left join jogador j on j.id_pessoa = l.id_pessoa \
and j.codigo_pais_joga = part.codigo_pais \
group by part.id_partida, part.codigo_pais, e.nome, c.nome \
order by part.id_partida) t2 \
on t1.id_partida = t2.id_partida and t1.codigo_pais < t2.codigo_pais ";

var filtraPorSelecao = "and (t1.codigo_pais = 'BRA' or t2.codigo_pais = 'BRA')"

var getTodasAsPartidas = function() {
  return db.query(todasAsPartidas);
}

var getPartidasPorSelecao = function(codigoSelecao) {
  var query = todasAsPartidas + filtraPorSelecao;
  return db.query(format(query, codigoSelecao));
}

module.exports = {
  getPartidas: getTodasAsPartidas,
  getPartidasPorSelecao: getPartidasPorSelecao
}
