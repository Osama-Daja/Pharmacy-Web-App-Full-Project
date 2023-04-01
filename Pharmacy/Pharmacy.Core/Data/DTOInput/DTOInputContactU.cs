using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputContactU
    {        
        public int Id { get; set; }//IContactUService //IContactURepository
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]        
        public string PhoneNumber { get; set; }
        [Required]
        public string Message { get; set; }
    }

    //-----------------------------------------------------------------------------Searching 
    public class DTOInputInputContactusSearchByEmail
    {
        [Required]
        public string Email { get; set; }
    }

    public class DTOInputContactusByPhoneNumber
    {
        [Required]
        public string PhoneNumber { get; set; }
    }

}
