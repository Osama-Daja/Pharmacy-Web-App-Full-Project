using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput.Procedure
{
    public class LogIn
    {
        //Input
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }

        //Output
        public int Id { get; set; }
        public string RoleName { get; set; }
        public bool Block { get; set; }
    }

    public class DTOInputUpdateImageUser
    {
        public int Id { get; set; }
        [Required]
        public string Image { get; set; }
    }

    public class DTOInputUpdateUserNameUser
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
    }

    public class DTOInputUpdateEmailUser
    {
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
    }
    public class DTOInputUpdatePasswordUser
    {
        public int Id { get; set; }
        [Required]
        public string Password { get; set; }
    }
    public class DTOInputUpdateSalaryUser
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public float Salary { get; set; }
    }
    public class DTOInputUpdateBlockUserForAdmin
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public bool Block { get; set; }
    }
    public class DTOInputUpdateBlockUserForSuperUser
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public bool Block { get; set; }
    }

    public class DTOInputConfirmCode
    {
        [Required]
        public string Email { get; set; }
    }

}
