using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

namespace Pharmacy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IApplicationUserService _applicationUserService;
        private IHostingEnvironment _environment;

        public ProductController(IProductService productService, IApplicationUserService applicationUserService, IHostingEnvironment environment)
        {
            _productService = productService;
            _applicationUserService = applicationUserService;
            _environment = environment;
        }

        [HttpGet]
        [Authorize(Roles = "SuperUser,Admin")]
        public List<Product> GetAllProduct()
        {
            return _productService.GetAllProduct();
        }

        [HttpGet]
        [Route("{Id}")]
        [Authorize(Roles = "SuperUser,Admin")]
        public Product GetProductById(int Id)
        {
            return _productService.GetProductById(Id);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<object> CreateProductAsync(IFormFile IMGProduct, string Name,int CompanyOfOriginId,double Price,string Description,int CategoryId)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);
            var MyAccount = await _applicationUserService.GetUserEmployeeData(Id);

            DTOInputProduct product = new DTOInputProduct()
            {
                Name = Name,
                CompanyOfOriginId = CompanyOfOriginId,
                Price = Price,
                Description = Description,
                CategoryId = CategoryId,
                Status = false
            };

            if (!Directory.Exists(_environment.WebRootPath + "/assets/Branch/" + MyAccount.BranchId + "/IMG/Product/" + product.Name + "/"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "/assets/Branch/" + MyAccount.BranchId + "/IMG/Product/" + product.Name + "/");
            }

            using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "/assets/Branch/" + MyAccount.BranchId + "/IMG/Product/" + product.Name + "/" + IMGProduct.FileName))
            {
                IMGProduct.CopyTo(filestream);

                product.Image = "assets/Branch/" + MyAccount.BranchId + "/IMG/Product/" + product.Name + "/" + IMGProduct.FileName;
                product.BranchId = MyAccount.BranchId;
                product.Status = false;
                _productService.CreateProduct(product);
                return Ok();
            }
        }

        [HttpPut]
        [Authorize(Roles = "SuperUser,Admin")]
        public object UpdateProduct(DTOInputProductUpdate product)
        {
            var R =_productService.UpdateProduct(product);

            switch (R)
            {
                case 0: { return NotFound(); }
                case 1: { return Ok(); }
                case 2: { return StatusCode(406); }
            }
            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("UpdateProductImage/{Id}")]
        public object UpdateProductImage(IFormFile IMGProduct,int Id)
        {
            var Product = _productService.GetProductById(Id);

            DTOInputProductUpdateImage product = new DTOInputProductUpdateImage()
            {
                Id = Product.Id
            };

            if (!Directory.Exists(_environment.WebRootPath + "/assets/Branch/" + Product.BranchId + "/IMG/Product/" + Product.Name + "/"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "/assets/Branch/" + Product.BranchId + "/IMG/Product/" + Product.Name + "/");
            }
            else
            {
                System.IO.File.Delete(_environment.WebRootPath + "/" + Product.Image);
            }

            using (FileStream filestream = System.IO.File.Create(_environment.WebRootPath + "/assets/Branch/" + Product.BranchId + "/IMG/Product/" + Product.Name + "/" + IMGProduct.FileName))
            {
                IMGProduct.CopyTo(filestream);

                product.Image = "assets/Branch/" + Product.BranchId + "/IMG/Product/" + Product.Name + "/" + IMGProduct.FileName;
                var R = _productService.UpdateProductImage(product);
                switch (R)
                {
                    case 0: { return NotFound(); }
                    case 1: { return Ok(); }
                    case 2: { return StatusCode(406); }
                }
                return Ok();
            }
        }

        [HttpPut]
        [Authorize(Roles = "SuperUser,Admin")]
        [Route("UpdateProductStatus")]
        public object UpdateProductStatus(DTOInputProductUpdateStatus product)
        {
            var R = _productService.UpdateProductStatus(product);

            switch (R)
            {
                case 0: { return NotFound(); }
                case 1: { return Ok(); }
                case 2: { return StatusCode(406); }
            }
            return Ok();
        }

        [HttpDelete("{Id}")]
        [Authorize(Roles = "SuperUser,Admin")]
        public object DeleteProduct(int Id)
        {
            var R = _productService.DeleteProduct(Id);

            switch (R)
            {
                case 0: { return NotFound(); }
                case 1: { return Ok(); }
                case 2: { return StatusCode(406); }
            }
            return Ok();
        }

        [HttpGet]
        [Route("GetProductDetails/{ProductId}")]
        [Authorize(Roles = "SuperUser,Admin,Customer,Delivery")]
        public async Task<DTOOutProduct> GetProductDetails(int ProductId)
        {
            return await _productService.GetProductDetails(ProductId);
        }

        [HttpGet]
        [Route("GetProductByBranchId")]
        [Authorize(Roles = "Admin")]
        public async Task<object> GetProductByBranchIdAsync()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);
            var MyAccount = await _applicationUserService.GetUserEmployeeData(Id);

            return _productService.GetProductByBranchId(MyAccount.BranchId);
        }

        //--------------------------------------------------------------------------------------------Search By Admin
        [HttpPost]
        [Route("SearchProductByName")]
        [Authorize(Roles = "Admin")]
        public async Task<object> SearchProductByNameAsync(DTOInputProductSearchProductByName model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);
            var MyAccount = await _applicationUserService.GetUserEmployeeData(Id);

            model.Id = MyAccount.BranchId;
            return _productService.SearchProductByName(model).Select(a=>new { 
            Id = a.Id,
            Name = a.Name,
            Status = a.Status,
            CompanyOfOriginId = a.CompanyOfOriginId,
            Price = a.Price,
            Image = a.Image,
            Description = a.Description,
            CategoryId = a.CategoryId,
            BranchId = a.BranchId,
            });
        }

        [HttpPost]
        [Route("SearchProductByCompanyOfOrigin")]
        [Authorize(Roles = "Admin")]
        public async Task<object> SearchProductByCompanyOfOriginAsync(DTOInputProductSearchProductByCompanyOfOrigin model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);
            var MyAccount = await _applicationUserService.GetUserEmployeeData(Id);

            model.Id = MyAccount.BranchId;
            return _productService.SearchProductByCompanyOfOrigin(model).Select(a => new {
                Id = a.Id,
                Name = a.Name,
                Status = a.Status,
                CompanyOfOriginId = a.CompanyOfOriginId,
                Price = a.Price,
                Image = a.Image,
                Description = a.Description,
                CategoryId = a.CategoryId,
                BranchId = a.BranchId,
            });
        }

        [HttpPost]
        [Route("SearchProductByCategory")]
        [Authorize(Roles = "Admin")]
        public async Task<object> SearchProductByCategoryAsync(DTOInputProductSearchProductByCategory model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);
            var MyAccount = await _applicationUserService.GetUserEmployeeData(Id);

            model.Id = MyAccount.BranchId;
            return _productService.SearchProductByCategory(model).Select(a => new {
                Id = a.Id,
                Name = a.Name,
                Status = a.Status,
                CompanyOfOriginId = a.CompanyOfOriginId,
                Price = a.Price,
                Image =  a.Image,
                Description = a.Description,
                CategoryId = a.CategoryId,
                BranchId = a.BranchId,
            });
        }

        [HttpPost]
        [Route("SearchProductByPrice")]
        [Authorize(Roles = "Admin")]
        public async Task<object> SearchProductByPriceAsync(DTOInputProductSearchProductByPrice model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);
            var MyAccount = await _applicationUserService.GetUserEmployeeData(Id);

            model.Id = MyAccount.BranchId;
            return _productService.SearchProductByPrice(model);
        }


        //--------------------------------------------------------------------------------------------Search By Customer

        [HttpPost]
        [Route("SearchProductByCustomer")]
        [Authorize(Roles = "Customer")]
        public async Task<object> SearchProductByCustomerAsync(DTOInputProductSearchByCustomer model)
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);
            var MyAccount = await _applicationUserService.GetUserCustomerData(Id);
            model.BranchId = MyAccount.BranchId;

            var Result = new List<DTOOutputProductSearchCustomer>();
            if(model.Name != "" && model.Name != null)
            {
                DTOInputProductSearchFromCustomerByName modelName = new DTOInputProductSearchFromCustomerByName()
                {
                    BranchId = model.BranchId,
                    Name = model.Name
                };
                Result.AddRange(_productService.SearchProductFromCustomerByName(modelName));
            }

            if (model.CategoryId != 0)
            {
                DTOInputProductSearchFromCustomerByCategoryId modelCategory = new DTOInputProductSearchFromCustomerByCategoryId()
                {
                    BranchId = model.BranchId,
                    CategoryId = model.CategoryId
                };
                Result.AddRange(_productService.SearchProductFromCustomerByCategoryId(modelCategory));
            }

            if (model.CompanyOfOriginId != 0)
            {
                DTOInputProductSearchFromCustomerByCompanyOfOriginId modelCompanyOfOrigin = new DTOInputProductSearchFromCustomerByCompanyOfOriginId()
                {
                    BranchId = model.BranchId,
                    CompanyOfOriginId = model.CompanyOfOriginId
                };
                Result.AddRange(_productService.SearchProductFromCustomerByCompanyOfOriginId(modelCompanyOfOrigin));
            }

            return Result.GroupBy(a => a.Id).Select(a=> {
                return a.First();
            });
        }





        //--------------------------------------------------------------------------------------------Trending
        [HttpGet]
        [Route("GetAllTrendingProduct")]
        [AllowAnonymous]
        public object GetAllTrendingProduct()
        {
            return _productService.GetAllTrendingProduct().GroupBy(a=>a.Id).Select(a=> { return a.First(); });
        }

        [HttpGet]
        [Route("GetByCategoryIdTrendingProduct/{Id}")]
        [AllowAnonymous]
        public object GetByCategoryIdTrendingProduct(int Id)
        {
            return _productService.GetByCategoryIdTrendingProduct(Id).GroupBy(a=>a.Id).Select(a=> { return a.First(); });
        }

        [HttpGet]
        [Route("TrendingProduct")]
        [AllowAnonymous]
        public object TrendingProduct()
        {
            return _productService.TrendingProduct();
        }

        [HttpGet]
        [Route("TrendingProductTop3")]
        [AllowAnonymous]
        public object TrendingProductTop3()
        {
            return _productService.TrendingProductTop3();
        }


        //--------------------------------------------------------------------------------------------Trending SuperUser
        [HttpPost]
        [Route("TrendingProductByDate")]
        [Authorize(Roles = "SuperUser")]
        public object TrendingProductByDate(DTOInputProductTrendingProductByDate model)
        {
            return _productService.TrendingProductByDate(model);
        }
    }
}
