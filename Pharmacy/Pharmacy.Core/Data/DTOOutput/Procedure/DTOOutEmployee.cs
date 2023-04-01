using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.Data.DTOOutput.Procedure
{
    public class DTOOutEmployee
    {
        //ApplicationUser
        public int Id { get; set; }
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

        //Branch
        public string BranchName { get; set; }
        public int BranchId { get; set; }
    }

    public class DTOOutDelivery
    {
        //ApplicationUser
        public int Id { get; set; }
        public int ApplicationUserId { get; set; }
        public string UserName { get; set; }
        //public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool Block { get; set; }
        public string NickName { get; set; }
        public bool Gender { get; set; }
        public string Image { get; set; }
        //public int RoleId { get; set; }

        //Employee
        public float Salary { get; set; }

        //Branch
        public string BranchName { get; set; }
        public int BranchId { get; set; }

        public DateTime CurrentDate { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
