import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaPrincipal from './pagedraw/tela_principal'
// There's no special libraries or javascript layout systems, just code written for you.


class App extends Component {

  render() {
  	// Renderiza o componente passado os parametros do estado
  	// (no caso esta sendo passado o state.name para o parametro text do componente)
  	// A partir dai so roda coisas do pagedraw. Tudo que temos que fazer eh modificar 
  	// no pagedraw e adicionar mais parametros aqui depois para a tela principal.
    return (
	    <TelaPrincipal text={this.state.name} listaGrupos={this.state.listaGrupos} logo={this.state.logo}/>
    );
  }

  constructor() {
	super();
	// Comeca o state.name como vazio, mas diz que ele existe para atualizarmos depois.
    this.state = {
      logo: "http://www.stickpng.com/assets/images/58430032a6515b1e0ad75b3f.png",
      name: "",
      listaGrupos: [ {
      	numeroGrupo: "1",
      	selecoes: [{
      		nome: "Brasil",
      		pontos: "4",
      		jogos: "3",
      		vitorias:"1",
      		empates: "1",
      		derrotas: "1",
      		golsPro: "5",
      		golsContra: "6",
      		saldo: "-1",
      		porcentagem: "33"
      	},
      	{ nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
      	{ nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
      	{ nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" }
      	]
      },
      {	numeroGrupo: "2", selecoes: [
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" }
		] 
      },
      {	numeroGrupo: "3", selecoes: [
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" }
		] 
      },
      {	numeroGrupo: "4", selecoes: [
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" }
		] 
      },
      {	numeroGrupo: "5", selecoes: [
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" }
		] 
      },
      {	numeroGrupo: "6", selecoes: [
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" }
		] 
      },
      {	numeroGrupo: "7", selecoes: [
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" }
		] 
      },
      {	numeroGrupo: "8", selecoes: [
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" },
        { nome: "Alemanha", pontos: "3", jogos: "3", vitorias:"0", empates: "3", 
        derrotas: "0", golsPro: "2", golsContra: "2", saldo: "0", porcentagem: "0" }
		] 
      },
      ]
    };
    console.log(this.state);
  }

  componentDidMount() {
  	// Chamadas de API devem ficar aqui.
  	// Isso roda depois que o componente inicializou. 
  	// Não é certo fazer coisas que demoram tipo fetch no construtor.
  	// Não pode modificar this.state diretamente.
  	// Usamos o setState para modificar o this.state com o resultado da chamada de API.
      fetch("http://localhost:8081/pessoa")
        .then(response => response.json())
        .then(response => this.setState({ name: response[0].nome }));

      fetch("http://localhost:8081/grupos")
        .then(response => response.json())
        .then(response => this.setState({ listaGrupos: response }));
  }
}

// No inicio da vida, renderizamos esse cara
//render(<App />, document.getElementById('root'));

render((
<Router>
  <Switch>
      <Route path="/grupos" component={App} />
      <Route path="/partidas" component={TelaPrincipal} />
  </Switch>
</Router>    ), document.getElementById('root'));