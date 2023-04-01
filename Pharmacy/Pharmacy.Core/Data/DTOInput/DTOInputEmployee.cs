using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput.Procedure
{
    public class DTOInputEmployee
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

        //Employee
        [Required]
        public float Salary { get; set; }
        public int BranchId { get; set; }
    }

    public class DTOInputUpdeteEmployee
    {
        public int Id { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string NickName { get; set; }
        [Required]
        public bool Gender { get; set; }
    }

    public class DTOInputEditEmployee
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string NickName { get; set; }
        [Required]
        public bool Gender { get; set; }
    }



    //Search
    public class DTOInputSearchEmployeeByPhoneNumber
    {
        [Required]
        public string PhoneNumber { get; set; }
    }
    public class DTOInputSearchEmployeeByBranch
    {
        [Required]
        public int Id { get; set; }
    }
}
