using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        readonly ICategoryService _categoryService;
        private IHostingEnvironment _environment;
        public CategoryController(ICategoryService categoryService, IHostingEnvironment environment)
        {
            _categoryService = categoryService;
            _environment = environment;
        }

     
        [HttpPost]
        [Route("AddCategory")]
        [Authorize(Roles = "SuperUser")]
        public object AddCategory(IFormFile IMG,string Name,string Description )
        {
            if(IMG == null || Name == "" || Name == null || Description == "" || Description == null) { return BadRequest(); }
            if (!Directory.Exists(_environment.WebRootPath + "/assets/Category/" + Name + "/"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "/assets/Category/" + Name + "/");
            }

            using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "/assets/Category/" + Name + "/" + IMG.FileName))
            {
                DTOInputCategory model = new DTOInputCategory()
                {
                    Name = Name,
                    Description = Description,
                    Image = "assets/Category/" + Name + "/" + IMG.FileName
                };
                IMG.CopyTo(filestream);
                _categoryService.AddCategory(model);
                return Ok();
            }
        }

        [HttpPut]
        [Route("UpdateCategory")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateCategory(IFormFile IMG,int Id , string Name, string Description)
        {

            
            if(IMG != null)
            {
                var OldCategory = _categoryService.GetAll().FirstOrDefault(a => a.Id == Id);

                if (!Directory.Exists(_environment.WebRootPath + "/assets/Category/" + Name + "/"))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "/assets/Category/" + Name + "/");
                }else
                {
                    System.IO.File.Delete(_environment.WebRootPath + "/" + OldCategory.Image);
                }
                using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "/assets/Category/" + Name + "/" + IMG.FileName))
                {

                    DTOInputCategory model = new DTOInputCategory()
                    {
                        Id = Id,
                        Name = Name,
                        Description = Description,
                        Image = "assets/Category/" + Name + "/" + IMG.FileName
                    };
                    IMG.CopyTo(filestream);
                    _categoryService.UpdateCategory(model);
                    return Ok();
                }
            }else
            {
                DTOInputCategory model = new DTOInputCategory()
                {
                    Id = Id,
                    Name = Name,
                    Description = Description,
                    Image = ""
                };
                _categoryService.UpdateCategory(model);
                return Ok();
            }
        }

        [HttpDelete]
        [Route("DeleteCategory/{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object DeleteCategory(int Id)
        {
            var OldCategory = _categoryService.GetAll().FirstOrDefault(a => a.Id == Id);

            System.IO.File.Delete(_environment.WebRootPath + "/" + OldCategory.Image);
            var R = _categoryService.DeleteCategory(Id);
            if (R == 2) { return BadRequest(); }
            return Ok();
        }


        [HttpGet]
        [Route("GetAll")]
        [AllowAnonymous]
        public List<Category> GetAll()
        {
            return _categoryService.GetAll();
        }


    }
}
