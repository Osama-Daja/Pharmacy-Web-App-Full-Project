using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class Stock
    {
        //DTOInputStock
        [Key]
        public int Id { get; set; }
        public DateTime ProduceDate { get; set; }
        public DateTime ExpiredDate { get; set; }

        [ForeignKey("ProductId")]
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public virtual Product Product { get; set; }

    }
}
