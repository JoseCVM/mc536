import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './pagedraw/menu';
import Grupo from './pagedraw/grupo';
import './pagedraw/tela_principal.css';

class App extends Component {
  render() {
    return <div className="tela_principal-tela_principal-3">
        <div className="tela_principal-0">
            <div className="tela_principal-menu_instance-5">
                <Menu /> 
            </div>
        </div>
        <div className="tela_principal-1">
            <div className="tela_principal-grupo_instance-6">
                <Grupo numero={""} /> 
            </div>
        </div>
        <div className="tela_principal-2" /> 
    </div>;
  }
}

export default App;
