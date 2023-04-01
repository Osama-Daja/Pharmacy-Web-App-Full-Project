using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public int ApplicationUserId { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public DateTime BirthDay { get; set; }

        [ForeignKey("ApplicationUserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
