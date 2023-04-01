using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Core.IService
{
    public interface IMessageService
    {
        Task<List<DTOOutMessageList>> GetMyMessage(int Id);
        int InsertMyMessage(DTOInputMessage model);
        int DeleteMyMessage(int Id);
        List<DTOOutEmployee> GetEmployeesInBranch(int Id);
    }
}
