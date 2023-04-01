using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
     public class Testimonial
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public bool Status { get; set; }
        public DateTime Date { get; set; }
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }


    }
    
}
