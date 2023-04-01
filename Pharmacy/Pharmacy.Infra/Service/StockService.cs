using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Infra.Service
{
    public class StockService: IStockService
    {
        private readonly IStockRepository _stockRepository;
        public StockService(IStockRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public List<Stock> GetAllStock()
        {
            return _stockRepository.GetAllStock();
        }
        public Stock GetStockById(int Id)
        {
            return _stockRepository.GetStockById(Id);
        }
        public int CreateStock(DTOInputStock DTOStock)
        {
            return _stockRepository.CreateStock(DTOStock);
        }

        public int UpdateStock(DTOInputStock DTOStock)
        {
            return _stockRepository.UpdateStock(DTOStock);
        }
        public int DeleteStock(int Id)
        {
           return _stockRepository.DeleteStock(Id);            
        }

        public DTOOutStockCoutOfProcutInStock CoutOfProcutInStock(int Id)
        {
            return _stockRepository.CoutOfProcutInStock(Id);
        }

        public List<Stock> GetStockByProductId(int Id)
        {
            return _stockRepository.GetStockByProductId(Id);
        }
    }
}
