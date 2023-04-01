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
    public class StockController : Controller
    {
        private readonly IStockService _stockService;
        public StockController(IStockService stockService)
        {
            _stockService = stockService;
        }

        [HttpGet]
        [Route("{Id}")]
        [Authorize(Roles = "SuperUser,Admin")]
        public Stock GetStockById(int Id)
        {
            return _stockService.GetStockById(Id);
        }


        [HttpPost]
        [Route("CreateStock")]
        [Authorize(Roles = "SuperUser,Admin")]
        public object CreateStock([FromBody] DTOInputStock stock)
        {
            return _stockService.CreateStock(stock);
        }

        [HttpPut]
        [Route("UpdateStock")]
        [Authorize(Roles = "SuperUser,Admin")]
        public object UpdateStock([FromBody] DTOInputStock stock)
        {
            return _stockService.UpdateStock(stock);
        }

        [HttpDelete("{Id}")]
        [Authorize(Roles = "SuperUser,Admin")]
        public object DeleteStock(int Id)
        {
            var result = _stockService.DeleteStock(Id);
            if (result == 2)
                return BadRequest(406);
            return Ok();
        }
    }
}
