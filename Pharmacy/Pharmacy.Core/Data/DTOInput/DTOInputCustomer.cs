using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput.Procedure
{
    public class DTOInputCustomer
    {
        //ApplicationUser
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public bool Block { get; set; }
        [Required]
        public string NickName { get; set; }
        [Required]
        public bool Gender { get; set; }
        public string Image { get; set; }

        //Customer
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
        [Required]
        public DateTime BirthDay { get; set; }
        public int BranchId { get; set; }
    }

    public class DTOInputUpdeteCustomer
    {
        public int Id { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string NickName { get; set; }
        [Required]
        public bool Gender { get; set; }

        //Customer
        [Required]
        public DateTime BirthDay { get; set; }
    }

    public class DTOInputUpdateMyLocation
    {
        public int Id { get; set; }
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
        public int BranchId { get; set; }

    }



    //-----------------------------------------------------------------------------Search
    public class DTOInputCustomerSearchByUserName
    {
        [Required]
        public string UserName { get; set; }
    }

    public class DTOInputCustomerSearchByPhoneNumber
    {
        [Required]
        public string PhoneNumber { get; set; }
    }

    public class DTOInputCustomerSearchByEmail
    {
        [Required]
        public string Email { get; set; }
    }

    public class DTOInputCustomerSearchByBranch
    {
        [Required]
        public int Id { get; set; }
    }

    public class DTOInputCustomerSearchByBirthDay
    {
        [Required]
        public DateTime StartBirthDay { get; set; }
        [Required]
        public DateTime EndBirthDay { get; set; }
    }

}
