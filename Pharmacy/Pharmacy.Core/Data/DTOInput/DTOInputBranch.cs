using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputBranch
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
        [Required]
        public string Geometry { get; set; }
    }

    public class DTOInputUpdateBranch
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
    }

    public class DTOInputUpdateBranchGEO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Geometry { get; set; }
    }

    public class DTOInputUpdateWorkHour
    {
        [Required]
        public int Id { get; set; }
        public string StartWorkHours { get; set; }
        public string EndWorkHours { get; set; }
    }
    public class DTOInputBranchTrendingBranchByDate
    {
        [Required]
        public string StartDate { get; set; }
        [Required]
        public string EndDate { get; set; }
    }
}
