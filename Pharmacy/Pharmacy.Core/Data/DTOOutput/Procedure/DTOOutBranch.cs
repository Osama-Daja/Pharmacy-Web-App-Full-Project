using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.Data.DTOOutput.Procedure
{
    public class DTOOutBranch
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public Polygon Geometry { get; set; }
        public TimeSpan ? StartWorkHours { get; set; }
        public TimeSpan ? EndWorkHours { get; set; }
    }

    public class DTOOutBranchDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Geometry { get; set; }
        public TimeSpan? StartWorkHours { get; set; }
        public TimeSpan? EndWorkHours { get; set; }
        public List<DTOOutEmplyeeBranchDetails> Employee { get; set; }
        public List<DTOOutputProductBranchDetails> Product { get; set; }
    }

    public class DTOOutEmplyeeBranchDetails
    {
        //ApplicationUser
        public int ApplicationUserId { get; set; }
        public string UserName { get; set; }
        //public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool Block { get; set; }
        public string NickName { get; set; }
        public bool Gender { get; set; }
        public string Image { get; set; }
        public int RoleId { get; set; }

        //Employee
        public float Salary { get; set; }
        public int BranchId { get; set; }
    }
    public class DTOOutputProductBranchDetails
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public bool Status { get; set; }

        public double Price { get; set; }

        public string ProductImage { get; set; }

        public string ProductDescription { get; set; }

        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }
        public string CompanyOfOriginName { get; set; }
        public string CompanyOfOriginDescription { get; set; }
        public int BranchId { get; set; }
    }



    public class DTOOutBranchTrendingBranch
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public TimeSpan? StartWorkHours { get; set; }
        public TimeSpan? EndWorkHours { get; set; }
        public int Quantity { get; set; }
    }
}
