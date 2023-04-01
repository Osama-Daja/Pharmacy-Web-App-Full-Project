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
    public class CategoryRepository : ICategoryRepository
    {


        IConnection _connection;

        public CategoryRepository(IConnection connection)
        {
            _connection = connection;
        }
        public int AddCategory(DTOInputCategory model)
        {
            var P = new DynamicParameters();
           
            P.Add("@Name", model.Name, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Description", model.Description, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Image", model.Image, DbType.String, direction: ParameterDirection.Input);
            var R = _connection.DBContext.ExecuteAsync("AddCategory", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int DeleteCategory(int Id)
        {
            try
            {
                var P = new DynamicParameters();

                P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

                var R = _connection.DBContext.ExecuteAsync("DeleteCategory", P, commandType: CommandType.StoredProcedure);
                 
                return R.Result;
            }
            catch
            {
                return 2;
            }
        }

        public List<Category> GetAll()
        {
            IEnumerable<Category> result = _connection.DBContext.Query<Category>("GetAllCategories", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public int UpdateCategory(DTOInputCategory model)
        {
            var P = new DynamicParameters();
            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Name", model.Name, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Description", model.Description, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Image", model.Image, DbType.String, direction: ParameterDirection.Input);
            var R = _connection.DBContext.ExecuteAsync("EditCategory", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }
    }
}
