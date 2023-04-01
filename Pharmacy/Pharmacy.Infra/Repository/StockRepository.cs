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

namespace Pharmacy.Infra.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly IConnection _dBContext;
        public StockRepository(IConnection dBContext)
        {
            _dBContext = dBContext;
        }

        public List<Stock> GetAllStock()
        {
            var result = _dBContext.DBContext.Query<Stock>("GetAllStock", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public Stock GetStockById(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Stock>("GetStockById", para, commandType: CommandType.StoredProcedure);
             
            return result.FirstOrDefault();
        }

        public int CreateStock(DTOInputStock DTOStock)
        {
            var para = new DynamicParameters();
            para.Add("@ProduceDate", DTOStock.ProduceDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            para.Add("@ExpiredDate", DTOStock.ExpiredDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            para.Add("@ProductId", DTOStock.ProductId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@Quantity", DTOStock.Quantity, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = _dBContext.DBContext.ExecuteAsync("CreateStock", para, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int UpdateStock(DTOInputStock DTOStock)
        {
            var para = new DynamicParameters();
            para.Add("@Id", DTOStock.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@ProduceDate", DTOStock.ProduceDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            para.Add("@ExpiredDate", DTOStock.ExpiredDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            para.Add("@ProductId", DTOStock.ProductId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@Quantity", DTOStock.Quantity, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = _dBContext.DBContext.ExecuteAsync("UpdateStock", para, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int DeleteStock(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            
            var result = _dBContext.DBContext.ExecuteAsync("DeleteStock", para, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public DTOOutStockCoutOfProcutInStock CoutOfProcutInStock(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var R = _dBContext.DBContext.Query<DTOOutStockCoutOfProcutInStock>("CoutOfProcutInStock", para, commandType: CommandType.StoredProcedure).AsList();
            // 
            if (R.Count == 0) { return null; }

            return R.FirstOrDefault();
        }

        public List<Stock> GetStockByProductId(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var R = _dBContext.DBContext.Query<Stock>("GetStockByProductId", para, commandType: CommandType.StoredProcedure).AsList();
            // 
            return R;
        }
    }
}
