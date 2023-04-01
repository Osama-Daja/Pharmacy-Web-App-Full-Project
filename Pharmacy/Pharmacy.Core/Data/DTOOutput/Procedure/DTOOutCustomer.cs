using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.Data.DTOOutput.Procedure
{
    public class DTOOutCustomer
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
        public string ConnectionId { get; set; }
        //public int RoleId { get; set; }

        //Customer
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime BirthDay { get; set; }

        public int BranchId { get; set; }
    }
}
