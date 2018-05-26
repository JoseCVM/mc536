var db = require('../db')

// declara os Selects em variáveis
var findAllQuery = "select t1.id_partida, t1.numero_grupo, t1.data, t1.horario, t1.nome_pais as nome_pais1, t1.codigo_pais as codigo_pais1, t1.gols as gols1, t2.nome_pais as nome_pais2, t2.codigo_pais as codigo_pais2, t2.gols as gols2 from\
(select part.id_partida, p.numero_grupo, p.data, p.horario, s.nome_pais, part.codigo_pais, count(j.id_pessoa) as gols from \
partida p \
join participacao part on p.id_partida = part.id_partida \
join selecao s on s.codigo_pais = part.codigo_pais \
left join lance l on part.id_partida = l.id_partida and l.tipo_lance = 'GOL' \
left join jogador j on j.id_pessoa = l.id_pessoa and j.codigo_pais_joga = part.codigo_pais \
where p.fase = 'GRUPOS' \
group by part.id_partida, part.codigo_pais \
order by part.id_partida) t1 join \
(select part.id_partida, p.numero_grupo, p.data, p.horario, s.nome_pais, part.codigo_pais, count(j.id_pessoa) as gols from \
partida p \
join participacao part on p.id_partida = part.id_partida \
join selecao s on s.codigo_pais = part.codigo_pais \
left join lance l on part.id_partida = l.id_partida and l.tipo_lance = 'GOL' \
left join jogador j on j.id_pessoa = l.id_pessoa and j.codigo_pais_joga = part.codigo_pais \
where p.fase = 'GRUPOS' \
group by part.id_partida, part.codigo_pais \
order by part.id_partida) t2 on t1.id_partida = t2.id_partida and t1.codigo_pais < t2.codigo_pais";

// declara a função que executa o select
var findAll = function() {
  return db.query(findAllQuery);
}

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
  findAll: findAll
}
