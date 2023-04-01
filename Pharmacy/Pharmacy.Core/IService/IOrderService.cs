using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Core.IService
{
    public interface IOrderService
    {
        List<Order> GetAllOrder();
        Order GetOrderById(int Id);
        int CreateOrder(DTOInputOrder order);
        int UpdateOrder(DTOInputOrder order);

    }
}
