using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Collections;
using System.IO;

namespace ConsoleApplication2
{
    class Program
    {
        static void Main(string[] args)
        {
            Random random = new Random();
            string connstring = string.Format("Server=localhost; database=trab; UID=root; password=");
            MySqlConnection connection = new MySqlConnection(connstring);
            connection.Open();

            List<int> id_partida = new List<int>();
            using (MySqlCommand cmd = connection.CreateCommand())
            {
                cmd.CommandText = "SELECT * FROM partida WHERE fase = 'GRUPOS'";

                MySqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    id_partida.Add(reader.GetInt32("id_partida"));
                }
            }

            foreach (int id in id_partida)
            {
                string id_selecao1;
                string id_selecao2;
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM participacao WHERE id_partida={0}", id);
                    MySqlDataReader reader = cmd.ExecuteReader();
                    reader.Read();
                    id_selecao1 = reader.GetString("codigo_pais");
                    reader.Read();
                    id_selecao2 = reader.GetString("codigo_pais");
                }

                List<int> jogadores1 = new List<int>();
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM jogador WHERE codigo_pais_joga='{0}'", id_selecao1);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        jogadores1.Add(reader.GetInt32("id_pessoa"));
                    }
                }

                List<int> jogadores2 = new List<int>();
                using (MySqlCommand cmd = connection.CreateCommand())
                {
                    cmd.CommandText = string.Format("SELECT * FROM jogador WHERE codigo_pais_joga='{0}'", id_selecao2);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        jogadores2.Add(reader.GetInt32("id_pessoa"));
                    }
                }

                Console.WriteLine(id_selecao1);
                Console.WriteLine(id_selecao2);
                Console.WriteLine();

                int[] jog1 = jogadores1.ToArray();
                int[] jog2 = jogadores2.ToArray();
                int gols1 = random.Next(0, 5);
                int gols2 = random.Next(0, 5);
                for (int i = 0; i < gols1; i++)
                {
                    File.AppendAllText(@"C:\Users\arthu\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, jog1[random.Next(0, jog1.Length)], string.Format("0:{0}:{1}", random.Next(0, 60), random.Next(0, 60)), "GOL", "GOOOOOL!"));
                }

                for (int i = 0; i < gols2; i++)
                {
                    File.AppendAllText(@"C:\Users\arthu\mc536\scripts\populate_lance.sql", string.Format("INSERT INTO lance (id_partida, id_pessoa, time_stamp, tipo_lance, descricao) VALUES({0}, {1}, '{2}', '{3}', '{4}');\n",
                        id, jog2[random.Next(0, jog2.Length)], string.Format("0:{0}:{1}", random.Next(0, 60), random.Next(0, 60)), "GOL", "GOOOOOL!"));
                }
            }

            Console.Read();
            connection.Close();
        }
    }
}
