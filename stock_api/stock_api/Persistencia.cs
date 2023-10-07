using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace stock_api
{

    public enum TipoConsulta
    {
        TEXT,
        STORED_PROCEDURE
    }
    public class Persistencia
    {
        protected static string ConnStr;


        /// <summary>
        /// Executa SQL
        /// </summary>
        /// <param name="query"></param>
        /// <returns>DataTable com o resultado da consulta</returns>
        protected static DataTable ExecutarSql(string query)
        {
            return ExecutarSql(query, null);
        }

        public static void SetarConnStr(string connStr)
        {
            ConnStr = connStr;
        }

        /// <summary>
        /// Executa SQL
        /// </summary>
        /// <param name="objPersistencia"></param>
        /// <returns></returns>
        protected static DataTable ExecutarSql(QueryParametrosOracle objPersistencia)
        {
            return ExecutarSql(objPersistencia.Query, objPersistencia.ParamsValores, objPersistencia._connStr);
        }

        /// <summary>
        /// Executa SQL
        /// </summary>
        /// <param name="query"></param>
        /// <param name="paramsValores"></param>
        /// <returns></returns>
        protected static DataTable ExecutarSql(string query, List<ParametroValor> paramsValores, string connString = null, TipoConsulta tipoconsulta = TipoConsulta.TEXT)
        {
            DataTable dtRettorno = new DataTable();
            SqlConnection conn = new SqlConnection(connString ?? ConnStr);
            SqlCommand comm = new SqlCommand(query, conn);
            comm.CommandTimeout = 3600;

            if (paramsValores != null)
            {
                foreach (var pv in paramsValores)
                {
                    if (string.IsNullOrEmpty(pv.ParamType))
                    {
                        comm.Parameters.Add(new SqlParameter(pv.ParamName, pv.Valor));
                    }
                    else if (pv.ParamType.ToLower() == "varbinary")
                    {
                        comm.Parameters.Add(pv.ParamName, SqlDbType.VarBinary).Value = pv.Valor;
                    }
                }
            }

            if (tipoconsulta == TipoConsulta.STORED_PROCEDURE)
            {
                comm.CommandType = CommandType.StoredProcedure;
            }

            conn.Open();
            dtRettorno.Load(comm.ExecuteReader());
            conn.Close();

            return dtRettorno;
        }

        /// <summary>
        /// Executa SQL
        /// </summary>
        /// <param name="query"></param>
        /// <param name="paramsValores"></param>
        /// <returns></returns>
        public static IEnumerable<T> ExecutarSql<T>(string query, List<ParametroValor> paramsValores, TipoConsulta tipoconsulta = TipoConsulta.TEXT)
        {
            DataTable dtRettorno = new DataTable();
            SqlConnection conn = new SqlConnection(ConnStr);

            var parametros = new DynamicParameters();

            if (paramsValores != null)
            {
                foreach (var pv in paramsValores)
                {
                    if (string.IsNullOrEmpty(pv.ParamType))
                    {
                        parametros.Add(pv.ParamName, pv.Valor);
                    }
                    else if (pv.ParamType.ToLower() == "varbinary")
                    {
                        parametros.Add(pv.ParamName, pv.Valor, DbType.Binary);
                    }
                }
            }

            CommandDefinition comm = new CommandDefinition(query,
                                                           parameters: parametros,
                                                           commandType: (tipoconsulta == TipoConsulta.TEXT ? CommandType.Text : CommandType.StoredProcedure),
                                                           commandTimeout: 3600);
            conn.Open();
            var lstRetorno = conn.Query<T>(comm);
            conn.Close();

            return lstRetorno;
        }

        /// <summary>
        /// Executa SQL sem retorno
        /// </summary>
        /// <param name="query"></param>
        protected static void ExecutarSqlSemRetorno(string query)
        {
            ExecutarSqlSemRetorno(query, null);
        }

        /// <summary>
        /// Executa SQL sem retorno
        /// </summary>
        /// <param name="objPersistencia"></param>
        protected static void ExecutarSqlSemRetorno(QueryParametrosOracle objPersistencia)
        {
            ExecutarSqlSemRetorno(objPersistencia.Query, objPersistencia.ParamsValores, objPersistencia._connStr);
        }

        /// <summary>
        /// Executa SQL sem retorno
        /// </summary>
        /// <param name="query"></param>
        /// <param name="paramsValores"></param>
        public static void ExecutarSqlSemRetorno(string query, List<ParametroValor> paramsValores, string connString = null, TipoConsulta tipoconsulta = TipoConsulta.TEXT)
        {
            SqlConnection conn = new SqlConnection(connString ?? ConnStr);
            SqlCommand comm = new SqlCommand(query, conn);
            comm.CommandTimeout = 3600;

            if (paramsValores != null)
            {
                foreach (var pv in paramsValores)
                {
                    if (string.IsNullOrEmpty(pv.ParamType))
                    {
                        comm.Parameters.Add(new SqlParameter(pv.ParamName, pv.Valor ?? DBNull.Value));
                    }
                    else if (pv.ParamType.ToLower() == "varbinary")
                    {
                        comm.Parameters.Add(pv.ParamName, SqlDbType.VarBinary).Value = pv.Valor;
                    }
                }
            }

            if (tipoconsulta == TipoConsulta.STORED_PROCEDURE)
            {
                comm.CommandType = CommandType.StoredProcedure;
            }

            conn.Open();
            comm.ExecuteNonQuery();
            conn.Close();
        }

        /// <summary>
        /// Executa SQL
        /// </summary>
        /// <param name="query"></param>
        /// <returns>DataTable com o resultado da consulta</returns>
        protected static DataSet ExecutarSqlDataSet(string query)
        {
            return ExecutarSqlDataSet(query, null);
        }

        /// <summary>
        /// Executa SQL
        /// </summary>
        /// <param name="objPersistencia"></param>
        /// <returns></returns>
        protected static DataSet ExecutarSqlDataSet(QueryParametrosOracle objPersistencia)
        {
            //return ExecutarSql(objPersistencia.Query, objPersistencia.ParamsValores, objPersistencia._connStr);
            return ExecutarSqlDataSet(objPersistencia.Query, objPersistencia.ParamsValores, objPersistencia._connStr);
        }

        /// <summary>
        /// Executa SQL
        /// </summary>
        /// <param name="query"></param>
        /// <param name="paramsValores"></param>
        /// <returns></returns>
        protected static DataSet ExecutarSqlDataSet(string query, List<ParametroValor> paramsValores, string connString = null)
        {
            DataSet dsRettorno = new DataSet();
            SqlConnection conn = new SqlConnection(connString ?? ConnStr);
            SqlCommand comm = new SqlCommand(query, conn);
            comm.CommandTimeout = 3600;

            if (paramsValores != null)
            {
                foreach (var pv in paramsValores)
                {
                    if (string.IsNullOrEmpty(pv.ParamType))
                    {
                        comm.Parameters.Add(new SqlParameter(pv.ParamName, pv.Valor));
                    }
                    else if (pv.ParamType.ToLower() == "varbinary")
                    {
                        comm.Parameters.Add(pv.ParamName, SqlDbType.VarBinary).Value = pv.Valor;
                    }
                }
            }

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(comm);

            conn.Open();
            sqlDataAdapter.Fill(dsRettorno);
            conn.Close();

            return dsRettorno;
        }


        /// <summary>
        /// Executa SQL
        /// </summary>
        /// <param name="query"></param>
        /// <param name="paramsValores"></param>
        /// <returns></returns>
        protected static IEnumerable<dynamic> ExecutarSqlDataSet<T>(string query, List<ParametroValor> paramsValores, string connString = null, TipoConsulta tipoconsulta = TipoConsulta.TEXT)
        {
            DataTable dtRettorno = new DataTable();
            SqlConnection conn = new SqlConnection(connString ?? ConnStr);
            List<dynamic> dsRetorno = new List<dynamic>();

            var parametros = new DynamicParameters();

            if (paramsValores != null)
            {
                foreach (var pv in paramsValores)
                {
                    if (string.IsNullOrEmpty(pv.ParamType))
                    {
                        parametros.Add(pv.ParamName, pv.Valor);
                    }
                    else if (pv.ParamType.ToLower() == "varbinary")
                    {
                        parametros.Add(pv.ParamName, pv.Valor, DbType.Binary);
                    }
                }
            }

            CommandDefinition comm = new CommandDefinition(query,
                                                           parameters: parametros,
                                                           commandType: (tipoconsulta == TipoConsulta.TEXT ? CommandType.Text : CommandType.StoredProcedure),
                                                           commandTimeout: 3600);
            conn.Open();
            var reader = conn.QueryMultiple(comm);

            while (reader.IsConsumed == false)
            {
                dsRetorno.Add(reader.Read());
            }

            conn.Close();

            return dsRetorno;
        }
    }


    /// <summary>
    /// ParametroValor
    /// </summary>
    public class ParametroValor
    {
        public string ParamName;
        public object Valor;
        public string ParamType;

        public ParametroValor(string pName, object value)
        {
            ParamName = pName;
            Valor = value;
        }

        public ParametroValor(string pName, object value, string type)
        {
            ParamName = pName;
            Valor = value;
            ParamType = type;
        }

        /// <summary>
        /// Retorna o valor da variável ou dbnull, caso o valor seja nulo
        /// </summary>
        /// <param name="value">Valor a ser verificado</param>
        /// <returns>Valor da variável ou DBNull</returns>
        public static object DBNull_Or_Value(object value)
        {
            if (value == null)
                return System.DBNull.Value;
            else
                return value;
        }

        /// <summary>
        /// Retorna o valor da variável ou null, caso o valor seja dbnull
        /// </summary>
        /// <param name="value">Valor a ser verificado</param>
        /// <returns>Valor da variável ou null</returns>
        public static object DBNull_2_Null_Or_Value(object value)
        {
            if (value == DBNull.Value)
                return null;
            else
                return value;
        }

        /// <summary>
        /// Retorna o valor da variável ou null, caso o valor seja dbnull
        /// </summary>
        /// <param name="value">Valor a ser verificado</param>
        /// <returns>Valor da variável ou null</returns>
        public static bool HasValue(object value)
        {
            if (value == DBNull.Value || value == null || string.IsNullOrEmpty(value.ToString()))
                return false;
            else
                return true;
        }
    }

    /// <summary>
    /// QueryParametros
    /// </summary>
    public class QueryParametrosOracle : Persistencia
    {
        public string Query;
        public List<ParametroValor> ParamsValores = new List<ParametroValor>();
        public string _connStr = null;

        //public QueryParametros()
        //{

        //}

        public QueryParametrosOracle(string connString)
        {
            _connStr = connString;
        }

        public void AddParam(string pName, object value)
        {
            ParamsValores.Add(new ParametroValor(pName, value));
        }

        public void AddParam(string pName, object value, string type)
        {
            ParamsValores.Add(new ParametroValor(pName, value, type));
        }

        public DataTable ExecutarSql()
        {
            return ExecutarSql(this);
        }

        public void ExecutarSqlSemRetorno()
        {
            ExecutarSqlSemRetorno(this);
        }

        public DataSet ExecutarSqlDataSet()
        {
            return ExecutarSqlDataSet(this);
        }
    }

}
