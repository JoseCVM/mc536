#include <bits/stdc++.h>
const int Debug = 0;
#define ccout if(Debug)cout
using namespace std;
typedef unsigned long long int ull;
typedef pair<int,int> pii;
typedef long long int ll;


vector<string> randomDigitStringVector(int maxDigitos, int maxNums){
	vector<string> digitos;
	vector<int> numerosAleatorios;
	for(int i = 100000;i<999999;i++){
		numerosAleatorios.push_back(i);
	}
	shuffle(numerosAleatorios.begin(),numerosAleatorios.end(),default_random_engine(32045));
    string c;
    for(auto& it : numerosAleatorios){
        c = to_string(it);
        c = string(maxDigitos-c.size(),'0').append(c);
       	digitos.push_back(c);
    }
    return digitos;
}
int main(){
	srand(32045);
	ios_base::sync_with_stdio(false);
	string nomeSaida = "documentos.txt";
	vector<string> documentos = randomDigitStringVector(9,500000);
	ofstream arqSaida;
	arqSaida.open(nomeSaida.c_str());
	for(auto& s : documentos) arqSaida << s << '\n';
	arqSaida.close();
	return 0;
}

