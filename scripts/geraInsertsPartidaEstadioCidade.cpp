#include <bits/stdc++.h>
using namespace std;

map<string, int> cidade;
map<string, pair<int,int> > estadio;

int pick(int a, int b)
{
	return (a + (rand() % (b - a + 1)));
}

char *nome_hoteis[10] = {
"Snowy Excalibur Resort",
"Ruby Dome Hotel",
"Ancient Cliff Resort",
"Olive Pinnacle Hotel & Spa",
"Sunrise Park Resort",
"Western Spire Resort & Spa",
"Fantasy Resort",
"Stellar Resort",
"Harborview Hotel",
"Nimbus Hotel"
};

int main(void)
{
	srand(1);
	char data[1123], est[1123], cid[1123], cod_pais1[1123], hora[1123], cod_pais2[1123];
	int grupo;
	FILE *fcidades = fopen("populate_cidades.sql", "w");
	FILE *festadios = fopen("populate_estadios.sql", "w");
	FILE *fpartidas = fopen("populate_partidas.sql", "w");
	FILE *fparticipacao = fopen("populate_participacoes.sql", "w");
	FILE *fhotel = fopen("populate_hotel.sql", "w");
	FILE *fhospedagem = fopen("populate_hospedagem.sql", "w");

	FILE *in = fopen("partidas.txt", "r");
	int id_cidade = 1, id_estadio = 1, id_partida = 1, id_hotel = 1;

	for (int i = 0; i < 48; i++)
	{
		fscanf(in, " %[^\n] %d %[^\n] %[^\n] %[^\n] %*[^\n] %[^\n] %[^\n] %*[^\n]", data, &grupo, est, cid, cod_pais1, hora, cod_pais2);
		data[strlen(data) - 1] = 0;
		est[strlen(est) - 1] = 0;
		cid[strlen(cid) - 1] = 0;
		cod_pais1[strlen(cod_pais1) - 1] = 0;
		hora[strlen(hora) - 1] = 0;
		cod_pais2[strlen(cod_pais2) - 1] = 0;

		if (cidade[cid] == 0)
		{
			cidade[cid] = id_cidade++;
			fprintf(fcidades, "INSERT INTO cidade (id_cidade, nome, estado) VALUES (%d,'%s','%s');\n", cidade[cid], cid, cid);
			for (int j = 0; j < 10; j++)
				fprintf(fhotel, "INSERT INTO hotel (id_hotel, id_cidade, nome, capacidade, endereco, descricao) VALUES (%d, %d,'%s %s',%d,'%s','%s');\n", id_hotel++, cidade[cid], nome_hoteis[j], cid, pick(500, 1000), "Avenida Michel Temer, 666", "Um hotel excelente.");
		}

		if (estadio[est] == pair<int,int> (0, 0))
		{
			estadio[est] = pair<int,int> (id_estadio++, cidade[cid]);
			fprintf(festadios, "INSERT INTO estadio (id_estadio, id_cidade, nome, capacidade) VALUES (%d, %d, '%s', %d);\n", estadio[est].first, cidade[cid], est, pick(50000, 70000));
		}

		fprintf(fpartidas, "INSERT INTO partida (id_partida, data, horario, fase, numero_grupo, id_estadio) VALUES (%d, '%s', '%s', '%s', %d, %d);\n", id_partida, data, hora, "GRUPOS", grupo, estadio[est].first);

		fprintf(fhospedagem, "INSERT INTO hospedagem (id_hotel, codigo_pais, data_check_in, data_check_out) VALUES (%d, '%s', '%s', '%s');\n", pick(1, id_hotel - 1), cod_pais1, data, data);

		fprintf(fhospedagem, "INSERT INTO hospedagem (id_hotel, codigo_pais, data_check_in, data_check_out) VALUES (%d, '%s', '%s', '%s');\n", pick(1, id_hotel - 1), cod_pais2, data, data);

		fprintf(fparticipacao, "INSERT INTO participacao (id_partida, codigo_pais, gols_feitos) VALUES (%d, '%s', %d);\n", id_partida, cod_pais1, 0);

		fprintf(fparticipacao, "INSERT INTO participacao (id_partida, codigo_pais, gols_feitos) VALUES (%d, '%s', %d);\n", id_partida, cod_pais2, 0);

		id_partida++;
	}

	for (int i = 0; i < 16; i++)
	{
		fscanf(in, " %[^\n] %[^\n] %[^\n] %[^\n] %*[^\n] %[^\n] %[^\n] %*[^\n]", data, est, cid, cod_pais1, hora, cod_pais2);
		data[strlen(data) - 1] = 0;
		est[strlen(est) - 1] = 0;
		cid[strlen(cid) - 1] = 0;
		cod_pais1[strlen(cod_pais1) - 1] = 0;
		hora[strlen(hora) - 1] = 0;
		cod_pais2[strlen(cod_pais2) - 1] = 0;

		if (cidade[cid] == 0)
		{
			cidade[cid] = id_cidade++;
			fprintf(fcidades, "INSERT INTO cidade (id_cidade, nome, estado) VALUES (%d,'%s','%s');\n", cidade[cid], cid, cid);
		}

		if (estadio[est] == pair<int,int> (0, 0))
		{
			estadio[est] = pair<int,int> (id_estadio++, cidade[cid]);
			fprintf(festadios, "INSERT INTO estadio (id_estadio, id_cidade, nome, capacidade) VALUES (%d, %d,'%s', %d);\n", estadio[est].first, cidade[cid], est, pick(50000, 70000));
		}

		fprintf(fpartidas, "INSERT INTO partida (id_partida, data, horario, fase, id_estadio) VALUES (%d, '%s', '%s', '%s', %d);\n", id_partida, data, hora, "ELIMINACAO", estadio[est].first);

		id_partida++;
	}
}
