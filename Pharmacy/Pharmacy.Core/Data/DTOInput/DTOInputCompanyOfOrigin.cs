using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputCompanyOfOrigin
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }

    public class DTOInputCompanyOfOriginUpdate
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
