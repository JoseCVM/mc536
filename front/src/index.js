import React, { Component } from 'react';
import { render } from 'react-dom';

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
	    <TelaPrincipal text={this.state.name}/>
    );
  }

  constructor() {
	super();
	// Comeca o state.name como vazio, mas diz que ele existe para atualizarmos depois.
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
  	// Chamadas de API devem ficar aqui.
  	// Isso roda depois que o componente inicializou. 
  	// Não é certo fazer coisas que demoram tipo fetch no construtor.
  	// Não pode modificar this.state diretamente.
  	// Usamos o setState para modificar o this.state com o resultado da chamada de API.
      fetch("http://localhost:8081/pessoa")
        .then(response => response.json())
        .then(response => this.setState({ name: response.nome }));
  }
}

// No inicio da vida, renderizamos esse cara
render(<App />, document.getElementById('root'));
