using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputOrderLog
    {
        
        public int Id { get; set; }
        [Required]
        public int BagId { get; set; }
        public byte Status { get; set; }
        public DateTime CurrentDate { get; set; }
        public bool PaymentType { get; set; }
    }
}
