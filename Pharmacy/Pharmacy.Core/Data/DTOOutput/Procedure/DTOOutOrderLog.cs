using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.Data.DTOOutput.Procedure
{
    public class DTOOutOrderLog
    {
        //DTOOutOrderLog
        public int Id { get; set; }
        public int BagId { get; set; }
        public int DeliveryId { get; set; }
        public int Status { get; set; }
        public bool PaymentType { get; set; }
        public DateTime CurrentDate { get; set; }
        public int CustomerId { get; set; }
        public float TotalPrice { get; set; }

        //CustomerId,b.TotalPrice
    }
}
