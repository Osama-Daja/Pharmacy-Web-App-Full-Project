using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOInput.Procedure;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;

namespace Pharmacy.Infra.Repository
{
    public class ApplicationUserService : IApplicationUserService
    {
        readonly IApplicationUserRepository _applicationUserRepository;
        public ApplicationUserService(IApplicationUserRepository repositoryApplicationUser)
        {
            _applicationUserRepository = repositoryApplicationUser;
        }

        public int RegisterCustomer(DTOInputCustomer model)
        {
            return _applicationUserRepository.RegisterCustomer(model);
        }

        public int UpdateCustomer(DTOInputUpdeteCustomer model)
        {
            return _applicationUserRepository.UpdateCustomer(model);
        }

        public int DeleteCustomer(int Id)
        {
            return _applicationUserRepository.DeleteCustomer(Id);
        }

        public async Task<DTOOutCustomer> GetUserCustomerData(int Id)
        {
            return await _applicationUserRepository.GetUserCustomerData(Id);
        }

        public int RegisterAdmin(DTOInputEmployee model)
        {
            return _applicationUserRepository.RegisterAdmin(model);
        }

        public int UpdateAdmin(DTOInputUpdeteEmployee model)
        {
            return _applicationUserRepository.UpdateAdmin(model);
        }

        public int DeleteAdmin(int Id)
        {
            return _applicationUserRepository.DeleteAdmin(Id);
        }

        public async Task<DTOOutEmployee> GetUserEmployeeData(int Id)
        {
            return await _applicationUserRepository.GetUserEmployeeData(Id);
        }

        public int EditUser(DTOInputUser model)
        {
            return _applicationUserRepository.EditUser(model);
        }

        public int UpdateMyLocation(DTOInputUpdateMyLocation model)
        {
            return _applicationUserRepository.UpdateMyLocation(model);
        }

        public DTOOutUser GetUserById(int Id)
        {
            return _applicationUserRepository.GetUserById(Id);
        }

        public int RegisterDelivery(DTOInputEmployee model)
        {
            return _applicationUserRepository.RegisterDelivery(model);
        }

        public int UpdateDelivery(DTOInputUpdeteEmployee model)
        {
            return _applicationUserRepository.UpdateDelivery(model);
        }

        public int DeleteDelivery(int Id)
        {
            return _applicationUserRepository.DeleteDelivery(Id);
        }

        public List<DTOOutEmployee> SearchAdminByPhoneNumber(DTOInputSearchEmployeeByPhoneNumber model)
        {
            return _applicationUserRepository.SearchAdminByPhoneNumber(model);
        }

        public List<DTOOutEmployee> SearchAdminByBranch(DTOInputSearchEmployeeByBranch model)
        {
            return _applicationUserRepository.SearchAdminByBranch(model);
        }

        public async Task<List<DTOOutDelivery>> GetInactiveDeliveries(int Id)
        {
            return await _applicationUserRepository.GetInactiveDeliveries(Id);
        }

        public int UpdateSuperUser(DTOInputUpdeteEmployee model)
        {
            return _applicationUserRepository.UpdateSuperUser(model);
        }

        public List<DTOOutCustomer> SearchCustomerByUserName(DTOInputCustomerSearchByUserName model)
        {
            return _applicationUserRepository.SearchCustomerByUserName(model);
        }

        public List<DTOOutCustomer> SearchCustomerByPhoneNumber(DTOInputCustomerSearchByPhoneNumber model)
        {
            return _applicationUserRepository.SearchCustomerByPhoneNumber(model);
        }

        public List<DTOOutCustomer> SearchCustomerByEmail(DTOInputCustomerSearchByEmail model)
        {
            return _applicationUserRepository.SearchCustomerByEmail(model);
        }

        public List<DTOOutCustomer> SearchCustomerByBranch(DTOInputCustomerSearchByBranch model)
        {
            return _applicationUserRepository.SearchCustomerByBranch(model);
        }

        public List<DTOOutCustomer> SearchCustomerByBirthDay(DTOInputCustomerSearchByBirthDay model)
        {
            return _applicationUserRepository.SearchCustomerByBirthDay(model);
        }

        public List<DTOOutDelivery> GetDeliveryByBranchId(int Id)
        {
           return  _applicationUserRepository.GetDeliveryByBranchId(Id);
        }

        public List<DTOOutEmployee> SearchDeliveryByPhoneNumber(DTOInputSearchEmployeeByPhoneNumber model)
        {
            return _applicationUserRepository.SearchDeliveryByPhoneNumber(model);
        }

        public List<DTOOutEmployee> SearchDeliveryByBranch(DTOInputSearchEmployeeByBranch model)
        {
            return _applicationUserRepository.SearchDeliveryByBranch(model);
        }
    }
}
