using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Pharmacy.Core.Data.DTOInput
{
   public class DTOInputDeliveryLocation
    {
       
       [Required]
        public int DeliveryId { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }


    }

    public class DTOInputAddDeliveryLocation {
        [Required]
        public decimal Latitude { get; set; }
        [Required]
        public decimal Longitude { get; set; }
        
        public int DeliveryId { get; set; }
        public DateTime CurrentDate { get; set; }

    }
}
