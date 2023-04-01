using Dapper;
using Pharmacy.Core.Connection;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Infra.Repository
{
    public class BranchRepository : IBranchRepository
    {
        IConnection _connection;
        public BranchRepository(IConnection connection)
        {
            _connection = connection;
        }
        public int DeleteBranch(int Id)
        {

            try
            {
                var P = new DynamicParameters();

                P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

                var R = _connection.DBContext.ExecuteAsync("DeleteBranch", P, commandType: CommandType.StoredProcedure);
                // 
                return R.Result;
            }
            catch
            {
                return 2;
            }
        }

        public async Task<Branch> GetBranchById(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);
            var R = await _connection.DBContext.QueryAsync<Branch>("GetFullBranch");
            if(R.AsList().Count == 0) { return null; }

            // 

            return R.ToArray()[0];
        }

        public async Task<DTOOutBranchDetails> GetBranchDetailsAsync(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

            var Output = await _connection.DBContext.QueryAsync<DTOOutBranchDetails, DTOOutEmplyeeBranchDetails, 
                DTOOutputProductBranchDetails, 
                DTOOutBranchDetails>("GetBranchDetails", (Branch,Employee
                ,Product
                )=>
            {
                Branch.Employee = Branch.Employee ?? new List<DTOOutEmplyeeBranchDetails>();
                Branch.Employee.Add(Employee);
                Branch.Product = Branch.Product ?? new List<DTOOutputProductBranchDetails>();
                Branch.Product.Add(Product);
                return Branch;
            },
            splitOn: "BranchId"
            , param:P
            ,commandType: CommandType.StoredProcedure);

             

            var FinalProduct = Output.AsList().GroupBy(a => a.Id).Select(g =>
            {
                var Product = new DTOOutBranchDetails();
                Product = g.First();

                Product.Employee = g.Select(a => a.Employee.Single()).GroupBy(a => a.ApplicationUserId).Select(m => { return m.First(); }).ToList();
                if(Product.Employee.Any(a=>a.BranchId == 0)) { Product.Employee = new List<DTOOutEmplyeeBranchDetails>(); }
                Product.Product = g.Select(a => a.Product.Single()).GroupBy(a => a.ProductId).Select(m => { return m.First(); }).ToList();
                if (Product.Product.Any(a => a.BranchId == 0)) { Product.Product = new List<DTOOutputProductBranchDetails>(); }
                return Product;
            });

            return FinalProduct.FirstOrDefault();
        }

        public async Task<List<Branch>> GetFullBranch()
        {
            var R = await _connection.DBContext.QueryAsync<Branch>("GetFullBranch");
             
            return R.AsList();
        }

        public int InsertBranch(DTOInputBranch model)
        {
            try
            {
                var P = new DynamicParameters();

                P.Add("@Name", model.Name, DbType.String, direction: ParameterDirection.Input);
                P.Add("@Description", model.Description, DbType.String, direction: ParameterDirection.Input);
                P.Add("@Latitude", model.Latitude, DbType.Double, direction: ParameterDirection.Input);
                P.Add("@Longitude", model.Longitude, DbType.Double, direction: ParameterDirection.Input);
                P.Add("@Geometry", model.Geometry, DbType.String, direction: ParameterDirection.Input);

                var R = _connection.DBContext.ExecuteAsync("InsertBranch", P, commandType: CommandType.StoredProcedure);
                 
                return R.Result;
            }
            catch
            {
                return 2;
            }
        }

        public List<DTOOutBranchTrendingBranch> TrendingBranchByDate(DTOInputBranchTrendingBranchByDate model)
        {
            var P = new DynamicParameters();

            P.Add("@StartDate", model.StartDate, DbType.Date, direction: ParameterDirection.Input);
            P.Add("@EndDate", model.EndDate, DbType.Date, direction: ParameterDirection.Input);

            return _connection.DBContext.Query<DTOOutBranchTrendingBranch>("TrendingBranchByDate", P, commandType: CommandType.StoredProcedure).AsList();

        }

        public int UpdateBranch(DTOInputUpdateBranch model)
        {
            try
            {
                var P = new DynamicParameters();

                P.Add("@Id", model.Id, DbType.String, direction: ParameterDirection.Input);
                P.Add("@Name", model.Name, DbType.String, direction: ParameterDirection.Input);
                P.Add("@Description", model.Description, DbType.String, direction: ParameterDirection.Input);
                P.Add("@Latitude", model.Latitude, DbType.Double, direction: ParameterDirection.Input);
                P.Add("@Longitude", model.Longitude, DbType.Double, direction: ParameterDirection.Input);

                var R = _connection.DBContext.ExecuteAsync("UpdateBranch", P, commandType: CommandType.StoredProcedure).Result;
                 
                return R;
            }
            catch
            {
                return 1;
            }
        }

        public int UpdateBranchGEO(DTOInputUpdateBranchGEO model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Geometry", model.Geometry, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("UpdateBranchGEO", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int UpdateWorkHour(DTOInputUpdateWorkHour model)
        {
            var P = new DynamicParameters();

            TimeSpan ? Start = null;
            TimeSpan ? End = null;
            if (model.StartWorkHours != null || model.EndWorkHours != null)
            {
                TimeSpan StartIn;
                TimeSpan EndIn;
                TimeSpan.TryParse(model.StartWorkHours, out StartIn);
                TimeSpan.TryParse(model.EndWorkHours, out EndIn);
                Start = StartIn;
                End = EndIn;
            }

            P.Add("@Id", model.Id, DbType.String, direction: ParameterDirection.Input);
            P.Add("@StartWorkHours", Start, DbType.Time, direction: ParameterDirection.Input);
            P.Add("@EndWorkHours", End, DbType.Time, direction: ParameterDirection.Input);


            var R = _connection.DBContext.ExecuteAsync("UpdateWorkHour", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }
    }
}
