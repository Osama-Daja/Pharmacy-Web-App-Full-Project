
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Infra.Service
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public List<Product> GetAllProduct()
        {
            return _productRepository.GetAllProduct();
        }
        public Product GetProductById(int Id)
        {
            return _productRepository.GetProductById(Id);
        }
        public int CreateProduct(DTOInputProduct product)
        {
             return _productRepository.CreateProduct(product);
        }
        public int UpdateProduct(DTOInputProductUpdate product) {
            return _productRepository.UpdateProduct(product);
        }
        public int DeleteProduct(int Id)
        {
            return _productRepository.DeleteProduct(Id);            
        }
        public async Task<DTOOutProduct> GetProductDetails(int ProductId)
        {
            return await _productRepository.GetProductDetails(ProductId);
        }

        public List<Product> GetProductByBranchId(int Id)
        {
            return _productRepository.GetProductByBranchId(Id);
        }

        public List<Product> SearchProductByName(DTOInputProductSearchProductByName model)
        {
            return _productRepository.SearchProductByName(model);
        }

        public List<Product> SearchProductByCompanyOfOrigin(DTOInputProductSearchProductByCompanyOfOrigin model)
        {
            return _productRepository.SearchProductByCompanyOfOrigin(model);
        }

        public List<Product> SearchProductByPrice(DTOInputProductSearchProductByPrice model)
        {
            return _productRepository.SearchProductByPrice(model);
        }

        public List<Product> SearchProductByCategory(DTOInputProductSearchProductByCategory model)
        {
            return _productRepository.SearchProductByCategory(model);
        }

        public int UpdateProductImage(DTOInputProductUpdateImage product)
        {
            return _productRepository.UpdateProductImage(product);
        }

        public int UpdateProductStatus(DTOInputProductUpdateStatus product)
        {
            return _productRepository.UpdateProductStatus(product);
        }

        public List<DTOOutputProductSearchCustomer> SearchProductFromCustomerByName(DTOInputProductSearchFromCustomerByName model)
        {
            return _productRepository.SearchProductFromCustomerByName(model);
        }

        public List<DTOOutputProductSearchCustomer> SearchProductFromCustomerByCategoryId(DTOInputProductSearchFromCustomerByCategoryId model)
        {
            return _productRepository.SearchProductFromCustomerByCategoryId(model);
        }

        public List<DTOOutputProductSearchCustomer> SearchProductFromCustomerByCompanyOfOriginId(DTOInputProductSearchFromCustomerByCompanyOfOriginId model)
        {
            return _productRepository.SearchProductFromCustomerByCompanyOfOriginId(model);
        }

        public List<DTOOutputProductTrendingProduct> GetAllTrendingProduct()
        {
            return _productRepository.GetAllTrendingProduct();
        }

        public List<DTOOutputProductTrendingProduct> GetByCategoryIdTrendingProduct(int Id)
        {
            return _productRepository.GetByCategoryIdTrendingProduct(Id);
        }

        public DTOOutputProductTrendingProduct TrendingProduct()
        {
            return _productRepository.TrendingProduct();
        }

        public List<DTOOutputProductTrendingProduct> TrendingProductTop3()
        {
            return _productRepository.TrendingProductTop3();
        }

        public List<DTOOutputProductTrendingProduct> TrendingProductByDate(DTOInputProductTrendingProductByDate model)
        {
            return _productRepository.TrendingProductByDate(model);
        }
    }
}
