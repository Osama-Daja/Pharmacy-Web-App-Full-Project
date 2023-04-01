using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUController : Controller
    {
        private readonly IContactUService _contactUService;
        public ContactUController(IContactUService contactUService)
        {
            _contactUService = contactUService;
        }

        [HttpGet]
        [Authorize(Roles = "SuperUser,Admin")]
        public object GetAllContactUs()
        {
            return _contactUService.GetAllContactUs();
        }

        [HttpGet]
        [Route("{Id}")]
        [Authorize(Roles = "SuperUser,Admin")]
        public ContactU GetContactUsById(int Id)
        {
            return _contactUService.GetContactUsById(Id);
        }

        [HttpPost]
        [AllowAnonymous]
        public object CreateContactUs(DTOInputContactU contactU)
        {
            _contactUService.CreateContactUs(contactU);
            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "SuperUser,Admin")]
        public object UpdateContactUs(DTOInputContactU contactU)
        {
            _contactUService.UpdateContactUs(contactU);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteContactUs/{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object DeleteContactUs(int Id)
        {
            _contactUService.DeleteContactUs(Id);
            return Ok();
        }


        [HttpPost]
        [Route("SearchContactUsByEmail")]
        [Authorize(Roles = "SuperUser")]
        public object SearchContactUsByEmail(DTOInputInputContactusSearchByEmail model)
        {
            return _contactUService.SearchContactUsByEmail(model);
        }

        [HttpPost]
        [Route("SearchContactUsByPhoneNumber")]
        [Authorize(Roles = "SuperUser")]
        public object SearchContactUsByPhoneNumber(DTOInputContactusByPhoneNumber model)
        {
            return _contactUService.SearchContactUsByPhoneNumber(model);
        }
    }
}
