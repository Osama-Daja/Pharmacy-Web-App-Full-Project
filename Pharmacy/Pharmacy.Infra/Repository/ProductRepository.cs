using Dapper;
using Pharmacy.Core.Connection;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Infra.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly IConnection _dBContext;
        public ProductRepository(IConnection dBContext)
        {
            _dBContext = dBContext;
        }

        public List<Product> GetAllProduct()
        {
            var result = _dBContext.DBContext.Query<Product>("GetAllProduct", commandType: CommandType.StoredProcedure);
            
            return result.ToList();
        }

        public Product GetProductById(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Product>("GetProductById", para, commandType: CommandType.StoredProcedure);
            
            return result.FirstOrDefault();
        }
        public int CreateProduct(DTOInputProduct product)
        {
            var para = new DynamicParameters();
            para.Add("@Name", product.Name, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@Status", product.Status, dbType: DbType.Byte, direction: ParameterDirection.Input);
            para.Add("@CompanyOfOriginId", product.CompanyOfOriginId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@Price", product.Price, dbType: DbType.Double, direction: ParameterDirection.Input);
            para.Add("@Image", product.Image, dbType: DbType.String, direction: ParameterDirection.Input);

            para.Add("@Description", product.Description, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@CategoryId", product.CategoryId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@BranchId", product.BranchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.ExecuteAsync("CreateProduct", para, commandType: CommandType.StoredProcedure);

            

            return 1;
        }
        //UpdateProduct
        public int UpdateProduct(DTOInputProductUpdate product)
        {
            try
            {
                var para = new DynamicParameters();

                para.Add("@Id", product.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
                para.Add("@Name", product.Name, dbType: DbType.String, direction: ParameterDirection.Input);
                para.Add("@CompanyOfOriginId", product.CompanyOfOriginId, dbType: DbType.Int32, direction: ParameterDirection.Input);
                para.Add("@Price", product.Price, dbType: DbType.Double, direction: ParameterDirection.Input);

                para.Add("@Description", product.Description, dbType: DbType.String, direction: ParameterDirection.Input);
                para.Add("@CategoryId", product.CategoryId, dbType: DbType.Int32, direction: ParameterDirection.Input);
                
                var R = _dBContext.DBContext.ExecuteAsync("UpdateProduct", para, commandType: CommandType.StoredProcedure).Result;
                
                return R;
            }
            catch
            {
                return 2;
            }
        }
        public int DeleteProduct(int Id)
        {
            try
            {
                var para = new DynamicParameters();
                para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);

                var R = _dBContext.DBContext.ExecuteAsync("DeleteProduct", para, commandType: CommandType.StoredProcedure).Result;
                
                return R;
            }
            catch
            {
                return 2;
            }
        }

        public async Task<DTOOutProduct> GetProductDetails(int ProductId)
        {
            var para = new DynamicParameters();
            para.Add("@ProductId", ProductId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            //var result = _dBContext.DBContext.Query<DTOOutputProduct>("GetProductDetails", para, commandType: CommandType.StoredProcedure);

            var result = await _dBContext.DBContext.QueryAsync<DTOOutProduct, StockProduct, DTOOutProduct>("GetProductDetails", (product, stock) =>
             {
                 product.Stock = product.Stock ?? new List<StockProduct>();
                 product.Stock.Add(stock);
                 return product;
             }, splitOn: "StockId", param: para, commandType: CommandType.StoredProcedure);

            

            var FinalProduct = result.AsList().GroupBy(a => a.Id).Select(g =>
            {
                var Product = new DTOOutProduct();
                Product = g.First();

                Product.Stock = g.Select(a => a.Stock.Single()).GroupBy(a => a.StockId).Select(m => { return m.First(); }).ToList();
                if(Product.Stock.Any(a=>a.StockId == 0)) { Product.Stock = new List<StockProduct>(); }
                return Product;
            });

            return FinalProduct.FirstOrDefault();
        }

        public List<Product> GetProductByBranchId(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Product>("GetProductByBranchId", para, commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public List<Product> SearchProductByName(DTOInputProductSearchProductByName model)
        {
            var para = new DynamicParameters();
            para.Add("@Id", model.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@Name", model.Name, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Product>("SearchProductByName", para, commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public List<Product> SearchProductByCompanyOfOrigin(DTOInputProductSearchProductByCompanyOfOrigin model)
        {
            var para = new DynamicParameters();
            para.Add("@Id", model.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@CompanyOfOriginId", model.CompanyOfOriginId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Product>("SearchProductByCompanyOfOrigin", para, commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public List<Product> SearchProductByPrice(DTOInputProductSearchProductByPrice model)
        {
            var para = new DynamicParameters();
            para.Add("@Id", model.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@StartPrice", model.StartPrice, dbType: DbType.Double, direction: ParameterDirection.Input);
            para.Add("@EndPrice", model.EndPrice, dbType: DbType.Double, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Product>("SearchProductByPrice", para, commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public List<Product> SearchProductByCategory(DTOInputProductSearchProductByCategory model)
        {
            var para = new DynamicParameters();
            para.Add("@Id", model.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@CategoryId", model.CategoryId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Product>("SearchProductByCategory", para, commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public int UpdateProductImage(DTOInputProductUpdateImage product)
        {
            try
            {
                var para = new DynamicParameters();

                para.Add("@Id", product.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
                para.Add("@Image", product.Image, dbType: DbType.String, direction: ParameterDirection.Input);
                var result = _dBContext.DBContext.ExecuteAsync("UpdateProductImage", para, commandType: CommandType.StoredProcedure);
                
                return result.Result;
            }
            catch
            {
                return 2;
            }
        }

        public int UpdateProductStatus(DTOInputProductUpdateStatus product)
        {
            try
            {
                var para = new DynamicParameters();

                para.Add("@Id", product.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
                para.Add("@Status", product.Status, dbType: DbType.Boolean, direction: ParameterDirection.Input);
                var result = _dBContext.DBContext.ExecuteAsync("UpdateProductStatus", para, commandType: CommandType.StoredProcedure).Result;
                
                return result;
            }
            catch
            {
                return 2;
            }
        }

        public List<DTOOutputProductSearchCustomer> SearchProductFromCustomerByName(DTOInputProductSearchFromCustomerByName model)
        {
            var para = new DynamicParameters();
            para.Add("@BranchId", model.BranchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@Name", model.Name, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<DTOOutputProductSearchCustomer>("SearchProductFromCustomerByName", para, commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public List<DTOOutputProductSearchCustomer> SearchProductFromCustomerByCategoryId(DTOInputProductSearchFromCustomerByCategoryId model)
        {
            var para = new DynamicParameters();
            para.Add("@BranchId", model.BranchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@CategoryId", model.CategoryId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<DTOOutputProductSearchCustomer>("SearchProductFromCustomerByCategoryId", para, commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public List<DTOOutputProductSearchCustomer> SearchProductFromCustomerByCompanyOfOriginId(DTOInputProductSearchFromCustomerByCompanyOfOriginId model)
        {
            var para = new DynamicParameters();
            para.Add("@BranchId", model.BranchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@CompanyOfOriginId", model.CompanyOfOriginId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<DTOOutputProductSearchCustomer>("SearchProductFromCustomerByCompanyOfOriginId", para, commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public List<DTOOutputProductTrendingProduct> GetAllTrendingProduct()
        {
            var R = _dBContext.DBContext.Query<DTOOutputProductTrendingProduct>("GetAllTrendingProduct", commandType: CommandType.StoredProcedure).AsList();
            
            return R;
        }

        public List<DTOOutputProductTrendingProduct> GetByCategoryIdTrendingProduct(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<DTOOutputProductTrendingProduct>("GetByCategoryIdTrendingProduct", para, commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public DTOOutputProductTrendingProduct TrendingProduct()
        {
            var result = _dBContext.DBContext.Query<DTOOutputProductTrendingProduct>("TrendingProduct", commandType: CommandType.StoredProcedure);
            if(result.Count() == 0) { return null; }
            
            return result.FirstOrDefault();
        }

        public List<DTOOutputProductTrendingProduct> TrendingProductTop3()
        {
            var result = _dBContext.DBContext.Query<DTOOutputProductTrendingProduct>("TrendingProduct", commandType: CommandType.StoredProcedure);
            
            return result.AsList();
        }

        public List<DTOOutputProductTrendingProduct> TrendingProductByDate(DTOInputProductTrendingProductByDate model)
        {
            var para = new DynamicParameters();
            para.Add("@StartDate", model.StartDate, dbType: DbType.Date, direction: ParameterDirection.Input);
            para.Add("@EndDate", model.EndDate, dbType: DbType.Date, direction: ParameterDirection.Input);

            var result = _dBContext.DBContext.Query<DTOOutputProductTrendingProduct>("TrendingProductByDate",para, commandType: CommandType.StoredProcedure);

            return result.AsList();
        }
    }
}
