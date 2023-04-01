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
    public class BagService : IBagService
    {
        private readonly IBagRepository _bagRepository;

        public BagService(IBagRepository bagRepository)
        {
            _bagRepository = bagRepository;
        }

        public List<Bag> GetAllBag()
        {
            return _bagRepository.GetAllBag();
        }

        public Bag GetBagById(int Id)
        {
            return _bagRepository.GetBagById(Id);
        }

        public int CreateBagByCustomerId(DTOInputBag model)
        {
            return _bagRepository.CreateBagByCustomerId(model);           
        }

        public int GetLastBag(int Id)
        {
            return _bagRepository.GetLastBag(Id);
        }

        public async Task<List<DTOOutBag>> GetBagsInWay()
        {
            return await _bagRepository.GetBagsInWay();
        }

        public List<DTOOutBag> GetBagByCustomerId(int CustomerId)
        {
            return _bagRepository.GetBagByCustomerId(CustomerId);
        }

        public List<DTOOutputBagDeatails> GetBagDeatailsById(int Id)
        {
            return _bagRepository.GetBagDeatailsById(Id);
        }

        public async Task<DTOOutputBagLastBagByDelivery> GetMyLastBagByDelivery(int Id)
        {
            return await _bagRepository.GetMyLastBagByDeliveryAsync(Id);
        }

        public async Task<DTOOutputBagLastBagByDelivery> GetMyLastBagByCustomer(int Id)
        {
            return await _bagRepository.GetMyLastBagByCustomer(Id);
        }

        public async Task<List<DTOOutputBagSearchOrdersByDateCustomer>> SearchOrdersByDateCustomer(DTOInputBagSearchByCustomer model)
        {
            return await _bagRepository.SearchOrdersByDateCustomer(model);
        }

        public async Task<List<DTOOutputBagSearchOrdersByDateAdmin>> SearchOrdersByDateAdmin(DTOInputBagSearchByCustomer model)
        {
            return await _bagRepository.SearchOrdersByDateAdmin(model);
        }

        public async Task<List<DTOOutputBagActiveDeliveries>> GetActiveDeliveries(DTOInputBagGetActiveDeliveries model)
        {
            return await _bagRepository.GetActiveDeliveries(model);
        }

        public async Task<List<DTOOutputBagSearchOrdersByDateAdmin>> SearchOrdersByDateDelivery(DTOInputBagSearchByCustomer model)
        {
            return await _bagRepository.SearchOrdersByDateDelivery(model);
        }
    }
}
