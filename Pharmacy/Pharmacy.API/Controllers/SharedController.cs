using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.Core.Data.DTOInput.Procedure;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.IService;
using Pharmacy.Encrypt;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SharedController : Controller
    {
        readonly ISharedService _sharedService;
        readonly IApplicationUserService _applicationUserService;
        private IHostingEnvironment _environment;

        public SharedController(ISharedService serviceShared,IApplicationUserService serviceApplicationUser, IHostingEnvironment environment)
        {
            _sharedService = serviceShared;
            _applicationUserService = serviceApplicationUser;
            _environment = environment;
        }

        [HttpPost]
        [Route("LogIn")]
        [AllowAnonymous]
        public object LogIn(LogIn model)
        {
            var R = _sharedService.logIn(model);

            if (R == null) { Response.StatusCode = 404; return "UserName Or Password Is Incorrect."; }

            if(R == "Block") { Response.StatusCode = 403; return "Account IS Blocked."; }

            return new { Token = R };
        }

        [HttpGet]
        [Route("GetMyAccountData")]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public object GetUserById()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);
            var R = _applicationUserService.GetUserById(Id);

            return R;
        }

        [HttpPut]
        [Route("UpdateImageUser")]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public object UpdateImageUser(IFormFile IMG)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            var MyAccount = _applicationUserService.GetUserById(Id);

                if (!Directory.Exists(_environment.WebRootPath + "/assets/Data/" + MyAccount.Id + "/IMG/ImageUser/"))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "/assets/Data/" + MyAccount.Id + "/IMG/ImageUser/");
                }
                else
                {
                    System.IO.File.Delete(_environment.WebRootPath + "/"+ MyAccount.Image);
                }

            using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "/assets/Data/" + MyAccount.Id + "/IMG/ImageUser/" + IMG.FileName))
            {
                DTOInputUpdateImageUser dTOInputUpdateImageUser = new DTOInputUpdateImageUser() 
                { Id = MyAccount.Id, Image = "assets/Data/" + MyAccount.Id + "/IMG/ImageUser/" + IMG.FileName };
                _sharedService.UpdateImageUser(dTOInputUpdateImageUser);
                IMG.CopyTo(filestream);
                return Ok();
            }
        }

        [HttpPut]
        [Route("UpdateUserNameUser")]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public object UpdateUserNameUser(DTOInputUpdateUserNameUser model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            model.Id = Id;
            _sharedService.UpdateUserNameUser(model);
            return Ok();
        }

        [HttpPut]
        [Route("UpdateEmailUser")]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public object UpdateEmailUser(DTOInputUpdateEmailUser model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            model.Id = Id;
            _sharedService.UpdateEmailUser(model);
            return Ok();
        }

        [HttpPut]
        [Route("UpdatePasswordUser")]
        [Authorize(Roles = "SuperUser,Admin,Delivery,Customer")]
        public object UpdatePasswordUser(DTOInputUpdatePasswordUser model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            model.Password = AesOperation.EncryptString(model.Password);
            model.Id = Id;
            _sharedService.UpdatePasswordUser(model);
            return Ok();
        }

        [HttpPut]
        [Route("EditPasswordUser")]
        [Authorize(Roles = "SuperUser")]
        public object EditPasswordUser(DTOInputUpdatePasswordUser model)
        {
            model.Password = AesOperation.EncryptString(model.Password);
            _sharedService.UpdatePasswordUser(model);
            return Ok();
        }

        [HttpGet]
        [Route("GetConfirmCodePassword")]
        public object GetConfirmCodePassword()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);
            var MyAccount = _applicationUserService.GetUserById(Id);

            var Code = new Random().Next(10000, 99999).ToString();
            MailMessage mailMessage = new MailMessage("t.u.world1996worldweb39@gmail.com", MyAccount.Email);

            mailMessage.Body = "Your Confirm Code : " + Code;

            mailMessage.Subject = "Confirm Code To Change Password.";

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = "t.u.world1996worldweb39@gmail.com",
                Password = "Osama1996"
            };

            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);

            return Code;
        }

        [HttpPost]
        [Route("GetConfirmCode")]
        public object GetConfirmCode(DTOInputConfirmCode model)
        {

            var Code = new Random().Next(10000, 99999).ToString();
            MailMessage mailMessage = new MailMessage("t.u.world1996worldweb39@gmail.com", model.Email);

            mailMessage.Body = "Your Confirm Code : " + Code;

            mailMessage.Subject = "Confirm Code To Change Password.";

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.Credentials = new System.Net.NetworkCredential()
            {
                UserName = "t.u.world1996worldweb39@gmail.com",
                Password = "Osama1996"
            };

            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);

            return Code;
        }

        [HttpPut]
        [Route("UpdateSalaryUser")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateSalaryUser(DTOInputUpdateSalaryUser model)
        {

            if (model.Salary == 0 || model.Id == 0)
            {
                return BadRequest();
            }

            _sharedService.UpdateSalaryUser(model);
            return Ok();
        }

        [HttpPut]
        [Route("UpdateBlockUserForAdmin")]
        [Authorize(Roles = "Admin")]
        public object UpdateBlockUserForAdmin(DTOInputUpdateBlockUserForAdmin model)
        {
            model.Block = !model.Block;
            var R = _sharedService.UpdateBlockUserForAdmin(model);

            if (R == 2) { return StatusCode(406); }
            return Ok();
        }

        [HttpPut]
        [Route("UpdateBlockUserForSuperUser")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateBlockUserForSuperUser(DTOInputUpdateBlockUserForSuperUser model)
        {
            model.Block = !model.Block;
            var R = _sharedService.UpdateBlockUserForSuperUser(model);

            if(R == 2) { return StatusCode(406); }
            return Ok();
        }
    }
}
