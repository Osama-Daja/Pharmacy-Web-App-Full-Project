using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.Data.DTOOutput.Procedure
{
    public class DTOOutMessage
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CurrentDate { get; set; }
        public int FromId { get; set; }
    }

    public class DTOOutMessageList
    {
        //ApplicationUser
        public int UserId { get; set; }
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool Block { get; set; }
        public string NickName { get; set; }
        public bool Gender { get; set; }
        public string Image { get; set; }

        //Employee
        public float Salary { get; set; }

        //Customer
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public DateTime BirthDay { get; set; }

        public List<DTOOutMessage> Messages { get; set; }
    }
}
