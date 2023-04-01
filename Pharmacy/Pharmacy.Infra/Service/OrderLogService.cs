using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Infra.Service
{
    public class OrderLogService: IOrderLogService
    {
        private readonly IOrderLogRepository _orderRepository;
        public OrderLogService(IOrderLogRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public List<OrderLog> GetAllOrderLog()
        {
            return _orderRepository.GetAllOrderLog();
        }
        public OrderLog GetOrderLogById(int Id)
        {
            return _orderRepository.GetOrderLogById(Id);
        }
        public async Task<int> CreateOrderLog(OrderLog order)
        {
            return await _orderRepository.CreateOrderLog(order);
        }

        public List<DTOOutOrderLog> GetOrderLogByBagId(int BagId)
        {
            return _orderRepository.GetOrderLogByBagId(BagId);
           
        }
    }
}
