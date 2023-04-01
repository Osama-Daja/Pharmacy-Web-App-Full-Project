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
    public class ReportController : Controller
    {
        readonly IReportService _reportService;
        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

     
        [HttpPost]
        [Route("AddReport")]
        [Authorize(Roles = "Customer")]
        public object AddReport(DTOInputReport model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.CustomerId = Convert.ToInt32(UserId);
            model.Date = DateTime.Now;  
            

            var R = _reportService.AddReport(model);
            if(R == 2) { return BadRequest(); }
            return Ok();
        }

        [HttpPost]
        [Route("UpdateReport")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateReport(DTOInputReport model)
        {
            model.Date = DateTime.Now;
            _reportService.UpdateReport(model);

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteReport/{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object DeleteReport(int Id)
        {
            _reportService.DeleteReport(Id);

            return Ok();
        }


        [HttpGet]
        [Route("GetAll")]
        [Authorize(Roles= "SuperUser")]
        public List<Report> GetAll()
        {

            return _reportService.GetAll();
        }

        [HttpPost]
        [Route("SearchReportByDate")]
        [Authorize(Roles = "SuperUser")]
        public object  SearchReportByDate(DTOInputReportDeatails report)
        {
            return _reportService.SearchReportByDate(report);
        }

        [HttpPost]
        [Route("GetReportDeatailsByReportId/{ReportId}")]
        [Authorize(Roles = "SuperUser")]
        public object GetReportDeatailsByReportId(int ReportId)
        {
            return _reportService.GetReportDeatailsByReportId(ReportId);
        }
    }
}
