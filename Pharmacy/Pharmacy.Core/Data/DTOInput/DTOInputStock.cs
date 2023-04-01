using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputStock
    {
        //StockRepository
        //StockService
        public int Id { get; set; }
        [Required]
        public DateTime ProduceDate { get; set; }

        [Required]
        public DateTime ExpiredDate { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }
       
    }
}
