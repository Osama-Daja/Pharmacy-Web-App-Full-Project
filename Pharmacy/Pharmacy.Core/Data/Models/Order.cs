using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class Order
    {
        //DTOInputOrder
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }

        [ForeignKey("StockId")]
        public int StockId { get; set; }

        [ForeignKey("BagId")]
        public int BagId { get; set; }
        public virtual Bag Bag { get; set; }
        public virtual Stock Stock { get; set; }
    }
}
