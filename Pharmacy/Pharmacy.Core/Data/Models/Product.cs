using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class Product
    {
        //ProductRepository
        //ProductService
        // DTOInputProduct 
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public byte Status { get; set; }
        public int CompanyOfOriginId { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int BranchId { get; set; }

        public virtual Branch Branch { get; set; }
        public ICollection<Stock> stocks { get; set; }
        

    }
}
