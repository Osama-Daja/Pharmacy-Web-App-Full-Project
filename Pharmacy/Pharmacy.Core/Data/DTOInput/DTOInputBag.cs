using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputBag
    {
        
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public float TotalPrice { get; set; }
        public DateTime CurrentDate { get; set; }
        [Required]
        public bool PaymentType { get; set; }
        [Required]
        public List<DTOInputOrder> OrderList { get; set; }
    }

    public class DTOInputBagSearchByCustomer
    {
        public int Id { get; set; }
        [Required]
        public string StartDate { get; set; }
        [Required]
        public string EndDate { get; set; }
    }


    //-------------------------------------------------------------------------------Active Deliveries
    public class DTOInputBagGetActiveDeliveries
    {
        [Required]
        public int Id { get; set; }
    }
}
