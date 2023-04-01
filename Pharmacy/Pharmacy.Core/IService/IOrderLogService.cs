using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Core.IService
{
    public interface IOrderLogService
    {
        List<OrderLog> GetAllOrderLog();
        OrderLog GetOrderLogById(int Id);
        Task<int> CreateOrderLog(OrderLog order);
        List<DTOOutOrderLog> GetOrderLogByBagId(int BagId);//
    }
}
