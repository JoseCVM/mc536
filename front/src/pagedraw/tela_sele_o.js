// Generated by https://pagedraw.io/pages/10133
import React from 'react';
import Menu from './menu';
import Partida from './partida';
import Jogador from './jogador';
import './tela_sele_o.css';


function render() {
    return <div className="tela_sele_o-tela_sele_o-2">
        <div className="tela_sele_o-0">
            <div className="tela_sele_o-menu_instance_4">
                <Menu img_src={""} /> 
            </div>
        </div>
        <div className="tela_sele_o-1">
            <div className="tela_sele_o-text_5">Brasil</div>
        </div>
        <div className="tela_sele_o-2">
            <div className="tela_sele_o-rectangle_4">
                <div className="tela_sele_o-2-0-0">
                    <div className="tela_sele_o-text_4">Partidas</div>
                </div>
            </div>
            <div className="tela_sele_o-rectangle_4-1">
                <div className="tela_sele_o-2-1-0">
                    <div className="tela_sele_o-text_4-8">Jogadores</div>
                </div>
            </div>
        </div>
        <div className="tela_sele_o-3">
            <div className="tela_sele_o-partida_instance-0">
                <Partida /> 
            </div>
            <div className="tela_sele_o-3-1">
                <div className="tela_sele_o-3-1-0">
                    <div className="tela_sele_o-3-1-0-0">
                        { this.props.list.map((elem, i) => {
                            return <div key={i} className="tela_sele_o-rectangle_1">
                                <div className="tela_sele_o-3-1-0-0-0-0-0">
                                    <div className="tela_sele_o-jogador_instance-8">
                                        <Jogador /> 
                                    </div>
                                </div>
                            </div>;
                        }) }
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}