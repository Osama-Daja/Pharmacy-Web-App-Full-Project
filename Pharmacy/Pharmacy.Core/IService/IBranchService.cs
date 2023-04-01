using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Core.IService
{
    public interface IBranchService
    {
        Task<List<Branch>> GetFullBranch();
        int InsertBranch(DTOInputBranch model);
        int DeleteBranch(int Id);
        int UpdateBranch(DTOInputUpdateBranch model);
        int UpdateBranchGEO(DTOInputUpdateBranchGEO model);
        int UpdateWorkHour(DTOInputUpdateWorkHour model);
        Task<Branch> GetBranchByIdAsync(int Id);
        Task<DTOOutBranchDetails> GetBranchDetails(int Id);
        List<DTOOutBranchTrendingBranch> TrendingBranchByDate(DTOInputBranchTrendingBranchByDate model);
    }
}
