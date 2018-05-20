Antes de executar: npm install

Para executar faça: node server.js
OU npm start na pasta /back


Fluxo para adicionar um novo endpoint (exemplificando com Pessoa):

- Dentro da pasta 'query', criar o arquivo pessoaDAO.js, que conterá o método
que executa a query do BD;

- Criar o arquivo pessoa.js, o nosso controller, que executa o método declarado
em pessoaDAO, e retorna o json de resultado ou uma mensagem de erro;

- No arquivo router.js:
incluir o controller pessoa: var pessoa = require('./pessoa');
dentro do método defineRoutes, incluir a rota para a execução do seu novo método:
app.get('/pessoa', pessoa.get);

Exemplo de endpoint sem parâmetro: /pessoa
Exemplo de endpoint com parâmetro: /partida/:idJogador/fezGol (PathParam: idJogador)

