using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Core.IRepository
{
    public interface IProductRepository
    {
        List<Product> GetAllProduct();
        Product GetProductById(int Id);
        int CreateProduct(DTOInputProduct product);
        int UpdateProduct(DTOInputProductUpdate product);
        int UpdateProductImage(DTOInputProductUpdateImage product);
        int UpdateProductStatus(DTOInputProductUpdateStatus product);
        int DeleteProduct(int Id);
        Task<DTOOutProduct> GetProductDetails(int ProductId);
        List<Product> GetProductByBranchId(int Id);

        //Search By Admin
        List<Product> SearchProductByName(DTOInputProductSearchProductByName model);
        List<Product> SearchProductByCompanyOfOrigin(DTOInputProductSearchProductByCompanyOfOrigin model);
        List<Product> SearchProductByPrice(DTOInputProductSearchProductByPrice model);
        List<Product> SearchProductByCategory(DTOInputProductSearchProductByCategory model);

        //Search By Customer
        List<DTOOutputProductSearchCustomer> SearchProductFromCustomerByName(DTOInputProductSearchFromCustomerByName model);
        List<DTOOutputProductSearchCustomer> SearchProductFromCustomerByCategoryId(DTOInputProductSearchFromCustomerByCategoryId model);
        List<DTOOutputProductSearchCustomer> SearchProductFromCustomerByCompanyOfOriginId(DTOInputProductSearchFromCustomerByCompanyOfOriginId model);

        //Trending
        List<DTOOutputProductTrendingProduct> GetAllTrendingProduct();
        List<DTOOutputProductTrendingProduct> GetByCategoryIdTrendingProduct(int Id);
        DTOOutputProductTrendingProduct TrendingProduct();
        List<DTOOutputProductTrendingProduct> TrendingProductTop3();

        //Trending SuperUser
        List<DTOOutputProductTrendingProduct> TrendingProductByDate(DTOInputProductTrendingProductByDate model);
    }
}
