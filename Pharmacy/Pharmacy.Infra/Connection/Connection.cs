using Microsoft.Extensions.Configuration;
using Pharmacy.Core.Connection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Text;

namespace Pharmacy.Infra.Connection
{
    public class Connection : IConnection
    {
        public IConfiguration _configuration;
        DbConnection _dbConnection;
        public Connection(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbConnection DBContext { get { 
            
                if(_dbConnection == null)
                {
                    _dbConnection = new SqlConnection(_configuration.GetConnectionString("DBConnectionString"));

                    try
                    {
                        _dbConnection.Open();
                    }
                    catch
                    {
                        _dbConnection.Close();
                    }
                }
                if(_dbConnection.State != ConnectionState.Open)
                {
                    _dbConnection.Open();
                }

                return _dbConnection;

            } }
    }
}
