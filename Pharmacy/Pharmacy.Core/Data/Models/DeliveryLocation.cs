using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
   public class DeliveryLocation
    {
        [Key]
        public int Id { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int DeliveryId { get; set; }
        public DateTime CurrentDate { get; set; }

        [ForeignKey("DeliveryId")]
        public virtual ApplicationUser ApplicationUser { get; set; }

    }
}
