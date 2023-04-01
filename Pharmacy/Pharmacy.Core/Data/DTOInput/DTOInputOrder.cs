using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputOrder
    {
        //OrderRepository
        //OrderService
        public int Id { get; set; }
        [Required]
        public int Quantity { get; set; }
        //[Required]
        public int StockId { get; set; }
        [Required]
        public int ProductId { get; set; }
        public int BagId { get; set; }

    }
}
