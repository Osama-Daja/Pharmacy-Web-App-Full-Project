using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class OrderLog
    {
        //OrderLogRepository
        //OrderLogService
        [Key]
        public int Id { get; set; }

        [ForeignKey("BagId")]
        public int BagId { get; set; }
        public byte Status { get; set; }
        public DateTime CurrentDate { get; set; }
        public int ? DeliveryId { get; set; }
        public bool PaymentType { get; set; }
        public virtual Bag Bag { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}




//Status
//0 : Waiting
//1 : Inactive
//2 : Canceled
//3 : Done From Delivery
//4 : Done From Customer
