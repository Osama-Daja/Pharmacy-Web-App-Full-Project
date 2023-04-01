using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputSlider
    {
        public int Id { get; set; }
        [Required]
        public string SliderImg { get; set; }
        [Required]
        public string TitleText { get; set; }
        [Required]
        public string BriefText { get; set; }
    }
}
