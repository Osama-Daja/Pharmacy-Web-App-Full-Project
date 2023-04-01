using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyOfOriginController : Controller
    {
        readonly ICompanyOfOriginService _companyOfOriginService;
        public CompanyOfOriginController(ICompanyOfOriginService companyOfOriginService)
        {
            _companyOfOriginService = companyOfOriginService;
        }

     
        [HttpPost]
        [Route("AddCompanyOfOrigin")]
        [Authorize(Roles = "SuperUser")]
        public object AddCompanyOfOrigin(DTOInputCompanyOfOrigin model)
        {
           
            var R = _companyOfOriginService.AddCompanyOfOrigin(model);
            return Ok();
        }

        [HttpPut]
        [Route("UpdateCompanyOfOrigin")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateCompanyOfOrigin(DTOInputCompanyOfOriginUpdate model)
        {
            _companyOfOriginService.UpdateCompanyOfOrigin(model);

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteCompanyOfOrigin/{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object DeleteCompanyOfOrigin(int Id)
        {
            _companyOfOriginService.DeleteCompanyOfOrigin(Id);

            return Ok();
        }

        [HttpGet]
        [Route("GetAll")]
        [Authorize(Roles= "SuperUser,Admin,Customer,Delivery")]
        public List<CompanyOfOrigin> GetAll()
        {

            return _companyOfOriginService.GetAll();
        }


    }
}
