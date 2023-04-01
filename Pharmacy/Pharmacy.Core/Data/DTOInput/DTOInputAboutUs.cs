using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputAboutUs
    {
        [Required]
        public string Text { get; set; }
    }

    public class DTOInputAboutUsPostion
    {
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
    }
}
