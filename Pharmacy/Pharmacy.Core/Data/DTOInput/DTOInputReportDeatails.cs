using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputReportDeatails
    {
        
        public int Id { get; set; }// report Id 
        [Required]
        public string  StartDate { get; set; }
        [Required]
        public string  EndDate { get; set; }
    }
}
