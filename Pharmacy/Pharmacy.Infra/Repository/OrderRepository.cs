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
using System.Threading.Tasks;

namespace Pharmacy.Infra.Repository
{
    public class OrderRepository: IOrderRepository
    {
        private readonly IConnection _dBContext;
        public OrderRepository(IConnection dBContext)
        {
            _dBContext = dBContext;
        }

        public List<Order> GetAllOrder()
        {
            var result = _dBContext.DBContext.Query<Order>("GetAllOrder", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public Order GetOrderById(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Order>("GetOrderById", para, commandType: CommandType.StoredProcedure);
             
            return result.FirstOrDefault();
        }

        public int CreateOrder(DTOInputOrder order)
        {
            var para = new DynamicParameters();
            para.Add("@Quantity", order.Quantity, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@StockId", order.StockId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@BagId", order.BagId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.ExecuteAsync("CreateOrder", para, commandType: CommandType.StoredProcedure);

            return result.Result;
        }

        public int UpdateOrder(DTOInputOrder order)
        {
            var para = new DynamicParameters();
            para.Add("@Id", order.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@Quantity", order.Quantity, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@StockId", order.StockId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@BagId", order.BagId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.ExecuteAsync("UpdateOrder", para, commandType: CommandType.StoredProcedure);

             

            return 1;
        }

    }
}
