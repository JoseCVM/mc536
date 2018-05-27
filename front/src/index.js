import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaPrincipal from './pagedraw/tela_principal'
import TelaPartidas from './pagedraw/tela_partidas'
import TelaPartida from './pagedraw/tela_partida'
import TelaSelecao from './pagedraw/tela_selecao'
import TelaEstatisticas from './pagedraw/tela_estatisticas'
// There's no special libraries or javascript layout systems, just code written for you.

const apiUrl = 'http://5f551ce3.ngrok.io';


class App extends Component {

  render() {
  	// Renderiza o componente passado os parametros do estado
  	// (no caso esta sendo passado o state.name para o parametro text do componente)
  	// A partir dai so roda coisas do pagedraw. Tudo que temos que fazer eh modificar 
  	// no pagedraw e adicionar mais parametros aqui depois para a tela principal.
    return (
	    <TelaPrincipal listaGrupos={this.state.listaGrupos} logo={this.state.logo}/>
    );
  }

  constructor() {
	super();
	// Comeca o state.name como vazio, mas diz que ele existe para atualizarmos depois.
    this.state = {
      logo: "/images/logo.png",
      listaGrupos: [ ]
    };
    console.log(this.state);
  }

  componentDidMount() {
  	// Chamadas de API devem ficar aqui.
  	// Isso roda depois que o componente inicializou. 
  	// Não é certo fazer coisas que demoram tipo fetch no construtor.
  	// Não pode modificar this.state diretamente.
  	// Usamos o setState para modificar o this.state com o resultado da chamada de API.
      fetch(apiUrl + "/grupos")
        .then(response => response.json())
        .then(response => this.setState({ listaGrupos: response }));
  }
}

class AppPartidas extends Component {

  render() {
    return (
      <TelaPartidas logo={this.state.logo} listaPartidas={this.state.listaPartidas}/>
    );
  }

  constructor() {
  super();
    this.state = {
      logo: "/images/logo.png",
      listaPartidas: []
    };
  }

  componentDidMount() {
      fetch(apiUrl + "/partidas")
        .then(response => response.json())
        .then(response => this.setState({ listaPartidas: response }));
  }
}


class AppSelecao extends Component {

  render() {
    return (
      //<TelaPartidas logo={this.state.logo} listaPartidas={this.state.listaPartidas}/>
      <TelaSelecao logo={this.state.logo} nomeSelecao={this.state.nomeSelecao} listaJogadores = {this.state.listaJogadores} bandeiraSelecao = {this.state.bandeiraSelecao} listaPartidas={this.state.listaPartidas}/>
    );
  }

  constructor(props) {
  super(props);
    this.state = {
      logo: "/images/logo.png",
      nomeSelecao: this.props.match.params.cod,
      codigoPais: this.props.match.params.cod,
      bandeiraSelecao: "",
      listaPartidas: [],
      listaJogadores: []
    };
  }

  componentDidMount() {
    

      fetch(apiUrl + "/partidas/selecao/" + this.state.codigoPais)
        .then(response => response.json())
        .then(response => this.setState({ listaPartidas: response }));

      fetch(apiUrl + "/jogadores/selecao/" + this.state.codigoPais)
        .then(response => response.json())
        .then(response => this.setState({ listaJogadores: response }));


    this.setState({ bandeiraSelecao: "/images/bandeiras/" + this.state.codigoPais + ".gif" })
  }
}

class AppEstatiscas extends Component {

  render() {
    return (
      <TelaEstatisticas logo={this.state.logo} />
    );
  }

  constructor() {
  super();
    this.state = {
      logo: "/images/logo.png",
    };
  }

  componentDidMount() {
  }
}

class AppLances extends Component {

  render() {
    return (
      <TelaPartida logo={this.state.logo} listaLances={this.state.listaLances} partida={this.state.partida}/>
    );
  }

  constructor(props) {
  super(props);
    this.state = {
      logo: "/images/logo.png",
      idPartida: this.props.match.params.id,
      listaLances: [],
      partida: {
        nomeSelecao1: "",
        nomeSelecao2: "",
        golsSelecao1: "",
        golsSelecao2: "",
        bandeiraSelecao1: "",
        bandeiraSelecao2: ""
      }
    };
  }

  componentDidMount() {
      fetch(apiUrl + "/lances/partida/" + this.state.idPartida)
        .then(response => response.json())
        .then(response => this.setState({ listaLances: response }));

      fetch(apiUrl + "/partidas/" + this.state.idPartida)
        .then(response => response.json())
        .then(response => this.setState({ partida: response[0] }));
  }
}

// No inicio da vida, renderizamos esse cara
//render(<App />, document.getElementById('root'));

render((
<Router>
  <Switch>
      <Route exact path="/" component={App} />
      <Route path="/grupos" component={App} />
      <Route path="/partidas" component={AppPartidas} />
      <Route path="/estatisticas" component={AppEstatiscas} />
      <Route path="/selecao/:cod" component={AppSelecao} />
      <Route path="/partida/:id" component={AppLances} />
  </Switch>
</Router>    ), document.getElementById('root'));