using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOInput.Procedure;
using Pharmacy.Core.Data.DTOOutput.Procedure;
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
    public class TestimonialController : Controller
    {
        readonly ITestimonialService _testimonialService;
        public TestimonialController(ITestimonialService testimonialService)
        {
            _testimonialService = testimonialService;
        }
     
        [HttpPost]
        [Route("AddTestimonial")]
        [Authorize(Roles = "Customer")]
        public object AddTestimonial(DTOInputTestamonial model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            model.CustomerId = Convert.ToInt32(UserId);
            model.Date = DateTime.Now;
            model.Status = false;

            var R = _testimonialService.AddTestimonial(model);
            return Ok();
        }

        [HttpPut]
        [Route("UpdateTestimonial")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateTestimonial(DTOInputTestamonial model)
        {
            model.Date = DateTime.Now;
            _testimonialService.UpdateTestimonial(model);

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteTestimonial/{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object DeleteTestimonial(int Id)
        {
            var R =  _testimonialService.DeleteTestimonial(Id);
            if(R == 2) { return StatusCode(406); }

            return Ok();
        }


        [HttpGet]
        [Route("GetAll")]
        [Authorize(Roles= "SuperUser")]
        public List<Testimonial> GetAll()
        {

            return _testimonialService.GetAll();
        }


        [HttpGet]
        [Route("GetTrueTestimonial")]
        [AllowAnonymous]
        public List<DTOOutTestimonialGetTrue> GetTrueTestimonial()
        {

            return _testimonialService.GetTrueTestimonial();
        }


        [HttpPost]
        [Route("SearchTestimonialSearchByText")]
        [Authorize(Roles = "SuperUser")]
        public object TestimonialSearchByText(DTOInputTestimonialSearchByText model)
        {
            return _testimonialService.TestimonialSearchByText(model);
        }


        [HttpPost]
        [Route("SearchByDate")]
        [Authorize(Roles = "SuperUser")]
        public object SearchByDate(DTOInputTestimonialSearchByDate model)
        {
            return _testimonialService.SearchByDate(model);
        }


        [HttpPut]
        [Route("UpdateTestimonialBlockStatus")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateTestimonialBlockStatus(DTOInputTestimonialBlockStatus model)
        {
            model.Status = !model.Status;
            _testimonialService.UpdateTestimonialBlockStatus(model);
            return Ok();
        }

    }
}
