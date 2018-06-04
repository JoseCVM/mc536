var db = require('../db')

var querySelecoesOrderByGolsDesc =
"select s.nome_pais as nome, s.bandeira, COUNT(l.id_pessoa) as golsFeitos from \
selecao s \
left join jogador j on j.codigo_pais_joga = s.codigo_pais \
left join lance l on j.id_pessoa = l.id_pessoa and l.tipo_lance='GOL' \
group by s.codigo_pais \
order by golsFeitos desc"

var querySelecoesOrderByGolsSofridosAsc =
"select t1.nome_pais as nome, SUM(t2.gols) as golsSofridos, t1.bandeira as bandeira from \
(select part.id_partida, s.nome_pais, part.codigo_pais, count(j.id_pessoa) as gols, s.bandeira from \
partida p \
join participacao part on p.id_partida = part.id_partida \
join selecao s on s.codigo_pais = part.codigo_pais \
left join lance l on part.id_partida = l.id_partida and l.tipo_lance = 'GOL' \
left join jogador j on j.id_pessoa = l.id_pessoa and j.codigo_pais_joga = part.codigo_pais \
group by part.id_partida, part.codigo_pais, s.bandeira \
order by part.id_partida) t1 join \
(select part.id_partida, s.nome_pais, part.codigo_pais, count(j.id_pessoa) as gols, s.bandeira from \
partida p \
join participacao part on p.id_partida = part.id_partida \
join selecao s on s.codigo_pais = part.codigo_pais \
left join lance l on part.id_partida = l.id_partida and l.tipo_lance = 'GOL' \
left join jogador j on j.id_pessoa = l.id_pessoa and j.codigo_pais_joga = part.codigo_pais \
group by part.id_partida, part.codigo_pais, s.bandeira \
order by part.id_partida) t2 \
on t1.id_partida = t2.id_partida and not t1.codigo_pais = t2.codigo_pais \
group by t1.nome_pais, t1.bandeira \
order by golsSofridos"

var querySelecoesMaisCartoes =
"select s.nome_pais as nome, s.bandeira, COUNT(l.id_pessoa) as cartoes from \
selecao s \
left join jogador j on j.codigo_pais_joga = s.codigo_pais \
left join lance l on j.id_pessoa = l.id_pessoa and ( \
  l.tipo_lance='CARTAO VERMELHO' or l.tipo_lance='CARTAO AMARELO') \
group by s.codigo_pais \
order by cartoes desc"

var querySelecoesOrderByFaltas =
"select s.nome_pais as nome, s.bandeira, COUNT(l.id_pessoa) as numeroFaltas from \
selecao s \
left join jogador j on j.codigo_pais_joga = s.codigo_pais \
left join lance l on j.id_pessoa = l.id_pessoa and l.tipo_lance='FALTA' \
group by s.codigo_pais \
order by numeroFaltas "

var querySelecoesMaioresGoleadas =
"select s.nome_pais as nome, s.bandeira as bandeira, count(j.id_pessoa) as golsFeitos from \
partida p \
join participacao part on p.id_partida = part.id_partida \
join selecao s on s.codigo_pais = part.codigo_pais \
left join lance l on part.id_partida = l.id_partida and l.tipo_lance = 'GOL' \
left join jogador j on j.id_pessoa = l.id_pessoa and j.codigo_pais_joga = part.codigo_pais \
group by part.id_partida, part.codigo_pais \
order by golsFeitos desc"

var getSelecoesOrderByGolsDesc = function() {
  return db.query(querySelecoesOrderByGolsDesc);
}

var getSelecoesOrderByGolsSofridosAsc = function() {
  return db.query(querySelecoesOrderByGolsSofridosAsc);
}

var getSelecoesMaisCartoes = function() {
  return db.query(querySelecoesMaisCartoes);
}

var getSelecoesMaisFaltas = function() {
  query = querySelecoesOrderByFaltas + "desc";
  return db.query(query);
}

var getSelecoesMenosFaltas = function() {
  query = querySelecoesOrderByFaltas + "asc";
  return db.query(query);
}

var getSelecoesMaioresGoleadas = function() {
  return db.query(querySelecoesMaioresGoleadas);
}

module.exports = {
  getSelecoesOrderByGolsDesc: getSelecoesOrderByGolsDesc,
  getSelecoesOrderByGolsSofridosAsc: getSelecoesOrderByGolsSofridosAsc,
  getSelecoesMaisCartoes: getSelecoesMaisCartoes,
  getSelecoesMaisFaltas: getSelecoesMaisFaltas,
  getSelecoesMenosFaltas: getSelecoesMenosFaltas,
  getSelecoesMaioresGoleadas: getSelecoesMaioresGoleadas
}
