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
using NetTopologySuite.IO;
using System.IO;
using Newtonsoft.Json;
using NetTopologySuite.Geometries;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.ModelsForCheck;
using Microsoft.AspNetCore.SignalR;
using Pharmacy.API.Hubs;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BagController : Controller
    {
        //IBagService
        private readonly IBagService _bagService;
        private readonly IOrderService _orderService;
        private readonly IApplicationUserService _applicationUserService;
        private readonly IBranchService _branchService;
        private readonly IStockService _stockService;
        private readonly IHubContext<ChatHub> _chatHubContext;
        public BagController(IBagService bagService, IOrderService orderService, 
            IApplicationUserService applicationUserService, IBranchService branchService,
            IStockService stockService, IHubContext<ChatHub>  hubContext)
        {
            _bagService = bagService;
            _orderService = orderService;
            _applicationUserService = applicationUserService;
            _branchService = branchService;
            _stockService = stockService;
            _chatHubContext = hubContext;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Bag>), StatusCodes.Status200OK)]
        [Authorize(Roles = "SuperUser")]
        public List<Bag> GetAllBag()
        {
            return _bagService.GetAllBag();
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Bag>), StatusCodes.Status200OK)]
        [Authorize(Roles = "SuperUser")]
        [Route("GetBagsInWay")]
        public object GetBagsInWay()
        {
            return _bagService.GetBagsInWay();
        }

        [HttpGet]
        [Route("{Id}")]
        [ProducesResponseType(typeof(Bag), StatusCodes.Status200OK)]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public Bag GetBagById(int Id)
        {
            return _bagService.GetBagById(Id);
        }

        [HttpPost]
        [Authorize(Roles = "Customer")]
        public async Task<object> CreateBagByCustomerIdAsync(DTOInputBag bag)
        {

            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            bag.CustomerId = Convert.ToInt32(UserId);
            var CustomerAccount = await _applicationUserService.GetUserCustomerData(bag.CustomerId);

            Branch Branch = await _branchService.GetBranchByIdAsync(CustomerAccount.BranchId);

            if(Branch == null) { return BadRequest(); }
            var D = DateTime.Now;

            if ((Branch.StartWorkHours != null && Branch.EndWorkHours != null) 
                && (Branch.StartWorkHours > D.TimeOfDay || Branch.EndWorkHours.Value < D.TimeOfDay))
            { return StatusCode(404); }
            //return Branch.EndWorkHours.Value > D.TimeOfDay;
            //return new { Branch.StartWorkHours, Branch.EndWorkHours, D.TimeOfDay };

            var LastBag = await _bagService.GetMyLastBagByCustomer(bag.CustomerId);

            if(LastBag != null && (LastBag.Status == 1 || LastBag.Status == 0)) { return StatusCode(405); }

            var ListOfStatus = new List<CheckOrderInBag>();
            var Sum = 0;
            foreach(var O in bag.OrderList)
            {
                var AllStock = _stockService.GetStockByProductId(O.ProductId).OrderBy(a=>a.ExpiredDate);

                Stock stock = null;

                foreach(var S in AllStock)
                {
                    var CheckStock = _stockService.CoutOfProcutInStock(S.Id);

                    if(CheckStock.QuantityOfStock - CheckStock.QuantityOfOrder - O.Quantity - Sum >= 0)
                    {
                        stock = S;
                        Sum += O.Quantity;
                        break;
                    }
                }
                if(stock == null || !AllStock.Any()) { ListOfStatus.Add(new CheckOrderInBag { Order = O, Status = false }); }
                else
                {
                    O.StockId = stock.Id;
                    ListOfStatus.Add(new CheckOrderInBag { Order = O,Status = true});
                }
            }

            if (ListOfStatus.Any(a => !a.Status)) { return StatusCode(406); }

            _bagService.CreateBagByCustomerId(bag);
            
            var BagId = _bagService.GetLastBag(bag.CustomerId);

            foreach (var O in ListOfStatus)
            {
                O.Order.BagId = BagId;
                _orderService.CreateOrder(O.Order);
            }

            return Ok();
        }

        [HttpGet]
        [Route("Customer/{CustomerId}")]
        [ProducesResponseType(typeof(List<DTOOutBag>), StatusCodes.Status200OK)]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public List<DTOOutBag> GetBagByCustomerId(int CustomerId)
        {
            return _bagService.GetBagByCustomerId(CustomerId);
        }

        [HttpGet]
        [Route("BagDeatail/{Id}")]
        [ProducesResponseType(typeof(List<DTOOutputBagDeatails>), StatusCodes.Status200OK)]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public List<DTOOutputBagDeatails> GetBagDeatailsById(int Id)
        {
            return _bagService.GetBagDeatailsById(Id);
        }

        [HttpGet]
        [Route("GetMyLastBagByDelivery")]
        [Authorize(Roles = "Delivery")]
        public async Task<object> GetMyLastBagByDeliveryAsync()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var DeliveryId = Convert.ToInt32(UserId);

            //var Delivery = _applicationUserService.GetUserEmployeeData(DeliveryId);

            var R = await _bagService.GetMyLastBagByDelivery(DeliveryId);
            if(R == null) { return StatusCode(406); }

            var Delivery = await _applicationUserService.GetUserEmployeeData(DeliveryId);
            var Message = new
            {
                Bag = R,
                Delivery = new
                {
                    Delivery.Image,
                    Delivery.NickName,
                    Delivery.PhoneNumber,
                }
            };

            return Message;
        }

        [HttpGet]
        [Route("GetMyLastBagByCustomer")]
        [Authorize(Roles = "Customer")]
        public async Task<object> GetMyLastBagByCustomer()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var CustomerId = Convert.ToInt32(UserId);

            var R = await _bagService.GetMyLastBagByCustomer(CustomerId);
            if (R == null) { return StatusCode(406); }

            if(R.Status >= 1)
            {
                var Delivery = await _applicationUserService.GetUserEmployeeData(R.DeliveryId);
                if(Delivery != null)
                {
                    var Message = new
                    {
                        Bag = R,
                        Delivery = new
                        {
                            Delivery.BranchName,
                            Delivery.Image,
                            Delivery.NickName,
                            Delivery.PhoneNumber,
                        }
                    };
                    return Message;
                }else
                {
                    var Message = new
                    {
                        Bag = R,
                    };
                    return Message;
                }
            }else
            {
                if(R.Status == 0)
                {
                    var Message = new
                    {
                        Bag = R,
                    };
                    return Message;
                }
                else { return new { Bag = new { status = -1 } }; }

            }

        }





        //-------------------------------------------------------------------------Search By Customer
        [HttpPost]
        [Route("SearchOrdersByDateCustomer")]
        [Authorize(Roles = "Customer")]
        public async Task<object> SearchOrdersByDateCustomer(DTOInputBagSearchByCustomer model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.Id = Convert.ToInt32(UserId);

            try
            {
                Convert.ToDateTime(model.StartDate);
                Convert.ToDateTime(model.EndDate);
                var R= await _bagService.SearchOrdersByDateCustomer(model);
                return R.Select(a => new {
                a.Id,
                Status = a.OrderLog.OrderBy(a => a.OrderLogId).Last().Status,
                Delivery = new 
                {
                    DeliveryNickName = a.OrderLog.OrderBy(a=>a.OrderLogId).Last().DeliveryNickName,
                    DeliveryImage = a.OrderLog.OrderBy(a => a.OrderLogId).Last().DeliveryImage,
                    DeliveryPhoneNumber = a.OrderLog.OrderBy(a => a.OrderLogId).Last().DeliveryPhoneNumber,
                },
                a.CurrentDate,
                a.TotalPrice,
                a.OrderLog,
                a.Product,
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        //-------------------------------------------------------------------------Search By Admin
        [HttpPost]
        [Route("SearchOrdersByDateAdmin")]
        [Authorize(Roles = "Admin")]
        public async Task<object> SearchOrdersByDateAdmin(DTOInputBagSearchByCustomer model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.Id = Convert.ToInt32(UserId);

            var Employee = await _applicationUserService.GetUserEmployeeData(model.Id);

            model.Id = Employee.BranchId;
            try
            {
                Convert.ToDateTime(model.StartDate);
                Convert.ToDateTime(model.EndDate);

                var R = await _bagService.SearchOrdersByDateAdmin(model);
                return R.Select(a => new {
                    a.Id,
                    Status = a.OrderLog.OrderBy(a => a.OrderLogId).Last().Status,
                    a.CustomerImage,
                    a.CustomerNickName,
                    a.CustomerPhoneNumber,
                    a.Latitude,
                    a.Longitude,
                    Delivery = new
                    {
                        DeliveryNickName = a.OrderLog.OrderBy(a => a.OrderLogId).Last().DeliveryNickName,
                        DeliveryImage = a.OrderLog.OrderBy(a => a.OrderLogId).Last().DeliveryImage,
                        DeliveryPhoneNumber = a.OrderLog.OrderBy(a => a.OrderLogId).Last().DeliveryPhoneNumber,
                    },
                    a.CurrentDate,
                    a.TotalPrice,
                    a.OrderLog,
                    a.Product,
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        //-------------------------------------------------------------------------Search By Delivery
        [HttpPost]
        [Route("SearchOrdersByDateDelivery")]
        [Authorize(Roles = "Delivery")]
        public async Task<object> SearchOrdersByDateDelivery(DTOInputBagSearchByCustomer model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.Id = Convert.ToInt32(UserId);

            try
            {
                Convert.ToDateTime(model.StartDate);
                Convert.ToDateTime(model.EndDate);

                var R = await _bagService.SearchOrdersByDateDelivery(model);
                return R.Select(a => new {
                    a.Id,
                    Status = a.OrderLog.OrderBy(a => a.OrderLogId).Last().Status,
                    a.CustomerImage,
                    a.CustomerNickName,
                    a.CustomerPhoneNumber,
                    a.Latitude,
                    a.Longitude,
                    a.CurrentDate,
                    a.TotalPrice,
                    a.OrderLog,
                    a.Product,
                });
            }
            catch
            {
                return BadRequest();
            }
        }


        //-------------------------------------------------------------------------Active Deliveries
        //SuperUser
        [HttpPost]
        [Route("GetActiveDeliveries")]
        [Authorize(Roles = "SuperUser")]
        public async Task<object> GetActiveDeliveries(DTOInputBagGetActiveDeliveries model)
        {
            return await _bagService.GetActiveDeliveries(model);
        }
        //Admin
        [HttpGet]
        [Route("GetActiveDeliveriesAdmin")]
        [Authorize(Roles = "Admin")]
        public async Task<object> GetActiveDeliveriesAdmin()
        {
            DTOInputBagGetActiveDeliveries model = new DTOInputBagGetActiveDeliveries();
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            var Employee = await _applicationUserService.GetUserEmployeeData(Id);
            model.Id = Employee.BranchId;

            return await _bagService.GetActiveDeliveries(model);
        }
    }
}
