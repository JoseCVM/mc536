var pessoa = require('./pessoa')
var lance = require('./lance')
var partida = require('./partida')
var grupos = require('./grupos')
var jogador = require('./jogador')

// Define os endpoints, chamando as funções declaradas nos controllers
var defineRoutes = function (app) {
	app.get('/pessoa', pessoa.get);
	app.get('/lances/partida/:idPartida', lance.getLancesPorIdPartida);
	app.get('/grupos', grupos.get);
	app.get('/partidas', partida.get);
	app.get('/partidas/selecao/:codigoSelecao', partida.getPartidasPorSelecao);
	app.get('/partidas/:idPartida', partida.getPartidaPorId);
	app.get('/jogadores/selecao/:codigoSelecao', jogador.getJogadoresPorSelecao);
	app.get('/jogadores/:tipoLance(FALTA|DEFESA|GOL)',
		jogador.getJogadorComMaisTipoLance);
}

module.exports = {
	defineRoutes: defineRoutes
}
