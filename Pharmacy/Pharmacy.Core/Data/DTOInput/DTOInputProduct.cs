using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputProduct
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool Status { get; set; }
        [Required]
        public int CompanyOfOriginId { get; set; }
        [Required]
        public double Price { get; set; }
        public string Image { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public int BranchId { get; set; }
    }

    public class DTOInputProductUpdate
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int CompanyOfOriginId { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }

    public class DTOInputProductUpdateStatus
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public bool Status { get; set; }
    }

    public class DTOInputProductUpdateImage
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Image { get; set; }
    }

    public class DTOInputProductSearchProductByName
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }

    public class DTOInputProductSearchProductByCompanyOfOrigin
    {
        public int Id { get; set; }
        [Required]
        public int CompanyOfOriginId { get; set; }
    }

    public class DTOInputProductSearchProductByPrice
    {
        public int Id { get; set; }
        [Required]
        public double StartPrice { get; set; }
        [Required]
        public double EndPrice { get; set; }
    }

    public class DTOInputProductSearchProductByCategory
    {
        public int Id { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }

    public class DTOInputProductSearchByCustomer
    {
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public int CompanyOfOriginId { get; set; }
        public int BranchId { get; set; }
    }

    public class DTOInputProductSearchFromCustomerByName
    {
        [Required]
        public string Name { get; set; }
        public int BranchId { get; set; }
    }

    public class DTOInputProductSearchFromCustomerByCategoryId
    {
        [Required]
        public int CategoryId { get; set; }
        public int BranchId { get; set; }
    }

    public class DTOInputProductSearchFromCustomerByCompanyOfOriginId
    {
        [Required]
        public int CompanyOfOriginId { get; set; }
        public int BranchId { get; set; }
    }

    public class DTOInputProductTrendingProductByDate
    {
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
    }
}
