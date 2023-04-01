using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Pharmacy.API.Hubs;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IService;
using Pharmacy.Encrypt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Pharmacy.API.Hubs.ChatHub;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderLogController : Controller
    {
        private readonly IOrderLogService _orderLogService;
        private readonly IBagService _bagService;
        private readonly IApplicationUserService _applicationUserService;
        private readonly IHubContext<ChatHub> _chatHubContext;
        public OrderLogController(IOrderLogService orderLogService, IBagService bagService
            ,IApplicationUserService applicationUserService , IHubContext<ChatHub> hubContext)
        {
            _orderLogService = orderLogService;
            _bagService = bagService;
            _applicationUserService = applicationUserService;
            _chatHubContext = hubContext;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<OrderLog>), StatusCodes.Status200OK)]
        [Authorize(Roles = "SuperUser,Admin")]
        public List<OrderLog> GetAllOrderLog()
        {
            return _orderLogService.GetAllOrderLog();
        }

        [HttpGet]
        [Route("{Id}")]
        [ProducesResponseType(typeof(OrderLog), StatusCodes.Status200OK)]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public OrderLog GetOrderLogById(int Id)
        {
             return _orderLogService.GetOrderLogById(Id);
        }

        [HttpPost]
        [Authorize(Roles = "Delivery")]
        [Route("DoneOrderDelivery")]
        public async Task<object> DoneOrderDelivery()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var DeliveryId = Convert.ToInt32(UserId);
            var LastBag = await _bagService.GetMyLastBagByDelivery(DeliveryId);
            if (LastBag != null && LastBag.Status != 1) { return StatusCode(208); }



            var Con = ConnectedUser.Users.Where(a => a.Id == LastBag.CustomerId);
            if (Con.Any())
            {
                LastBag.Status = 3;
                var Delivery = await _applicationUserService.GetUserEmployeeData(DeliveryId);
                var Message = new
                {
                    Bag = LastBag,
                    Delivery = new
                    {
                        Delivery.Image,
                        Delivery.NickName,
                        Delivery.PhoneNumber,
                    }
                };
                await _chatHubContext.Clients.Clients(Con.OrderBy(a => a.CurrentDate).Last().IdConnection)
                .SendAsync("SendLocationToCustomer", Message);
            }



            var OrderLog = new OrderLog()
            {
                BagId = LastBag.Id,
                DeliveryId = DeliveryId,
                CurrentDate = DateTime.Now,
                Status = 3,
                PaymentType = LastBag.PaymentType
            };

            await _orderLogService.CreateOrderLog(OrderLog);
            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = "Customer")]
        [Route("CancelOrderCustomer")]
        public async Task<object> CancelOrderCustomerAsync()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var CustomerId = Convert.ToInt32(UserId);

            var Bag = await _bagService.GetMyLastBagByCustomer(CustomerId);
            if (Bag.Status > 1) { return StatusCode(208); }

            var Con = ConnectedUser.Users.Where(a => a.Id == Bag.DeliveryId);
            if (Con.Any())
            {
                Bag.Status = 2;
                var Delivery = await _applicationUserService.GetUserEmployeeData(Bag.DeliveryId);
                var Message = new
                {
                    Bag = Bag,
                    Delivery = new
                    {
                        Delivery.Image,
                        Delivery.NickName,
                        Delivery.PhoneNumber,
                    }
                };
                await _chatHubContext.Clients.Clients(Con.OrderBy(a => a.CurrentDate).Last().IdConnection)
                .SendAsync("SendLocationToCustomer", Message);
            }


            var OrderLog = new OrderLog()
            {
                BagId = Bag.Id,
                DeliveryId = Bag.DeliveryId,
                CurrentDate = DateTime.Now,
                Status = 2,
                PaymentType = Bag.PaymentType
            };
            if(OrderLog.DeliveryId == 0) { OrderLog.DeliveryId = null; }

            await _orderLogService.CreateOrderLog(OrderLog);
            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = "Customer")]
        [Route("DoneOrderCustomer")]
        public async Task<object> DoneOrderCustomerAsync()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var CustomerId = Convert.ToInt32(UserId);

            var Bag = await _bagService.GetMyLastBagByCustomer(CustomerId);
            if (Bag.Status != 3) { return StatusCode(208); }

            var OrderLog = new OrderLog()
            {
                BagId = Bag.Id,
                DeliveryId = Bag.DeliveryId,
                CurrentDate = DateTime.Now,
                Status = 4,
                PaymentType = Bag.PaymentType
            };
            await _orderLogService.CreateOrderLog(OrderLog);
            return Ok();
        }

        [HttpGet]
        [Route("Bag/{BagId}")]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public object GetOrderLogByBagId(int BagId)
        {
            _orderLogService.GetOrderLogByBagId(BagId);
            return Ok();
            
        }
    }
}
