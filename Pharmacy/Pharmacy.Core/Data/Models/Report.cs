using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
   public class Report
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }

        public int Rating { get; set; }
        public int CustomerId { get; set; }
        
        public int OrderId { get; set; }

        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }

    }
}
