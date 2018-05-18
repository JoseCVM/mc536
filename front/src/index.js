import React, { Component } from 'react';
import { render } from 'react-dom';

import './index.css';
// Step 1: import the design from above
// Pagedraw generates the JSX and CSS files you need.
import TelaPrincipal from './pagedraw/tela_principal'
// There's no special libraries or javascript layout systems, just code written for you.


class App extends Component {
  render() {
    return (
	    <TelaPrincipal text={this.state.name}/>
    );
  }

  constructor() {
	super();
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
      fetch("http://localhost:8081/pessoa")
        .then(response => response.json())
        .then(response => this.setState({ name: response.nome }));
  }
}

render(<App />, document.getElementById('root'));
