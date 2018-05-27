#include <bits/stdc++.h>
using namespace std;
typedef unsigned long long int ull;
typedef pair<int,int> pii;
typedef long long int ll;
int id = 577;

vector<string> nomesDeEmpresa(int max){
	 auto randchar = []() -> char{
        const char charset[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const size_t max_index = (sizeof(charset) - 1);
        return charset[ rand() % max_index ];
    };
    unordered_set<string> empresas;
    while(empresas.size() < max){
    	string str(7,0);
   		generate_n( str.begin(), 7, randchar );
   		empresas.insert(str);
	}
  	vector<string> nomesEmpresas;
	for(auto& s : empresas){
  		nomesEmpresas.push_back(s);
	}
    return nomesEmpresas;
}
vector<string> empresas = nomesDeEmpresa(300000);
string randDate(){
	int d, m, y;
	d = rand()%27 + 1;
	m = rand()%12 + 1;
	y = rand()%20+1970;
	string day = d < 10 ? "0" + to_string(d) : to_string(d);
	string month = m < 10 ? "0" + to_string(m) : to_string(m);

	return  to_string(y) + month + day ;
}
vector<string> randomDigitStringVector(int maxDigitos, int maxNums){
	vector<string> digitos;
	unordered_set<int> numerosAleatorios;
	const ll maxMod = pow(10,maxDigitos);
	while(numerosAleatorios.size() < maxNums){
        int k = rand() % maxMod;
        numerosAleatorios.insert(k);
    }
    string c;
    for(auto& it : numerosAleatorios){
        c = to_string(it);
        c = string(maxDigitos-c.size(),'0').append(c);
       	digitos.push_back(c);
    }
    return digitos;
}
vector<string> fileToStringVector(string filename){
	vector<string> input;
	string linhaInput;
	ifstream inputNomes(filename.c_str());
	while(inputNomes >> linhaInput){
		input.push_back(linhaInput);
	}
	return input;
}
string makeQuery(string queryStart,string queryEnd,initializer_list<string> campos){
	string delimitador = "','";
	string query = queryStart;
	for(int i = 0;i<campos.size()-1;i++){
		query = query + campos.begin()[i] + delimitador;
	}
	query = query + campos.begin()[campos.size()-1] + queryEnd;
	return query;
}

vector<string> documentos = fileToStringVector("documentos.txt");
vector<string> nomes = fileToStringVector("bancoDeNomes.txt");

void makeJuiz(int maxJuizes){
	string nomeSaida = "populate_juiz.sql";
	ofstream arqSaida;
	vector<string> nomes = fileToStringVector("bancoDeNomes.txt");
	vector<string> paises = fileToStringVector("paises.txt");
	string prefixo = "11";
	string queryStart = "INSERT INTO pessoa (id_pessoa, tipo_documento,documento,nome,data_nascimento,nome_pais_origem) VALUES ('";
	string tipoDocumento = "PASS",  queryEnd = "');\n";
	string nomeAtual, paisAtual, documentoAtual, idAtual, dataAtual, posicao;
	arqSaida.open(nomeSaida.c_str());
	for(int i = 0;i<maxJuizes;i++){
		nomeAtual = nomes[rand()%nomes.size()], paisAtual = paises[rand()%paises.size()], documentoAtual = documentos[0], idAtual = to_string(id+i), dataAtual = randDate();
		documentos.erase(documentos.begin());																							
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,tipoDocumento,documentoAtual,nomeAtual,dataAtual,paisAtual});
	}
	queryStart = "INSERT INTO juiz (id_pessoa,posicao) VALUES ('";
	vector<string> posicoes = {"Juiz","Bandeirinha","Bandeirinha","Quarto Juiz","Juiz de video"};
	for(int i = 0;i<maxJuizes;i++){
		idAtual = to_string(id+i), posicao = posicoes[i%posicoes.size()];
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,posicao});
	}
	arqSaida.close();
	id += maxJuizes;
}
void makeTecnico(int maxTecnicos){
	string nomeSaida = "populate_tecnico.sql";
	ofstream arqSaida;
	vector<string> paises = fileToStringVector("paises.txt");
	vector<string> codigos = fileToStringVector("abreviacoesPaises.txt");
	string prefixo = "11";
	string queryStart = "INSERT INTO pessoa (id_pessoa, tipo_documento,documento,nome,data_nascimento,nome_pais_origem) VALUES ('";
	string tipoDocumento = "PASS",  queryEnd = "');\n";
	string nomeAtual, paisAtual, documentoAtual, idAtual, dataAtual, posicao,nomeConhecido, codPais;
	arqSaida.open(nomeSaida.c_str());
	for(int i = 0;i<maxTecnicos;i++){
		nomeAtual = nomes[rand()%nomes.size()], paisAtual = paises[rand()%paises.size()], documentoAtual = documentos[0], idAtual = to_string(id+i), dataAtual = randDate();
		documentos.erase(documentos.begin());
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,tipoDocumento,documentoAtual,nomeAtual,dataAtual,paisAtual});
	}
	queryStart = "INSERT INTO tecnico (id_pessoa,codigo_pais_treina,nome_conhecido) VALUES ('";
	for(int i = 0;i<maxTecnicos;i++){
		idAtual = to_string(id+i), codPais = codigos[i], nomeConhecido = nomes[rand()%nomes.size()];
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,codPais,nomeConhecido});
	}
	arqSaida.close();
	id += maxTecnicos;
}

void makeStaff(int maxStaff){
	string nomeSaida = "populate_staff.sql";
	ofstream arqSaida;
	vector<string> paises = fileToStringVector("paises.txt");
	vector<string> codigos = fileToStringVector("abreviacoesPaises.txt");
	vector<string> cargos = fileToStringVector("cargos.txt");
	
	string queryStart = "INSERT INTO pessoa (id_pessoa, tipo_documento,documento,nome,data_nascimento,nome_pais_origem) VALUES ('";
	string tipoDocumento = "PASS",  queryEnd = "');\n";
	string nomeAtual, paisAtual, documentoAtual, idAtual, dataAtual, posicao,nomeConhecido, codPais, cargo;
	arqSaida.open(nomeSaida.c_str());
	for(int i = 0;i<maxStaff;i++){
		nomeAtual = nomes[rand()%nomes.size()], paisAtual = paises[rand()%paises.size()], documentoAtual = documentos[0], idAtual = to_string(id + i), dataAtual = randDate();
		documentos.erase(documentos.begin());
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,tipoDocumento,documentoAtual,nomeAtual,dataAtual,paisAtual});
	}
	queryStart = "INSERT INTO staff_selecao (id_pessoa,codigo_pais_empregador,cargo) VALUES ('";
	for(int i = 0;i<maxStaff;i++){
		idAtual = to_string(id + i), codPais = codigos[i%32], nomeConhecido = nomes[rand()%nomes.size()], cargo = cargos[rand()%cargos.size()];
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,codPais,cargo});
	}
	arqSaida.close();
	id += maxStaff;
}
void makeTradutor(int maxTradutores){
	string nomeSaida = "populate_tradutor.sql";
	ofstream arqSaida;
	vector<string> paises = fileToStringVector("paises.txt");
	vector<string> codigos = fileToStringVector("abreviacoesPaises.txt");
	string queryStart = "INSERT INTO pessoa (id_pessoa, tipo_documento,documento,nome,data_nascimento,nome_pais_origem) VALUES ('";
	string tipoDocumento = "PASS",  queryEnd = "');\n";
	string nomeAtual, paisAtual, documentoAtual, idAtual, dataAtual, posicao,nomeConhecido, codPais, cargo;
	arqSaida.open(nomeSaida.c_str());
	for(int i = 0;i<maxTradutores;i++){
		nomeAtual = nomes[rand()%nomes.size()], paisAtual = paises[rand()%paises.size()], documentoAtual = documentos[0], idAtual = to_string(id + i), dataAtual = randDate();
		documentos.erase(documentos.begin());
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,tipoDocumento,documentoAtual,nomeAtual,dataAtual,paisAtual});
	}
	queryStart = "INSERT INTO tradutor (id_pessoa,codigo_pais_traduz) VALUES ('";
	for(int i = 0;i<maxTradutores;i++){
		idAtual = to_string(id + i), codPais = codigos[i%32];
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,codPais});
	}
	vector<string> idiomas = fileToStringVector("idiomas.txt");
	vector<string> codIdiomas = fileToStringVector("codIdiomas.txt");
	string idioma, idIdioma;
	queryStart = "INSERT INTO idioma (codigo_idioma,nome) VALUES ('";
	for(int i = 0;i<idiomas.size();i++){
		idioma = idiomas[i], idIdioma = codIdiomas[i];
		arqSaida << makeQuery(queryStart,queryEnd,{idIdioma,idioma});
	}
	queryStart = "INSERT INTO conhece (id_pessoa,codigo_idioma) VALUES ('";

	for(int i = 0;i<maxTradutores;i++){
		idAtual = to_string(id + i);
		int conheceN = rand() % 5;
		set<int> usados;
		while(usados.size() < conheceN) usados.insert(rand()%idiomas.size());
		set<int>::iterator it = usados.begin();
		for(int j = 0;j<conheceN;j++){
			string idiomaAtual = codIdiomas[*it];
			it++;
			arqSaida << makeQuery(queryStart,queryEnd,{idAtual,idiomaAtual});
		}
	}
	arqSaida.close();
	id += maxTradutores;
}
void makeGuia(int maxGuias){
	string nomeSaida = "populate_staff.sql";
	ofstream arqSaida;
	vector<string> paises = fileToStringVector("paises.txt");
	vector<string> codigos = fileToStringVector("abreviacoesPaises.txt");
	string queryStart = "INSERT INTO pessoa (id_pessoa, tipo_documento,documento,nome,data_nascimento,nome_pais_origem) VALUES ('";
	string tipoDocumento = "PASS",  queryEnd = "');\n";
	string nomeAtual, paisAtual, documentoAtual, idAtual, dataAtual, posicao,nomeConhecido, codPais, cargo;
	arqSaida.open(nomeSaida.c_str());
	for(int i = 0;i<maxGuias;i++){
		nomeAtual = nomes[rand()%nomes.size()], paisAtual = paises[rand()%paises.size()], documentoAtual = documentos[0], idAtual = to_string(id + i), dataAtual = randDate();
		documentos.erase(documentos.begin());
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,tipoDocumento,documentoAtual,nomeAtual,dataAtual,paisAtual});
	}
	queryStart = "INSERT INTO guia (id_pessoa,codigo_pais_guiado) VALUES ('";
	for(int i = 0;i<maxGuias;i++){
		idAtual = to_string(id + i), codPais = codigos[i%32];
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,codPais});
	}

	arqSaida.close();
	id += maxGuias;
}

void makeMidia(int nMidias){
	int pessoasInseridas = 0;
	string nomeSaida = "populate_midia.sql";
	ofstream arqSaida;
	int delta = rand();
	string empresa, idEmpresa;
	vector<string> paises = fileToStringVector("paises.txt");
	arqSaida.open(nomeSaida.c_str());
	string queryStart = "INSERT INTO equipe_de_midia (id_midia,nome_empresa) VALUES ('", queryEnd = "');\n";
	for(int i = 0;i<nMidias;i++){
		empresa = empresas[i+delta], idEmpresa = to_string(i+1);
		arqSaida << makeQuery(queryStart,queryEnd,{idEmpresa,empresa});
		int tamStaff = rand()%31 + 1;
		for(int j = 0;j<tamStaff;j++){
			string queryStart2 = "INSERT INTO pessoa (id_pessoa, tipo_documento,documento,nome,data_nascimento,nome_pais_origem) VALUES ('";
			string tipoDocumento = "PASS",  queryEnd = "');\n";
			string nomeAtual, paisAtual, documentoAtual, idAtual, dataAtual, posicao,nomeConhecido, codPais, cargo;
			nomeAtual = nomes[rand()%nomes.size()], paisAtual = paises[rand()%paises.size()], documentoAtual = documentos[0], idAtual = to_string(id + pessoasInseridas), dataAtual = randDate();
			documentos.erase(documentos.begin());
			pessoasInseridas++;
			arqSaida << makeQuery(queryStart2,queryEnd,{idAtual,tipoDocumento,documentoAtual,nomeAtual,dataAtual,paisAtual});
			string queryStart3 = "INSERT INTO emprega_midia (id_midia, id_pessoa) VALUES ('";
			arqSaida << makeQuery(queryStart3,queryEnd,{idEmpresa,idAtual});
		}
	}
	id += pessoasInseridas;
	arqSaida.close();
}

void makeGrava(int nGrava){
	int pessoasInseridas = 0;
	string nomeSaida = "populate_grava.sql";
	ofstream arqSaida;
	int delta = rand();
	string empresa, idEmpresa;
	vector<string> paises = fileToStringVector("paises.txt");
	arqSaida.open(nomeSaida.c_str());
	string queryStart = "INSERT INTO equipe_de_gravacao (id_gravacao,nome_empresa) VALUES ('", queryEnd = "');\n";
	for(int i = 0;i<nGrava;i++){
		empresa = empresas[i+delta], idEmpresa = to_string(i+1);
		arqSaida << makeQuery(queryStart,queryEnd,{idEmpresa,empresa});
		int tamStaff = rand()%31 + 1;
		for(int j = 0;j<tamStaff;j++){
			string queryStart2 = "INSERT INTO pessoa (id_pessoa, tipo_documento,documento,nome,data_nascimento,nome_pais_origem) VALUES ('";
			string tipoDocumento = "PASS",  queryEnd = "');\n";
			string nomeAtual, paisAtual, documentoAtual, idAtual, dataAtual, posicao,nomeConhecido, codPais, cargo;
			nomeAtual = nomes[rand()%nomes.size()], paisAtual = paises[rand()%paises.size()], documentoAtual = documentos[0], idAtual = to_string(id + pessoasInseridas), dataAtual = randDate();
			documentos.erase(documentos.begin());
			pessoasInseridas++;
			arqSaida << makeQuery(queryStart2,queryEnd,{idAtual,tipoDocumento,documentoAtual,nomeAtual,dataAtual,paisAtual});
			string queryStart3 = "INSERT INTO emprega_gravacao (id_gravacao, id_pessoa) VALUES ('";
			arqSaida << makeQuery(queryStart3,queryEnd,{idEmpresa,idAtual});
		}
	}
	id += pessoasInseridas;
	arqSaida.close();
}
int main(){	
	srand(32045);
	makeJuiz(115);
	makeTecnico(32);	
	makeStaff(960);
	makeTradutor(96);
	makeGuia(96);
	makeMidia(100);
	makeGrava(100);	
	return 0;
}

