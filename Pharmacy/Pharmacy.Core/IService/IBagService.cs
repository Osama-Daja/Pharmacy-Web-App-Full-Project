using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Core.IService
{
    public interface IBagService
    {
        List<Bag> GetAllBag();
        Bag GetBagById(int Id);
        int CreateBagByCustomerId(DTOInputBag model);
        int GetLastBag(int Id);
        Task<List<DTOOutBag>> GetBagsInWay();
        List<DTOOutBag> GetBagByCustomerId(int CustomerId);
        List<DTOOutputBagDeatails> GetBagDeatailsById(int Id);
        Task<DTOOutputBagLastBagByDelivery> GetMyLastBagByDelivery(int Id);
        Task<DTOOutputBagLastBagByDelivery> GetMyLastBagByCustomer(int Id);
        Task<List<DTOOutputBagSearchOrdersByDateCustomer>> SearchOrdersByDateCustomer(DTOInputBagSearchByCustomer model);
        Task<List<DTOOutputBagSearchOrdersByDateAdmin>> SearchOrdersByDateAdmin(DTOInputBagSearchByCustomer model);
        Task<List<DTOOutputBagSearchOrdersByDateAdmin>> SearchOrdersByDateDelivery(DTOInputBagSearchByCustomer model);
        //-------------------------------------------------------------------------------Active Deliveries
        Task<List<DTOOutputBagActiveDeliveries>> GetActiveDeliveries(DTOInputBagGetActiveDeliveries model);
    }
}
