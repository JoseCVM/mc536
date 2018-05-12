/*
    Entidades
*/
CREATE TABLE pessoa
(
    id_pessoa int,
    tipo_documento varchar(10),
    documento varchar(15),
    nome varchar(50),
    data_nascimento date,
    nome_pais_origem varchar(40),
    foto mediumblob,
    PRIMARY KEY (id_pessoa),
    CONSTRAINT documento_pessoa UNIQUE (tipo_documento, documento)
);

CREATE TABLE administrador_sistema
(
    id_pessoa int,
    login varchar(30),
    senha varchar(30),
    tipo_de_permissao varchar(255),
    PRIMARY KEY (id_pessoa),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
);

CREATE TABLE selecao
(
    codigo_pais varchar(5),
    nome_pais varchar(40),
    descricao varchar(255),
    grupo int,
    entidade varchar(50),
    bandeira mediumblob,
    PRIMARY KEY (codigo_pais)
);

CREATE TABLE staff_selecao
(
    id_pessoa int,
    codigo_pais_empregador varchar(5),
    cargo varchar(30),
    PRIMARY KEY (id_pessoa, codigo_pais_empregador),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (codigo_pais_empregador) REFERENCES Selecao(codigo_pais)
);

CREATE TABLE guia
(
    id_pessoa int,
    codigo_pais_guiado varchar(5),
    PRIMARY KEY (id_pessoa),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (codigo_pais_guiado) REFERENCES Selecao(codigo_pais)
);

CREATE TABLE tradutor
(
    id_pessoa int,
    codigo_pais_traduz varchar(5),
    PRIMARY KEY (id_pessoa),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (codigo_pais_traduz) REFERENCES Selecao(codigo_pais)
);

CREATE TABLE juiz
(
    id_pessoa int,
    posicao varchar(20),
    PRIMARY KEY (id_pessoa),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
);

CREATE TABLE tecnico
(
    id_pessoa int,
    codigo_pais_treina varchar(5),
    nome_conhecido varchar(30),
    descricao varchar(255),
    PRIMARY KEY (id_pessoa, codigo_pais_treina),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (codigo_pais_treina) REFERENCES Selecao(codigo_pais)
);

CREATE TABLE jogador
(
    id_pessoa int,
    codigo_pais_joga varchar(5),
    nome_conhecido varchar(30),
    descricao varchar(255),
    posicao varchar(20),
    clube_origem varchar(20),
    numero_camisa int,
    PRIMARY KEY (id_pessoa, codigo_pais_joga),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (codigo_pais_joga) REFERENCES Selecao(codigo_pais)
);

CREATE TABLE idioma
(
    codigo_idioma varchar(5),
    nome varchar(30),
    PRIMARY KEY (codigo_idioma)
);

CREATE TABLE equipe_de_gravacao
(
    id_gravacao int,
    nome_empresa varchar(50),
    PRIMARY KEY (id_gravacao)
);

CREATE TABLE equipe_de_midia
(
    id_midia int,
    nome_empresa varchar(50),
    PRIMARY KEY (id_midia)
);

CREATE TABLE cidade
(
    id_cidade int,
    nome varchar(100),
    estado varchar(100),
    PRIMARY KEY (id_cidade)
);

CREATE TABLE hotel
(
    id_hotel int,
    id_cidade int,
    nome varchar(50),
    capacidade int,
    endereco varchar(255),
    descricao varchar(255),
    PRIMARY KEY (id_hotel, id_cidade),
    FOREIGN KEY (id_cidade) REFERENCES cidade(id_cidade)
);

CREATE TABLE estadio
(
    id_estadio int,
    id_cidade int,
    nome varchar(50),
    capacidade int,
    endereco varchar(255),
    descricao varchar(255),
    foto blob,
    PRIMARY KEY (id_estadio, id_cidade),
    FOREIGN KEY (id_cidade) REFERENCES cidade(id_cidade)
);

CREATE TABLE partida
(
    id_partida int,
    data date,
    horario time,
    fase varchar(30),
    numero_grupo int,
    id_estadio int,
    id_gravacao int,
    PRIMARY KEY (id_partida),
    FOREIGN KEY (id_estadio) REFERENCES estadio(id_estadio),
    FOREIGN KEY (id_gravacao) REFERENCES equipe_de_gravacao(id_gravacao)
);

/*
    Relacoes
*/
CREATE TABLE emprega_midia
(
    id_midia int,
    id_pessoa int,
    PRIMARY KEY (id_pessoa),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
);
CREATE TABLE emprega_gravacao
(
    id_gravacao int,
    id_pessoa int,
    PRIMARY KEY (id_pessoa) ,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
);
CREATE TABLE conhece
(
    id_pessoa int,
    codigo_idioma varchar(5),
    PRIMARY KEY (id_pessoa,codigo_idioma),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (codigo_idioma) REFERENCES idioma(codigo_idioma)
);
CREATE TABLE reporta_sobre
(
    id_midia int,
    id_partida int,
    PRIMARY KEY (id_midia,id_partida),
    FOREIGN KEY (id_midia) REFERENCES equipe_de_midia(id_midia),
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida)
);
CREATE TABLE apita
(
    id_partida int,
    id_pessoa int,
    PRIMARY KEY (id_partida,id_pessoa),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida)
);
/*
    Relacoes encapsuladas
*/
CREATE TABLE lance
(
    id_partida int,
    id_pessoa int,
    time_stamp timestamp,
    tipo_de_lance varchar(255),
    descricao varchar(255),
    PRIMARY KEY (id_partida,id_pessoa,time_stamp),
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
);
CREATE TABLE participacao
(
    id_partida int,
    codigo_pais varchar(5),
    gols_feitos int,
    PRIMARY KEY (id_partida,codigo_pais),
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida),
    FOREIGN KEY (codigo_pais) REFERENCES selecao(codigo_pais)
);
CREATE TABLE hospedagem
(
    id_hotel int,
    codigo_pais varchar(5),
    data_check_in date,
    data_check_out date,
    PRIMARY KEY (id_hotel,codigo_pais),
    FOREIGN KEY (id_hotel) REFERENCES hotel(id_hotel),
    FOREIGN KEY (codigo_pais) REFERENCES selecao(codigo_pais)
);
CREATE TABLE deslocamento
(
    codigo_pais varchar(5),
    id_partida int,
    itinerario varchar(255),
    descricao_da_escolta varchar(255),
    PRIMARY KEY (codigo_pais,id_partida),
    FOREIGN KEY (codigo_pais) REFERENCES selecao(codigo_pais),
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida)
);
