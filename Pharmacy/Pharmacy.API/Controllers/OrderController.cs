using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IService;
using Pharmacy.Encrypt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        [Authorize(Roles = "SuperUser,Admin")]
        public List<Order> GetAllOrder()
        {
            return _orderService.GetAllOrder();
        }

        [HttpGet]
        [Route("{Id}")]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public Order GetOrderById(int Id)
        {
            return _orderService.GetOrderById(Id);
        }


        [HttpPost]
        [Authorize(Roles = "Customer")]
        public object CreateOrder(DTOInputOrder order)
        {
            _orderService.CreateOrder(order);
            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "Customer")]
        public object UpdateOrder(DTOInputOrder order)
        {
            
             _orderService.UpdateOrder(order);
            return Ok();
        }
    }
}
