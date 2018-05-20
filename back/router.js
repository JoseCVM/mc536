var pessoa = require('./pessoa')
// var selecao = require('./selecao')

// Endpoint /pessoa que vai retornar os dados de uma pessoa
var defineRoutes = function (app) {
	app.get('/pessoa', pessoa.get);
}

module.exports = {
	defineRoutes: defineRoutes
}
