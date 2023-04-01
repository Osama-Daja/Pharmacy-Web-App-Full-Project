using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
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
    public class BranchController : Controller
    {
        readonly IBranchService _branchService;
        readonly IApplicationUserService _applicationUserService;

        public BranchController(IBranchService branchService, IApplicationUserService applicationUserService)
        {
            _branchService = branchService;
            _applicationUserService = applicationUserService;
        }

        [HttpGet]
        [Route("GetFullBranch")]
        [Authorize(Roles = "SuperUser")]
        public async Task<object> GetFullBranch()
        {
            var List = await _branchService.GetFullBranch();



            var NewList = new List<DTOOutBranch>();

            if(List.Any())
            {
                foreach (var G in List)
                {
                    Polygon Polygon;

                    var serializera = GeoJsonSerializer.Create();
                    using (var stringReader = new StringReader(G.Geometry.ToString()))
                    using (var jsonReader = new JsonTextReader(stringReader))
                    {
                        Polygon = serializera.Deserialize<Polygon>(jsonReader);
                    }

                    DTOOutBranch dTOOutBranch = new DTOOutBranch()
                    {
                        Id = G.Id,
                        Description = G.Description,
                        Latitude = G.Latitude,
                        Longitude = G.Longitude,
                        Name = G.Name,
                        Geometry = Polygon,
                        StartWorkHours = G.StartWorkHours,
                        EndWorkHours = G.EndWorkHours
                    };

                    NewList.Add(dTOOutBranch);
                }
            }

            return NewList.Select(a=>new { 
             a.Id,a.Description,a.Latitude,a.Longitude,a.Name,
                Geometry = a.Geometry.Coordinates.Select(a=>new { a.X,a.Y}),
                a.StartWorkHours,a.EndWorkHours
            });
        }

        [HttpGet]
        [Route("GetBranch")]
        [Authorize(Roles = "SuperUser")]
        public async Task<object> GetBranchAsync()
        {
            var List = await _branchService.GetFullBranch();

            return List.Select(a=>new { a.Id,a.Name,a.Description});
        }

        [HttpGet]
        [Route("GetBranchDetails/{Id}")]
        [Authorize(Roles = "SuperUser,Admin")]
        public async Task<object> GetBranchDetailsAsync(int Id)
        {
            var R = await _branchService.GetBranchDetails(Id);
            return R;
        }

        [HttpGet]
        [Route("GetDetailsMyBranch")]
        [Authorize(Roles = "SuperUser,Admin")]
        public async Task<object> GetDetailsMyBranch()
        {
            string UserId = AesOperation.DecryptString(User.Claims.First(a => a.Type == "UserId").Value);
            var Id = Convert.ToInt32(UserId);

            var Employee = await _applicationUserService.GetUserEmployeeData(Id);
            var R = await _branchService.GetBranchDetails(Employee.BranchId);
            return new { 
            R.Description,
            R.Name,
            R.Latitude,
            R.Longitude,
            R.StartWorkHours,
            R.EndWorkHours,
            R.Geometry,
            Employee = R.Employee.Where(a=>a.RoleId == 3).ToList(),
            R.Product
            };
        }

        [HttpPost]
        [Route("InsertBranch")]
        [Authorize(Roles = "SuperUser")]
        public object InsertBranch(DTOInputBranch model)
        {
            var R = _branchService.InsertBranch(model);

            if(R == 2) { return BadRequest(); }
            return Ok();
        }

        [HttpPut]
        [Route("UpdateBranch")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateBranch(DTOInputUpdateBranch model)
        {
            var R = _branchService.UpdateBranch(model);

            if(R == 2) { return StatusCode(406); }
            if(R == 0) { return NoContent(); }

            return Ok();
        }

        [HttpPut]
        [Route("UpdateBranchGEO")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateBranchGEO(DTOInputUpdateBranchGEO model)
        {
            _branchService.UpdateBranchGEO(model);

            return Ok();
        }

        [HttpPut]
        [Route("UpdateWorkHour")]
        [Authorize(Roles = "SuperUser")]
        public object UpdateWorkHour(DTOInputUpdateWorkHour model)
        {
            _branchService.UpdateWorkHour(model);

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteBranch/{Id}")]
        [Authorize(Roles = "SuperUser")]
        public object DeleteBranch(int Id)
        {
           if(_branchService.DeleteBranch(Id) == 2) { return StatusCode(409); }

            return Ok();
        }

        //----------------------------------------------------------------------------------Trending Branch
        [HttpPost]
        [Route("TrendingBranchByDateAdmin")]
        [Authorize(Roles ="SuperUser")]
        public object TrendingBranchByDateAdmin(DTOInputBranchTrendingBranchByDate model)
        {
            return _branchService.TrendingBranchByDate(model);
        }
    }
}
