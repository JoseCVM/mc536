#include <bits/stdc++.h>
using namespace std;
typedef unsigned long long int ull;
typedef pair<int,int> pii;
typedef long long int ll;

string rand_date(){
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
	while(numerosAleatorios.size() < maxNums){
        int k = rand() % maxDigitos;
        numerosAleatorios.insert(k);
    }
    for(auto& it : numerosAleatorios){
        string c = to_string(it);
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
int main(){
	
	vector<string> nomes = fileToStringVector("nomes.txt");
	vector<string> pos = fileToStringVector("selecoes.txt");;
	vector<string> documentos = randomDigitStringVector(10e8,576);
	string queryStart = "INSERT INTO pessoa (id_pessoa, tipo_documento,documento,nome,data_nascimento,nome_pais_origem) VALUES (";
	for(int i = 0;i<576;i++){
		string s1 = nomes[i];
		string s2 = pos[i/18];
		string s3 = documentos[i];
		cout << queryStart << i+1 << ",'RHU','" << documentos[i] <<"','" << s1 << "','" << rand_date() << "','"<< s2 <<"');"<< '\n';
	}
	
	return 0;
}

