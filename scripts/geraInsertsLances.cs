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

        static Random random = new Random();
        static String lanceAleatorio(int subs)
        {                 
            String ret = "";
            int dado = random.Next(0, 1001);
            if (dado == 1) ret = "Gol";
            else if (dado == 2 && subs < 3) ret = "Substituição";
            else if (dado > 2 && dado <= 8) ret = "Falta";
            return ret;
        }
        static String nomePorId(int id)
        {
            string nome;
            string connstring = string.Format("Server=localhost; database=trab; UID=root; password=");
            MySqlConnection connection = new MySqlConnection(connstring);
            connection.Open();
            using (MySqlCommand cmd = connection.CreateCommand())
            {
                cmd.CommandText = string.Format("SELECT * FROM pessoa WHERE id_pessoa={0}", id);
                MySqlDataReader reader = cmd.ExecuteReader();
                reader.Read();
                nome = reader.GetString("nome");
            }
            connection.Close();
            return nome;
        }
        static void Main(string[] args)
        {
            string connstring = string.Format("Server=localhost; database=trab; UID=root; password=");
            MySqlConnection connection = new MySqlConnection(connstring);
            connection.Open();

            List<int> id_partida = new List<int>();
            List<int> juizes = new List<int>(), bandeiras = new List<int>();
            using (MySqlCommand cmd = connection.CreateCommand())
            {
                cmd.CommandText = "SELECT * FROM partida WHERE fase = 'GRUPOS'";

                MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    id_partida.Add(reader.GetInt32("id_partida"));
                }
            }
            using (MySqlCommand cmd = connection.CreateCommand())
            {
                cmd.CommandText = string.Format("SELECT * FROM juiz WHERE posicao={0}", "'Juiz'");
                MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    juizes.Add(reader.GetInt32("id_pessoa"));
                }
            }
            using (MySqlCommand cmd = connection.CreateCommand())
            {
                cmd.CommandText = string.Format("SELECT * FROM juiz WHERE posicao={0}", "'Bandeirinha'");
                MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    bandeiras.Add(reader.GetInt32("id_pessoa"));
                }
            }
            
            File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", "START TRANSACTION;\n");
            foreach (int id in id_partida)
            {
                string id_selecao1;
                string id_selecao2;
                string juiz, bandeira1, bandeira2;
                int idBandeira1 = bandeiras[random.Next(bandeiras.Count())];
                int idBandeira2 = bandeiras[(idBandeira1 + 1) % bandeiras.Count()];
                int idJuiz = juizes[random.Next(juizes.Count())];
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM pessoa WHERE id_pessoa={0}", idJuiz);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    juiz = reader.GetString("nome");
                }
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                  
                    cmd.CommandText = string.Format("SELECT * FROM pessoa WHERE id_pessoa={0}", idBandeira1);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    bandeira1 = reader.GetString("nome");                    
                }
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM pessoa WHERE id_pessoa={0}", idBandeira2);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    bandeira2 = reader.GetString("nome");
                }
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM participacao WHERE id_partida={0}", id);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    id_selecao1 = reader.GetString("codigo_pais");
                    reader.Read();
                    id_selecao2 = reader.GetString("codigo_pais");
                }
                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO apita (id_partida, id_pessoa) VALUES({0}, {1});\n",
                       id.ToString(), idJuiz.ToString()));
                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO apita (id_partida, id_pessoa) VALUES({0}, {1});\n",
                       id.ToString(), idBandeira1.ToString()));
                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO apita (id_partida, id_pessoa) VALUES({0}, {1});\n",
                       id.ToString(), idBandeira2.ToString()));
                List<int> jogadores1 = new List<int>();
                List<int> jogadores1Banco = new List<int>();
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM jogador WHERE codigo_pais_joga='{0}'", id_selecao1);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    int k = 0; 
                    while (reader.Read())
                    {
                        if (k < 11)
                            jogadores1.Add(reader.GetInt32("id_pessoa"));
                        else
                            jogadores1Banco.Add(reader.GetInt32("id_pessoa"));
                        k++;
                    }
                }

                List<int> jogadores2 = new List<int>();
                List<int> jogadores2Banco = new List<int>();
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM jogador WHERE codigo_pais_joga='{0}'", id_selecao2);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    int k = 0;
                    while (reader.Read())
                    {
                        if(k < 11)
                            jogadores2.Add(reader.GetInt32("id_pessoa"));
                        else
                            jogadores2Banco.Add(reader.GetInt32("id_pessoa"));
                        k++;
                    }
                }

              
                Console.WriteLine(id_selecao1);
                Console.WriteLine(jogadores1.Count);
                Console.WriteLine(jogadores1Banco.Count);
                Console.WriteLine(id_selecao2);
                Console.WriteLine(jogadores2.Count);
                Console.WriteLine(jogadores2Banco.Count);
                Console.WriteLine();
                int subs1 = 0, subs2 = 0;
                int[] jog1 = jogadores1.ToArray();
                int[] jog2 = jogadores2.ToArray();
                int gols1 = random.Next(0, 5);
                int gols2 = random.Next(0, 5);
                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
              id, idJuiz, string.Format("0:{0}:{1}", 45, 0), "FIM DO PRIMEIRO TEMPO", string.Format("Juiz {0} apita o fim do primeiro tempo!", juiz)));
                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
              id, idJuiz, string.Format("0:{0}:{1}", 90, 0), "FIM DO JOGO", string.Format("Juiz {0} apita o fim do jogo!", juiz)));
                for (int i = 1; i <= 90; i++)
                {
                    for(int j = 1; j <= 59; j++)
                    {
                        /*
                         Gol, Cartão amarelo, Substituição, Falta, Cartão vermelho
                        */

                        string tempo = i > 59 ? string.Format("{0}:{1}:{2}", 1, i - 60, j) : string.Format("{0}:{1}:{2}", 0, i, j);
                        int time = random.Next(1, 3);
                        if(time == 1)
                        {
                           
                            String lance = lanceAleatorio(subs1);
                            
                            if (lance == "Substituição")
                            {
                                int sai = jogadores1[random.Next(0, jogadores1.Count)];
                                int entra = jogadores1Banco[random.Next(0, jogadores1Banco.Count)];
                               
                                string jogSai = nomePorId(sai), jogEntra = nomePorId(entra);
                                if (jogSai == "Neymar") continue;
                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                       id, sai, tempo, "SUBSTITUICAO", string.Format("Sai {0}!",jogSai)));
                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                       id, entra, tempo, "SUBSTITUICAO", string.Format("Entra {0}!", jogEntra)));
                                subs1++;
                                jogadores1.Remove(sai);
                                jogadores1Banco.Remove(entra);
                                jogadores1.Add(entra);
                                jogadores1Banco.Add(sai);
                            }else
                            if(lance == "Falta")
                            {
                                int agressor = jogadores1[random.Next(jogadores1.Count())];
                                int vitima = jogadores2[random.Next(jogadores2.Count())];
                                string nomAgressor = nomePorId(agressor), nomVitima = nomePorId(vitima);
                              
                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                    id, agressor, tempo, "FALTA", string.Format("Falta de {0} em {1}!", nomAgressor, nomVitima)));
                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                       id, vitima, tempo, "SOFREU FALTA", string.Format("{0} sofre falta de {1}!", nomVitima, nomAgressor)));
                                int carta = random.Next(0, 1001);
                                if(carta <= 50)
                                {
                                    File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, agressor, tempo, "CARTAO AMARELO", string.Format("{0} ganhou um cartão amarelo!", nomAgressor)));
                                }
                                if(carta == 1000)
                                {
                                    if (agressor == 306) continue;
                                    jogadores1.Remove(agressor);
                                    File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, agressor, tempo, "CARTAO VERMELHO", string.Format("{0} foi expulso!", nomAgressor)));
                                }
                            }else
                            if (lance == "Gol")
                            {
                                int jog = jogadores1[random.Next(jogadores1.Count())];
                                string nomJog = nomePorId(jog);
                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                    id, jog, tempo, "GOL", string.Format("Gol de {0}!", nomJog)));
                            } 
                            else if (id_selecao1 == "BRA")
                            {
                                int jog = 306;
                                string nomJog = nomePorId(jog);
                                int dado = random.Next(0, 1500);
                                if(dado == 900)
                                {
                                    File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, jog, tempo, "GOL", string.Format("Gol de {0}!", nomJog)));
                                }
                            }
                        }
                        if(time == 2)
                        {
                            String lance = lanceAleatorio(subs2);
                            if (lance == "Substituição")
                            {
                                int sai = jogadores2[random.Next(0,jogadores2.Count)];
                                int entra = jogadores2Banco[random.Next(0,jogadores2Banco.Count)];

                                string jogSai = nomePorId(sai), jogEntra = nomePorId(entra);

                                if (jogSai == "Neymar") continue;
                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, sai, tempo, "SUBSTITUICAO", string.Format("Sai {0}!", jogSai)));
                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, entra, tempo, "SUBSTITUICAO", string.Format("Entra {0}!", jogEntra)));
                                subs2++;
                                jogadores2.Remove(sai);
                                jogadores2Banco.Remove(entra);
                                jogadores2.Add(entra);
                                jogadores2Banco.Add(sai);
                            }else
                            if (lance == "Falta")
                            {
                                int agressor = jogadores2[random.Next(0,jogadores2.Count)];
                                int vitima = jogadores1[random.Next(0,jogadores1.Count)];
                                string nomAgressor = nomePorId(agressor), nomVitima = nomePorId(vitima);

                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                    id, agressor, tempo, "FALTA", string.Format("Falta de {0} em {1}!", nomAgressor, nomVitima)));
                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, vitima, tempo, "SOFREU FALTA", string.Format("{0} sofre falta de {1}!", nomVitima, nomAgressor)));
                                int carta = random.Next(0, 1001);
                                if (carta <= 50)
                                {
                                    File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, agressor, tempo, "CARTAO AMARELO", string.Format("{0} ganhou um cartão amarelo!", nomAgressor)));
                                }
                                if (carta == 1000)
                                {
                                    if (agressor == 306) continue;
                                    jogadores2.Remove(agressor);
                                    File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, agressor, tempo, "CARTAO VERMELHO", string.Format("{0} foi expulso!", nomAgressor)));
                                }
                            }else
                            if (lance == "Gol")
                            {
                                int jog = jogadores2[random.Next(0,jogadores2.Count)];
                                string nomJog = nomePorId(jog);
                                File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                    id, jog, tempo, "GOL", string.Format("Gol de {0}!", nomJog)));
                            }else
                            if (id_selecao1 == "BRA")
                            {
                                int jog = 306;
                                string nomJog = nomePorId(jog);
                                int dado = random.Next(0, 1500);
                                if (dado == 900)
                                {
                                    File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, jog, tempo, "GOL", string.Format("Gol de {0}!", nomJog)));
                                }
                            }

                        }                      
                    }
                }               
            }

            File.AppendAllText(@"C:\Users\josec.DESKTOP-8AUANLS\mc536\scripts\populate_lance.sql", "COMMIT;");
            Console.Read();
            connection.Close();
        }
    }
}
