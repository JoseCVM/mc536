// Generated by https://pagedraw.io/pages/10133
import React from 'react';
import './partida.css';


function render() {
    return <div className="partida-partida-6">
        <div className="partida-0">
            <div className="partida-rectangle_7">
                <div className="partida-0-0-0">
                    <div className="partida-datapartida-6">
                        { this.props.dataPartida }
                    </div>
                    <div className="partida-horapartida-3">
                        { this.props.horaPartida }
                    </div>
                </div>
                <div className="partida-0-0-1">
                    <div className="partida-text_5">Grupo</div>
                    <div className="partida-numerogrupo-2">
                        { this.props.numeroGrupo }
                    </div>
                </div>
                <div className="partida-0-0-2">
                    <div className="partida-estadio-8">
                        { this.props.estadio }
                    </div>
                </div>
                <div className="partida-0-0-3">
                    <div className="partida-cidadapartida-0">
                        { this.props.cidadaPartida }
                    </div>
                </div>
            </div>
            <div className="partida-0-1">
                <div className="partida-0-1-0">
                    <div onClick={() => { window.location = '/partida/' + this.props.idPartida; }} className="partida-rectangle_6">
                        <div className="partida-0-1-0-0-0">
                            <div className="partida-0-1-0-0-0-0" /> 
                            <div className="partida-0-1-0-0-0-1">
                                <div className="partida-0-1-0-0-0-1-0">
                                    <div className="partida-nomeselecao1">
                                        { this.props.nomeSelecao1 }
                                    </div>
                                </div>
                            </div>
                            <img src={this.props.bandeiraSelecao1} className="partida-bandeiraselecao1" /> 
                            <div className="partida-0-1-0-0-0-3" /> 
                            <div className="partida-0-1-0-0-0-4">
                                <div className="partida-0-1-0-0-0-4-0">
                                    <div className="partida-golsselecao1">
                                        { this.props.golsSelecao1 }
                                    </div>
                                </div>
                            </div>
                            <div className="partida-0-1-0-0-0-5" /> 
                            <div className="partida-0-1-0-0-0-6">
                                <div className="partida-0-1-0-0-0-6-0">
                                    <div className="partida-text_2">x</div>
                                </div>
                            </div>
                            <div className="partida-0-1-0-0-0-7" /> 
                            <div className="partida-0-1-0-0-0-8">
                                <div className="partida-0-1-0-0-0-8-0">
                                    <div className="partida-golsselecao2">
                                        { this.props.golsSelecao2 }
                                    </div>
                                </div>
                            </div>
                            <img src={this.props.bandeiraSelecao2} className="partida-bandeiraselecao2" /> 
                            <div className="partida-0-1-0-0-0-10" /> 
                            <div className="partida-0-1-0-0-0-11">
                                <div className="partida-0-1-0-0-0-11-0">
                                    <div className="partida-nomeselecao2">
                                        { this.props.nomeSelecao2 }
                                    </div>
                                </div>
                            </div>
                            <div className="partida-0-1-0-0-0-12" /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="partida-1" /> 
        <div className="partida-2">
            <div className="partida-2-0" /> 
            <div className="partida-text_8">
                { this.props.idPartida }
            </div>
            <div className="partida-2-2" /> 
        </div>
        <div className="partida-3" /> 
        <div className="partida-4">
            <div className="partida-line-7" /> 
        </div>
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}
