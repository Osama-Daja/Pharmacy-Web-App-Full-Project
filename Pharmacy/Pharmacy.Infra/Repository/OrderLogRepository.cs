using Dapper;
using Pharmacy.Core.Connection;
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
    public class OrderLogRepository: IOrderLogRepository
    {
        private readonly IConnection _dBContext;
        public OrderLogRepository(IConnection dBContext)
        {
            _dBContext = dBContext;
        }

        public List<OrderLog> GetAllOrderLog()
        {
            var result = _dBContext.DBContext.Query<OrderLog>("GetAllOrderLog", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public OrderLog GetOrderLogById(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<OrderLog>("GetOrderLogById", para, commandType: CommandType.StoredProcedure);
             
            return result.FirstOrDefault();
        }
        public async Task<int> CreateOrderLog(OrderLog order)
        {
            try
            {
                var para = new DynamicParameters();
                para.Add("@BagId", order.BagId, dbType: DbType.Int32, direction: ParameterDirection.Input);
                para.Add("@Status", order.Status, dbType: DbType.Int32, direction: ParameterDirection.Input);
                para.Add("@CurrentDate", DateTime.Now, dbType: DbType.DateTime, direction: ParameterDirection.Input);
                para.Add("@DeliveryId", order.DeliveryId, dbType: DbType.Int32, direction: ParameterDirection.Input);
                para.Add("@PaymentType", order.PaymentType, dbType: DbType.Boolean, direction: ParameterDirection.Input);
                var result = await _dBContext.DBContext.ExecuteAsync("CreateOrderLog", para, commandType: CommandType.StoredProcedure);
                // 
                return result;
            }
            catch
            {
                return 2;
            }
        }

        public List<DTOOutOrderLog> GetOrderLogByBagId(int BagId)
        {
            var para = new DynamicParameters();
            para.Add("@BagId", BagId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<DTOOutOrderLog>("GetOrderLogByBagId", para, commandType: CommandType.StoredProcedure);

             

            return result.ToList();
        }


    }
}
