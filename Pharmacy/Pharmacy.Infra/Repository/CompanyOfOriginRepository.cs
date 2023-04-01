using Dapper;
using Pharmacy.Core.Connection;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Pharmacy.Infra.Repository
{
    public class CompanyOfOriginRepository : ICompanyOfOriginRepository
    {


        IConnection _connection;

        public CompanyOfOriginRepository(IConnection connection)
        {
            _connection = connection;
        }
        public int AddCompanyOfOrigin(DTOInputCompanyOfOrigin model)
        {
            var P = new DynamicParameters();
           
            P.Add("@Name", model.Name, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Description", model.Description, DbType.String, direction: ParameterDirection.Input);
            var R = _connection.DBContext.ExecuteAsync("AddCompanyOfOrigin", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int DeleteCompanyOfOrigin(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("DeleteCompanyOfOrigin", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public List<CompanyOfOrigin> GetAll()
        {
            IEnumerable<CompanyOfOrigin> result = _connection.DBContext.Query<CompanyOfOrigin>("GetAllCompanyOfOrigin", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public int UpdateCompanyOfOrigin(DTOInputCompanyOfOriginUpdate model)
        {
            var P = new DynamicParameters();
            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Name", model.Name, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Description", model.Description, DbType.String, direction: ParameterDirection.Input);
            var R = _connection.DBContext.ExecuteAsync("EditCompanyOfOrigin", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }
    }
}
