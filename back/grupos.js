var resultadosPartidasDAO = require('./query/resultadosPartidasDAO')

var get = function (req, res) {
  var promise = resultadosPartidasDAO.findAll();

  promise.then(function(result) {
  	var dadosSelecoes = { };

  	for (var i = 0; i < result.length; i++)
  	{
  		if (dadosSelecoes[result[i].codigo_pais1] === undefined)
  		{
  			dadosSelecoes[result[i].codigo_pais1] = {grupo: 0, nome: "", gols: 0, golsContra: 0, vitorias: 0, derrotas: 0, empates: 0};
  		}
  		if (dadosSelecoes[result[i].codigo_pais2] === undefined)
  		{
  			dadosSelecoes[result[i].codigo_pais2] = {grupo: 0, nome: "", gols: 0, golsContra: 0, vitorias: 0, derrotas: 0, empates: 0};
  		}

  		dadosSelecoes[result[i].codigo_pais1].nome = result[i].nome_pais1;
  		dadosSelecoes[result[i].codigo_pais2].nome = result[i].nome_pais2;

  		dadosSelecoes[result[i].codigo_pais1].grupo = result[i].numero_grupo;
  		dadosSelecoes[result[i].codigo_pais2].grupo = result[i].numero_grupo;

  		dadosSelecoes[result[i].codigo_pais1].gols += result[i].gols1;
  		dadosSelecoes[result[i].codigo_pais2].gols += result[i].gols2;

  		dadosSelecoes[result[i].codigo_pais1].golsContra += result[i].gols2;
  		dadosSelecoes[result[i].codigo_pais2].golsContra += result[i].gols1;

  		if (result[i].gols1 > result[i].gols2)
  		{
  			dadosSelecoes[result[i].codigo_pais1].vitorias += 1;
  			dadosSelecoes[result[i].codigo_pais2].derrotas += 1;
  		}
  		else if (result[i].gols2 > result[i].gols1)
  		{
  			dadosSelecoes[result[i].codigo_pais2].vitorias += 1;
  			dadosSelecoes[result[i].codigo_pais1].derrotas += 1;
  		}
  		else
  		{
  			dadosSelecoes[result[i].codigo_pais2].empates += 1;
  			dadosSelecoes[result[i].codigo_pais1].empates += 1;
  		}
  	}

  	var tabelaGrupos = [{numeroGrupo: 0, selecoes: []},{numeroGrupo: 0, selecoes: []},{numeroGrupo: 0, selecoes: []},
  	{numeroGrupo: 0, selecoes: []},{numeroGrupo: 0, selecoes: []},{numeroGrupo: 0, selecoes: []},{numeroGrupo: 0, selecoes: []}
  	,{numeroGrupo: 0, selecoes: []}];
  	for (var x in dadosSelecoes)
  	{
  		console.log(x);
  		console.log(dadosSelecoes[x]);
  		tabelaGrupos[dadosSelecoes[x].grupo - 1].numeroGrupo = String.fromCharCode(64 + dadosSelecoes[x].grupo);
  		tabelaGrupos[dadosSelecoes[x].grupo - 1].selecoes.push({
      		nome: dadosSelecoes[x].nome,
      		pontos: 3 * dadosSelecoes[x].vitorias + dadosSelecoes[x].empates,
      		jogos: dadosSelecoes[x].vitorias + dadosSelecoes[x].empates + dadosSelecoes[x].derrotas,
      		vitorias: dadosSelecoes[x].vitorias,
      		empates: dadosSelecoes[x].empates,
      		derrotas: dadosSelecoes[x].derrotas,
      		golsPro: dadosSelecoes[x].gols,
      		golsContra: dadosSelecoes[x].golsContra,
      		saldo: dadosSelecoes[x].gols - dadosSelecoes[x].golsContra,
      		porcentagem: Math.round(100 * (3 * dadosSelecoes[x].vitorias + dadosSelecoes[x].empates) / (3 * (dadosSelecoes[x].vitorias + dadosSelecoes[x].empates + dadosSelecoes[x].derrotas)))
      	});
  	}
  	for (var i = 0; i < 8; i++)
  	{
		tabelaGrupos[i].selecoes.sort(function(a, b){
			if (b.pontos != a.pontos)
				return b.pontos - a.pontos;
			return b.saldo - a.saldo;
		});
  	}

  	console.log(tabelaGrupos);
    res.json(tabelaGrupos);
  }).catch(function(error) {
  	console.log(error)
    res.status(500).send(error);
  })
};

// torna public o método get
module.exports = {
  get: get
};
