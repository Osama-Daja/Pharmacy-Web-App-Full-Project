using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class Bag
    {
        //BagRepository
        [Key]
        public int Id { get; set; }

        [ForeignKey("CustomerId")]
        public int CustomerId { get; set; }
        public double TotalPrice { get; set; }
        public DateTime CurrentDate { get; set; }
        public ICollection<ApplicationUser> ApplicationUser { get; set; }
        public ICollection<Order> Order { get; set; }
        public ICollection<OrderLog> OrderLog { get; set; }
    }
}
