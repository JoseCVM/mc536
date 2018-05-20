var pessoa = require('./pessoa')
var lance = require('./lance')
var partida = require('./partida')

// Endpoint /pessoa que vai retornar os dados de uma pessoa
var defineRoutes = function (app) {
	app.get('/pessoa', pessoa.get);
	app.get('/lance', lance.get);
	app.get('/partida/:idJogador/fezGol', partida.getPartidasQueFezGol);
}

module.exports = {
	defineRoutes: defineRoutes
}
