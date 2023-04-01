using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.IO;
using Newtonsoft.Json;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IService;
using Pharmacy.Encrypt;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using NetTopologySuite.Geometries;
using Pharmacy.API.Hubs;
using Microsoft.AspNetCore.SignalR;
using Pharmacy.Core.Data.DTOOutput.Chat;
using static Pharmacy.API.Hubs.ChatHub;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : Controller
    {
        IMessageService _messageService;
        IBranchService _branchService;
        IApplicationUserService _applicationUserService;
        private IHubContext<ChatHub> _chatHubContext;
        public MessageController(IMessageService messageService, IBranchService branchService, IApplicationUserService applicationUserService, IHubContext<ChatHub> hubContext)
        {
            _messageService = messageService;
            _branchService = branchService;
            _applicationUserService = applicationUserService;
            _chatHubContext = hubContext;
        }

        [HttpPost]
        [Route("InsertMyMessage")]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public async Task<object> InsertMyMessageAsync(DTOInputMessage model)
        {

            var Con = ConnectedUser.Users.Where(a => a.Id == model.ToId);
            if (!Con.Any())
            {
                string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
                model.FromId = Convert.ToInt32(UserId);
                model.CurrentDate = DateTime.Now;

                _messageService.InsertMyMessage(model);
            }
            else
            {
                string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
                var FromId = Convert.ToInt32(UserId);
                var user = _applicationUserService.GetUserById(FromId);
                var CurrentDate = DateTime.Now;

                var Message = new
                {
                    userId = FromId,
                    user.Email,
                    user.Image,
                    user.PhoneNumber,
                    user.NickName,
                    FromId = FromId,
                    CurrentDate = CurrentDate,
                    Text = model.Text,
                };
                await _chatHubContext.Clients.Clients(Con.OrderBy(a=>a.CurrentDate).Last().IdConnection).SendAsync("sendMessageToUser", Message);
            }

            return Ok();
        }

        [HttpGet]
        [Route("GetMyMessage")]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public async Task<object> GetMyMessageAsync()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            return await _messageService.GetMyMessage(Id);
        }

        [HttpGet]
        [Route("GetEmployeesInBranch")]
        [Authorize(Roles = "Customer")]
        public async Task<object> GetAdminsAsync()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            var Customer = await _applicationUserService.GetUserCustomerData(Id);

            return _messageService.GetEmployeesInBranch(Customer.BranchId).Select(a=>new {
                Id = a.Id,
                Image = a.Image,
                NickName = a.NickName,
                Role = a.RoleId == 2 ? "Admin" : "Delivery"
            });
        }

        [HttpGet]
        [Route("GetConnectionUser")]
        public object GetConnectionUser()
        {
            return ConnectedUser.Users;
        }
    }
}
