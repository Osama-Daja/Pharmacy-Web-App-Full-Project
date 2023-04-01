using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Core.IRepository
{
    public interface IOrderRepository
    {
        List<Order> GetAllOrder();
        Order GetOrderById(int Id);
        int CreateOrder(DTOInputOrder order);
        int UpdateOrder(DTOInputOrder order);
    }
}
