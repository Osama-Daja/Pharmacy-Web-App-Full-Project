using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputReport
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        public DateTime Date { get; set; }
        
        [Required]
        public int Rating { get; set; }
        public int CustomerId { get; set; }
        [Required]
        public int OrderId { get; set; }

    }
}
