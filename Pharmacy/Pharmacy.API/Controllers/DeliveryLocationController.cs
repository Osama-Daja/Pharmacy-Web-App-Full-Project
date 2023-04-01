using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Pharmacy.API.Hubs;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOInput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
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
    public class DeliveryLocationController : Controller
    {
        readonly IDeliveryLocationService _deliveryLocationService;
        readonly IBagService _bagService;
        readonly IApplicationUserService _applicationUserService;
        private IHubContext<ChatHub> _chatHubContext;
        public DeliveryLocationController(IDeliveryLocationService deliveryLocationService, IBagService bagService
            ,IHubContext<ChatHub> chatHubContext, IApplicationUserService applicationUserService)
        {
            _deliveryLocationService = deliveryLocationService;
            _bagService = bagService;
            _applicationUserService = applicationUserService;
            _chatHubContext = chatHubContext;
        }

     
        [HttpPost]
        [Route("AddDeliveryLocation")]
        [Authorize(Roles = "Delivery")]
        public async Task<object> AddDeliveryLocationAsync(DTOInputAddDeliveryLocation model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.DeliveryId = Convert.ToInt32(UserId);
            model.CurrentDate = DateTime.Now;

            var LastBag = await _bagService.GetMyLastBagByDelivery(model.DeliveryId);

            if (LastBag != null && LastBag.Status == 1)
            {
                    var Con = ConnectedUser.Users.Where(a => a.Id == LastBag.CustomerId);
                    if (Con.Any())
                    {
                        var Delivery = await _applicationUserService.GetUserEmployeeData(model.DeliveryId);
                        var Message = new
                        {
                            Bag = LastBag,
                            Delivery = new
                            {
                                Delivery.Image,
                                Delivery.NickName,
                                Delivery.PhoneNumber,
                                model.Latitude,
                                model.Longitude
                            }
                        };
                        await _chatHubContext.Clients.Clients(Con.OrderBy(a=>a.CurrentDate).Last().IdConnection)
                        .SendAsync("SendLocationToCustomer", Message);
                    }
            }
            var R = _deliveryLocationService.AddDeliveryLocation(model);
            return Ok();
        }


        [HttpGet]
        [Route("GetDeliveryLocationById/{Id}")]
        [Authorize(Roles = "SuperUser,Admin,Customer")]
        public object GetDeliveryLocationById(int Id)
        {
            return _deliveryLocationService.GetDeliveryLocationById(Id);
        }


        [HttpPost]
        [Route("GetBetweenTwoDatesDeliveryLocation")]
        [Authorize(Roles= "SuperUser,Admin")]
        public object GetBetweenTwoDatesDeliveryLocation(DTOInputDeliveryLocation model)
        {
            
            return _deliveryLocationService.GetBetweenTwoDatesDeliveryLocation(model);
        }


    }
}
