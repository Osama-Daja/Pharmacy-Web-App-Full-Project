using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class ContactU
    {
        [Key]
        public int Id { get; set; }//IContactUService //IContactURepository
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Message { get; set; }

    }
}
