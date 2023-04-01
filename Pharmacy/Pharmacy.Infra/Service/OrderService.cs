using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Infra.Service
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository )
        {
            _orderRepository = orderRepository;
        }

        public List<Order> GetAllOrder()
        {
            return _orderRepository.GetAllOrder();
        }
        public Order GetOrderById(int Id)
        {
            return _orderRepository.GetOrderById(Id);
        }
        public int CreateOrder(DTOInputOrder order)
        {
            return _orderRepository.CreateOrder(order);
        }

        public int UpdateOrder(DTOInputOrder order)
        {
            return _orderRepository.UpdateOrder(order);
            
        }
    }
}
