using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class Branch
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Geometry { get; set; }
        public TimeSpan ? StartWorkHours { get; set; }
        public TimeSpan ? EndWorkHours { get; set; }
    }
}
