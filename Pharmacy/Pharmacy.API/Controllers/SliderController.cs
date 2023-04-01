using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SliderController : Controller
    {
        private readonly ISliderService _sliderService;
        private IHostingEnvironment _environment;
        public SliderController(ISliderService sliderService, IHostingEnvironment environment)
        {
            _sliderService = sliderService;
            _environment = environment;
        }

        [HttpGet]
        [Route("GetAllSlider")]
        [Authorize(Roles = "SuperUser")]
        public List<DTOOutputSlider> GetAllSlider()
        {
            return _sliderService.GetAllSlider();
        }

        [HttpGet]
        [Route("GetTopSlider")]

        public List<DTOOutputSlider> GetTopSlider()
        {
            return _sliderService.GetTopSlider();
        }

        [HttpGet]
        [Route("{Id}")]
        public DTOOutputSlider GetSliderById(int Id)
        {
            return _sliderService.GetSliderById(Id);
        }

        [HttpPost]
        [Route("CreateSlider")]
        [Authorize(Roles = "SuperUser")]
        public object CreateSlider(IFormFile SliderImg, string TitleText, string BriefText)
        {
            if (SliderImg == null || TitleText == "" || TitleText == null || BriefText == "" || BriefText == null)
            {
                return BadRequest();
            }

            if (!Directory.Exists(_environment.WebRootPath + "/assets/Slider/"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "/assets/Slider/");
            }

            using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "/assets/Slider/" + SliderImg.FileName))
            {
                DTOInputSlider slider = new DTOInputSlider()
                {
                    SliderImg = "assets/Slider/" + SliderImg.FileName,
                    BriefText = BriefText,
                    TitleText = TitleText
                };
                SliderImg.CopyTo(filestream);
                _sliderService.CreateSlider(slider);
                return Ok();
                
            }
        }


        [HttpPut]
        [Route("UpdateSlider")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateSlider(int Id, IFormFile SliderImg, string TitleText, string BriefText)
        {
            if(SliderImg != null)
            {
                var oldSlider = _sliderService.GetSliderById(Id);
                if (!Directory.Exists(_environment.WebRootPath + "/assets/Slider/"))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "/assets/Slider/");
                }
                else
                {
                    System.IO.File.Delete(_environment.WebRootPath + "/" + oldSlider.SliderImg);
                }

                using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "/assets/Slider/" + SliderImg.FileName))
                {
                    DTOInputSlider slider = new DTOInputSlider()
                    {
                        Id = Id,
                        SliderImg = "assets/Slider/" + SliderImg.FileName,
                        BriefText = BriefText,
                        TitleText = TitleText
                    };
                    SliderImg.CopyTo(filestream);
                    _sliderService.UpdateSlider(slider);
                    return Ok();

                }
            }
            else
            {
                var oldSlider = _sliderService.GetSliderById(Id);
                DTOInputSlider slider = new DTOInputSlider()
                {
                    Id = Id,
                    SliderImg = oldSlider.SliderImg,
                    BriefText = BriefText,
                    TitleText = TitleText
                };
                _sliderService.UpdateSlider(slider);
                return Ok();
            }            
        }

        [HttpDelete]
        [Route("{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object DeleteSlider(int Id)
        {
            var oldSlider = _sliderService.GetSliderById(Id);            
            System.IO.File.Delete(_environment.WebRootPath + "/" + oldSlider.SliderImg);
            var result = _sliderService.DeleteSlider(Id);
            if (result == 2) { return StatusCode(406); }
            return Ok();
        }




    }
}
