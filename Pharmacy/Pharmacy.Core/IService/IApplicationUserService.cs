using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOInput.Procedure;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Core.IService
{
    public interface IApplicationUserService
    {
        //---------------------------------------------------------------------------Customer
        int RegisterCustomer(DTOInputCustomer model);
        int UpdateCustomer(DTOInputUpdeteCustomer model);
        int DeleteCustomer(int Id);
        Task<DTOOutCustomer> GetUserCustomerData(int Id);
        int UpdateMyLocation(DTOInputUpdateMyLocation model);
        //Search
        List<DTOOutCustomer> SearchCustomerByUserName(DTOInputCustomerSearchByUserName model);
        List<DTOOutCustomer> SearchCustomerByPhoneNumber(DTOInputCustomerSearchByPhoneNumber model);
        List<DTOOutCustomer> SearchCustomerByEmail(DTOInputCustomerSearchByEmail model);
        List<DTOOutCustomer> SearchCustomerByBranch(DTOInputCustomerSearchByBranch model);
        List<DTOOutCustomer> SearchCustomerByBirthDay(DTOInputCustomerSearchByBirthDay model);

        //---------------------------------------------------------------------------SuperUser
        int UpdateSuperUser(DTOInputUpdeteEmployee model);

        //---------------------------------------------------------------------------Admin
        int RegisterAdmin(DTOInputEmployee model);
        int UpdateAdmin(DTOInputUpdeteEmployee model);
        int DeleteAdmin(int Id);
        //Search
        List<DTOOutEmployee> SearchAdminByPhoneNumber(DTOInputSearchEmployeeByPhoneNumber model);
        List<DTOOutEmployee> SearchAdminByBranch(DTOInputSearchEmployeeByBranch model);

        //---------------------------------------------------------------------------Delivery
        int RegisterDelivery(DTOInputEmployee model);
        int UpdateDelivery(DTOInputUpdeteEmployee model);
        int DeleteDelivery(int Id);
        Task<List<DTOOutDelivery>> GetInactiveDeliveries(int Id);
        List<DTOOutDelivery> GetDeliveryByBranchId(int Id);
        //Search
        List<DTOOutEmployee> SearchDeliveryByPhoneNumber(DTOInputSearchEmployeeByPhoneNumber model);
        List<DTOOutEmployee> SearchDeliveryByBranch(DTOInputSearchEmployeeByBranch model);

        //---------------------------------------------------------------------------Employee
        Task<DTOOutEmployee> GetUserEmployeeData(int Id);
        DTOOutUser GetUserById(int Id);


        //---------------------------------------------------------------------------User
        int EditUser(DTOInputUser model);
    }
}
