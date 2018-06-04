using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Collections;
using System.IO;
namespace ConsoleApp1
{
    class Program
    {
        static string connstring = string.Format("Server=localhost; database=trab; UID=root; password=");
        static MySqlConnection connection = new MySqlConnection(connstring);
        static String lanceAleatorio(int subs)
        {
            String ret = "";
            int dado = random.Next(0, 1001);
            if (dado <= 2) ret = "Gol";
            else if (dado == 3 && subs < 3) ret = "Substituição";
            else if (dado > 3 && dado <= 9) ret = "Falta";
            return ret;
        }
        static String nomePorId(int id)
        {
            string nome;          
            using (MySqlCommand cmd = connection.CreateCommand())
            {
                cmd.CommandText = string.Format("SELECT * FROM pessoa WHERE id_pessoa={0}", id);
                MySqlDataReader reader = cmd.ExecuteReader();
                reader.Read();
                nome = reader.GetString("nome");
            }
            return nome;
        }
        static List<int> queryList(string query, string select)
        {
            List<int> ret = new List<int>();
            
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = query;

                    MySqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        ret.Add(reader.GetInt32(select));
                    }
                }
            
            return ret;
        }

        static Random random = new Random(); 
        static void getGoleiros(ref int goleiro1, ref int goleiro2, string id_selecao)
        {
            
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM jogador WHERE codigo_pais_joga='{0}' AND numero_camisa=5", id_selecao);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    goleiro1 = reader.GetInt32("id_pessoa");
                }
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM jogador WHERE codigo_pais_joga='{0}' AND numero_camisa=14", id_selecao);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    goleiro2 = reader.GetInt32("id_pessoa");
                }
            
        }
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        static void geraLances(string scriptPath, int subs1, List<int> timeAtivo, List<int> timeAtivoBanco, List<int> oponente,int goleiro1, int goleiro1Banco,int id,string tempo, string id_selecao1)
        {
            String lance = lanceAleatorio(subs1);
            if (lance == "Substituição")
            {
                int sai = timeAtivo[random.Next(0, timeAtivo.Count)];
                int entra = timeAtivoBanco[random.Next(0, timeAtivoBanco.Count)];

                string jogSai = nomePorId(sai), jogEntra = nomePorId(entra);
                if (sai == 306) return;
                if (sai == goleiro1 && entra != goleiro1Banco) return;
                File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
       id, sai, tempo, "SUBSTITUICAO", string.Format("Sai {0}!", jogSai)));
                File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
       id, entra, tempo, "SUBSTITUICAO", string.Format("Entra {0}!", jogEntra)));
                subs1++;
                timeAtivo.Remove(sai);
                timeAtivoBanco.Remove(entra);
                timeAtivo.Add(entra);
                timeAtivoBanco.Add(sai);
            }
            else
            if (lance == "Falta")
            {
                int agressor = timeAtivo[random.Next(timeAtivo.Count())];
                int vitima = oponente[random.Next(oponente.Count())];
                string nomAgressor = nomePorId(agressor), nomVitima = nomePorId(vitima);

                File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
    id, agressor, tempo, "FALTA", string.Format("Falta de {0} em {1}!", nomAgressor, nomVitima)));
                File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
       id, vitima, tempo, "SOFREU FALTA", string.Format("{0} sofre falta de {1}!", nomVitima, nomAgressor)));
                int carta = random.Next(0, 1001);
                if (carta <= 50)
                {
                    File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
        id, agressor, tempo, "CARTAO AMARELO", string.Format("{0} ganhou um cartão amarelo!", nomAgressor)));
                }
                if (carta == 1000)
                {
                    if (agressor == 306) return;
                    timeAtivo.Remove(agressor);
                    File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
        id, agressor, tempo, "CARTAO VERMELHO", string.Format("{0} foi expulso!", nomAgressor)));
                }
            }
            else
            if (lance == "Gol")
            {
                int jog = timeAtivo[random.Next(timeAtivo.Count())];

                string nomJog = nomePorId(jog);
                int defesa = random.Next(10);
                if (defesa <= 7)
                {
                    File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
   id, jog, tempo, "DEFESA", string.Format("Defesa de {0}!", nomePorId(goleiro1))));
                }
                else
                {
                    int assistencia = random.Next(3);
                    if (assistencia == 2)
                    {
                        int assistidor = jog;
                        while (assistidor == jog) assistidor = timeAtivo[random.Next(timeAtivo.Count())];
                        string nomAssis = nomePorId(assistidor);
                        File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
  id, jog, tempo, "ASSISTENCIA", string.Format("Assistencia de {0}!", nomAssis)));
                        File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
id, jog, tempo, "GOL", string.Format("Gol de {0}!", nomJog)));
                    }
                    else
                    {
                        File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
id, jog, tempo, "GOL", string.Format("Gol de {0}!", nomJog)));
                    }
                }

            }
            else if (id_selecao1 == "BRA")
            {
                int jog = 306;
                string nomJog = nomePorId(jog);
                int dado = random.Next(0, 600);
                if (dado == 500)
                {
                    File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
        id, jog, tempo, "GOL", string.Format("Gol de {0}!", nomJog)));
                }
            }
        }
        static void carregaSelecao(string id_selecao, ref List<int> jogadores, ref List<int> jogadoresBanco)
        {
            
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT id_pessoa FROM jogador WHERE codigo_pais_joga='{0}'", id_selecao);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    int k = 0;
                    while (reader.Read())
                    {
                        if (k < 7)
                            jogadoresBanco.Add(reader.GetInt32("id_pessoa"));
                        else
                            jogadores.Add(reader.GetInt32("id_pessoa"));
                        k++;
                    }
                }
            
        }

        static void Main(string[] args)
        {
            const string scriptPath = @"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql";

            connection.Open();
            List<int> id_partida = queryList("SELECT id_partida FROM partida WHERE fase = 'GRUPOS'", "id_partida");
            List<int> juizes =  queryList("SELECT id_pessoa FROM juiz WHERE posicao='Juiz'", "id_pessoa");
            List<int> bandeiras = queryList("SELECT id_pessoa FROM juiz WHERE posicao='Bandeirinha'", "id_pessoa");
            Console.WriteLine("Vamos jogar " + id_partida.Count.ToString() + " partidas!");
            File.AppendAllText(scriptPath, "START TRANSACTION;\n");
            foreach (int id in id_partida)
            {
                string id_selecao1;
                string id_selecao2;
                string juiz, bandeira1, bandeira2;
                List<int> jogadores1 = new List<int>(), jogadores2 = new List<int>();
                List<int> jogadores1Banco = new List<int>(), jogadores2Banco = new List<int>();
                int idBandeira1 = bandeiras[random.Next(bandeiras.Count())];
                int idBandeira2 = bandeiras[(idBandeira1 + 1) % bandeiras.Count()];
                int idJuiz = juizes[random.Next(juizes.Count())];
                int goleiro1 = new int(), goleiro1Banco = new int(), goleiro2 = new int(), goleiro2Banco = new int();
                int subs1 = 0, subs2 = 0;

                juiz = nomePorId(idJuiz);
                bandeira1 = nomePorId(idBandeira1);
                bandeira2 = nomePorId(idBandeira2);
                
                    using (MySqlCommand cmd = connection.CreateCommand())
                    {
                        cmd.CommandText = string.Format("SELECT * FROM participacao WHERE id_partida={0}", id);
                        MySqlDataReader reader = cmd.ExecuteReader();
                        reader.Read();
                        id_selecao1 = reader.GetString("codigo_pais");
                        reader.Read();
                        id_selecao2 = reader.GetString("codigo_pais");
                    }
                
                File.AppendAllText(scriptPath, string.Format("INSERT INTO apita (id_partida, id_pessoa) VALUES({0}, {1});\n",
                       id.ToString(), idJuiz.ToString()));
                File.AppendAllText(scriptPath, string.Format("INSERT INTO apita (id_partida, id_pessoa) VALUES({0}, {1});\n",
                       id.ToString(), idBandeira1.ToString()));
                File.AppendAllText(scriptPath, string.Format("INSERT INTO apita (id_partida, id_pessoa) VALUES({0}, {1});\n",
                       id.ToString(), idBandeira2.ToString()));               
                File.AppendAllText(scriptPath, string.Format("INSERT INTO deslocamento (codigo_pais, id_partida, itinerario, descricao_da_escolta) VALUES('{0}', {1}, '{2}', '{3}');\n",
                       id_selecao1.ToString(), id.ToString(), RandomString(random.Next(50, 244)), RandomString(random.Next(50,244))));
                File.AppendAllText(scriptPath, string.Format("INSERT INTO deslocamento (codigo_pais, id_partida, itinerario, descricao_da_escolta) VALUES('{0}', {1}, '{2}', '{3}');\n",
                       id_selecao2.ToString(), id.ToString(), RandomString(random.Next(50, 244)), RandomString(random.Next(50, 244))));
                carregaSelecao(id_selecao1, ref jogadores1, ref jogadores1Banco);
                carregaSelecao(id_selecao2, ref jogadores2, ref jogadores2Banco);
                getGoleiros(ref goleiro1, ref goleiro1Banco,id_selecao1);
                getGoleiros(ref goleiro2, ref goleiro2Banco, id_selecao1);
                Console.WriteLine("Partida: "+ id.ToString() +" : " + id_selecao1.ToString() + " VS " + id_selecao2.ToString());

                File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
              id, idJuiz, string.Format("0:{0}:{1}", 45, 0), "FIM DO PRIMEIRO TEMPO", string.Format("Juiz {0} apita o fim do primeiro tempo!", juiz)));
                File.AppendAllText(scriptPath, string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
              id, idJuiz, string.Format("1:{0}:{1}", 30, 0), "FIM DO JOGO", string.Format("Juiz {0} apita o fim do jogo!", juiz)));
                for (int i = 1; i < 90; i++)
                {
                    for (int j = 1; j <= 59; j++)
                    {
                        string tempo = i > 59 ? string.Format("{0}:{1}:{2}", 1, i - 60, j) : string.Format("{0}:{1}:{2}", 0, i, j);
                        int time = random.Next(1, 3);
                        if (time == 1)
                        {
                            geraLances(scriptPath, subs1, jogadores1, jogadores1Banco, jogadores2, goleiro1, goleiro1Banco, id, tempo, id_selecao1);
                            
                        }
                        if (time == 2)
                        {
                            geraLances(scriptPath, subs2, jogadores2, jogadores2Banco, jogadores1, goleiro2, goleiro2Banco, id, tempo, id_selecao2);
                        }
                    }
                }
            }
            connection.Close();
            File.AppendAllText(scriptPath, "COMMIT;");
            Console.WriteLine("Fim da geracao das partidas!");
            Console.Read();
        }
    }
}
