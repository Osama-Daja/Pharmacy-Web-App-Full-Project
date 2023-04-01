using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.IRepository
{
    public interface IStockRepository
    {
        List<Stock> GetAllStock();
        Stock GetStockById(int Id);
        int CreateStock(DTOInputStock DTOStock);
        int UpdateStock(DTOInputStock DTOStock);
        int DeleteStock(int Id);
        DTOOutStockCoutOfProcutInStock CoutOfProcutInStock(int Id);
        List<Stock> GetStockByProductId(int Id);
    }
}
