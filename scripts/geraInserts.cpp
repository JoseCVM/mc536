#include <bits/stdc++.h>
using namespace std;
typedef unsigned long long int ull;
typedef pair<int,int> pii;
typedef long long int ll;

string randDate(){
	int d, m, y;
	d = rand()%27 + 1;
	m = rand()%12 + 1;
	y = rand()%15+1975;
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
		while(getline(inputNomes,linhaInput)){
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
int main(){
	srand(32045);
	string nomeSaida = "populate_pessoa_jogadores.sql";
	ofstream arqSaida;
	vector<string> nomes = fileToStringVector("nomes.txt");
	vector<string> paises = fileToStringVector("selecoes.txt");
	vector<string> documentos = randomDigitStringVector(6,576);
	string queryStart = "INSERT INTO pessoa (id_pessoa, tipo_documento,documento,nome,data_nascimento,nome_pais_origem) VALUES ('";
	string tipoDocumento = "RHU",  queryEnd = "');\n";
	string nomeAtual, paisAtual, documentoAtual, idAtual, dataAtual;
	arqSaida.open(nomeSaida.c_str());
	for(int i = 0;i<576;i++){
		nomeAtual = nomes[i], paisAtual = paises[i/18], documentoAtual = documentos[i], idAtual = to_string(i+1), dataAtual = randDate();
		arqSaida << makeQuery(queryStart,queryEnd,{idAtual,tipoDocumento,documentoAtual,nomeAtual,dataAtual,paisAtual});
	}
	arqSaida.close();
	return 0;
}

