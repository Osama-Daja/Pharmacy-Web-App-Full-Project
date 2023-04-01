using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOInput.Procedure;
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
using Pharmacy.Core.Data.Models;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : Controller
    {
        readonly IApplicationUserService _applicationUserService;
        readonly IBranchService _branchService;
        public ApplicationUserController(IApplicationUserService serviceApplicationUser, IBranchService branchService)
        {
            _applicationUserService = serviceApplicationUser;
            _branchService = branchService;
        }

        //---------------------------------------------------------------------------Customer
        [HttpPost]
        [Route("RegisterCustomer")]
        [AllowAnonymous]
        public async Task<object> RegisterCustomerAsync(DTOInputCustomer model)
        {
            Branch Branch = null;
            foreach (var G in await _branchService.GetFullBranch())
            {
                Polygon Polygon;

                var serializera = GeoJsonSerializer.Create();
                using (var stringReader = new StringReader(G.Geometry.ToString()))
                using (var jsonReader = new JsonTextReader(stringReader))
                {
                    Polygon = serializera.Deserialize<Polygon>(jsonReader);
                }

                if (new Point(x: Convert.ToDouble(model.Latitude), y: Convert.ToDouble(model.Longitude)).Within(Polygon))
                {
                    Branch = G;
                }
            }

            if (Branch == null) { return StatusCode(406); }

            model.BranchId = Branch.Id;
            var R = _applicationUserService.RegisterCustomer(model);

            if(R == 0) { Response.StatusCode = 409; return "UserName Or Email Is Used"; }
            return Ok();
        }

        [HttpGet]
        [Route("GetUserCustomerData")]
        [Authorize(Roles = "Customer")]
        public object GetUserCustomerData()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            return _applicationUserService.GetUserCustomerData(Id);
        }

        [HttpPut]
        [Route("UpdateCustomer")]
        [Authorize(Roles = "Customer")]
        public object UpdateCustomer(DTOInputUpdeteCustomer model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.Id = Convert.ToInt32(UserId);

            _applicationUserService.UpdateCustomer(model);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteCustomer/{Id}")]
        [Authorize(Roles = "Admin,SuperUser")]
        public object DeleteCustomer(int Id)
        {
            _applicationUserService.DeleteCustomer(Id);

            return Ok();
        }
        [HttpPut]
        [Route("UpdateMyLocation")]
        [Authorize(Roles = "Customer")]
        public async Task<object> UpdateMyLocationAsync(DTOInputUpdateMyLocation model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.Id = Convert.ToInt32(UserId);

            Branch Branch = null;
            foreach (var G in await _branchService.GetFullBranch())
            {
                Polygon Polygon;

                var serializera = GeoJsonSerializer.Create();
                using (var stringReader = new StringReader(G.Geometry.ToString()))
                using (var jsonReader = new JsonTextReader(stringReader))
                {
                    Polygon = serializera.Deserialize<Polygon>(jsonReader);
                }

                if (new Point(x: Convert.ToDouble(model.Latitude), y: Convert.ToDouble(model.Longitude)).Within(Polygon))
                {
                    Branch = G;
                }
            }

            if (Branch == null) { return StatusCode(406); }

            model.BranchId = Branch.Id;
            _applicationUserService.UpdateMyLocation(model);

            return Ok();
        }


        //Search
        [HttpPost]
        [Route("SearchCustomerByUserName")]
        [Authorize(Roles = "SuperUser")]
        public object SearchCustomerByUserName(DTOInputCustomerSearchByUserName model)
        {
            return _applicationUserService.SearchCustomerByUserName(model);
        }
        [HttpPost]
        [Route("SearchCustomerByPhoneNumber")]
        [Authorize(Roles = "SuperUser")]
        public object SearchCustomerByPhoneNumber(DTOInputCustomerSearchByPhoneNumber model)
        {
            return _applicationUserService.SearchCustomerByPhoneNumber(model);
        }

        [HttpPost]
        [Route("SearchCustomerByEmail")]
        [Authorize(Roles = "SuperUser")]
        public object SearchCustomerByEmail(DTOInputCustomerSearchByEmail model)
        {
            return _applicationUserService.SearchCustomerByEmail(model);
        }
        [HttpPost]
        [Route("SearchCustomerByBranch")]
        [Authorize(Roles = "SuperUser")]
        public object SearchCustomerByBranch(DTOInputCustomerSearchByBranch model)
        {
            return _applicationUserService.SearchCustomerByBranch(model);
        }
        [HttpPost]
        [Route("SearchCustomerByBirthDay")]
        [Authorize(Roles = "SuperUser")]
        public object SearchCustomerByBirthDay(DTOInputCustomerSearchByBirthDay model)
        {
            return _applicationUserService.SearchCustomerByBirthDay(model);
        }


        //---------------------------------------------------------------------------SuperUser
        [HttpPut]
        [Route("UpdateSuperUser")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateSuperUser(DTOInputUpdeteEmployee model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.Id = Convert.ToInt32(UserId);

            _applicationUserService.UpdateSuperUser(model);

            return Ok();
        }






        //---------------------------------------------------------------------------Admin
        [HttpPost]
        [Route("RegisterAdmin")]
        [Authorize(Roles ="SuperUser")]
        public object RegisterAdmin(DTOInputEmployee model)
        {
            var R = _applicationUserService.RegisterAdmin(model);

            if (R == 0) { Response.StatusCode = 409; return "UserName Or Email Is Used"; }

            return Ok();
        }

        [HttpPut]
        [Route("UpdateAdmin")]
        [Authorize(Roles = "Admin")]
        public object UpdateAdmin(DTOInputUpdeteEmployee model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.Id = Convert.ToInt32(UserId);

            _applicationUserService.UpdateAdmin(model);

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteAdmin/{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object DeleteAdmin(int Id)
        {
             _applicationUserService.DeleteAdmin(Id);

            return Ok();
        }
        //Search
        [HttpPost]
        [Route("SearchAdminByPhoneNumber")]
        [Authorize(Roles = "SuperUser")]
        public object SearchAdminByPhoneNumber(DTOInputSearchEmployeeByPhoneNumber model)
        {
            return _applicationUserService.SearchAdminByPhoneNumber(model);
        }
        [HttpPost]
        [Route("SearchAdminByBranch")]
        [Authorize(Roles = "SuperUser")]
        public object SearchAdminByBranch(DTOInputSearchEmployeeByBranch model)
        {
            return _applicationUserService.SearchAdminByBranch(model);
        }



        //---------------------------------------------------------------------------Delivery
        [HttpPost]
        [Route("RegisterDelivery")]
        [Authorize(Roles = "Admin")]
        public async Task<object> RegisterDeliveryAsync(DTOInputEmployee model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Admin = await _applicationUserService.GetUserEmployeeData(Convert.ToInt32(UserId));
            model.BranchId = Admin.BranchId;

            var R = _applicationUserService.RegisterDelivery(model);

            if (R == 0) { Response.StatusCode = 409; return "UserName Or Email Is Used"; }

            return Ok();
        }

        [HttpPut]
        [Route("UpdateDelivery")]
        [Authorize(Roles = "Delivery")]
        public object UpdateDelivery(DTOInputUpdeteEmployee model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.Id = Convert.ToInt32(UserId);

            _applicationUserService.UpdateDelivery(model);

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteDelivery/{Id}")]
        [Authorize(Roles = "SuperUser,Admin")]
        public object DeleteDelivery(int Id)
        {
            _applicationUserService.DeleteDelivery(Id);

            return Ok();
        }

        [HttpGet]
        [Route("GetDeliveryByBranchId")]
        [Authorize(Roles = "Admin")]
        public async Task<object> GetDeliveryByBranchIdAsync()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            var Admin = await _applicationUserService.GetUserEmployeeData(Id);

            return _applicationUserService.GetDeliveryByBranchId(Admin.BranchId);
        }
        //Search
        [HttpPost]
        [Route("SearchDeliveryByPhoneNumber")]
        [Authorize(Roles = "SuperUser")]
        public object SearchDeliveryByPhoneNumber(DTOInputSearchEmployeeByPhoneNumber model)
        {
            return _applicationUserService.SearchDeliveryByPhoneNumber(model);
        }
        [HttpPost]
        [Route("SearchDeliveryByBranch")]
        [Authorize(Roles = "SuperUser")]
        public object SearchDeliveryByBranch(DTOInputSearchEmployeeByBranch model)
        {
            return _applicationUserService.SearchDeliveryByBranch(model);
        }


        //---------------------------------------------------------------------------Employee
        [HttpGet]
        [Route("GetUserEmployeeData")]
        [Authorize(Roles = "SuperUser,Admin,Delivery")]
        public object GetUserEmployeeData()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            return _applicationUserService.GetUserEmployeeData(Id);
        }

        [HttpGet]
        [Route("GetInactiveDeliveries/{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object GetInactiveDeliveries(int Id)
        {
            return _applicationUserService.GetInactiveDeliveries(Id);
        }

        [HttpGet]
        [Route("GetInactiveDeliveriesByMyBranch")]
        [Authorize(Roles = "Admin")]
        public async Task<object> GetInactiveDeliveriesByMyBranchAsync()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            var Employee = await _applicationUserService.GetUserEmployeeData(Id);

            return await _applicationUserService.GetInactiveDeliveries(Employee.BranchId);
        }

        //---------------------------------------------------------------------------User
        [HttpPut]
        [Route("EditUser")]
        [Authorize(Roles ="SuperUser,Admin")]
        public async Task<object> EditUserAsync(DTOInputUser model)
        {
            var Delivery = await _applicationUserService.GetUserEmployeeData(model.Id);

            if(Delivery != null) { model.BranchId = Delivery.BranchId; }
            var R = _applicationUserService.EditUser(model);

            if (R == 0) { Response.StatusCode = 409; return "UserName Or Email Is Used"; }

            return Ok();
        }

        [HttpGet]
        [Route("GetUserById/{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object GetUserById(int Id)
        {
            var R = _applicationUserService.GetUserById(Id);

            if (R == null) { Response.StatusCode = 404; return "Account Is Not Found."; }

            return R;
        }
    }
}
