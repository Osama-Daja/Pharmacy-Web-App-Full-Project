using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOOutput.Procedure
{
    public class DTOOutProduct
    {
        public int Id { get; set; }
        
        public string ProductName { get; set; }
        
        public bool Status { get; set; }
        
        public string CompanyName { get; set; }
        
        public double Price { get; set; }
        
        public string Image { get; set; }
        
        public string Description { get; set; }
        
        public string CategoryName { get; set; }
        public string BranchName { get; set; }
        
        //public DateTime ProduceDate { get; set; }
        //public DateTime ExpiredDate { get; set; }
        //public int Quantity { get; set; }

        public List<StockProduct> Stock { get; set; }
    }

    public class StockProduct
    {
        public DateTime ProduceDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public int Quantity { get; set; }
        public int QuantityOrder { get; set; }
        public int StockId { get; set; }
    }

    public class DTOOutputProductSearchCustomer
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Price { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        //Category
        public string CategoryImage { get; set; }
        public string CategoryDescription { get; set; }
        public string CategoryName { get; set; }

        //CompanyOfOrigin
        public string CompanyOfOriginName { get; set; }
        public string CompanyOfOriginDescription { get; set; }

        //Stock
        public DateTime ExpiredDate { get; set; }
        public DateTime ProduceDate { get; set; }
        public int QuantityOrder { get; set; }
        public int QuantityStock { get; set; }
    }

    public class DTOOutputProductTrendingProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string CategoryDescription { get; set; }
        public string CategoryName { get; set; }
        public string CategoryImage { get; set; }
        public int Quantity { get; set; }
        public int SumRating { get; set; }
    }
}
