using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Core.IRepository
{
    public interface IBranchRepository
    {
        Task<List<Branch>> GetFullBranch();
        int InsertBranch(DTOInputBranch model);
        int DeleteBranch(int Id);
        int UpdateBranch(DTOInputUpdateBranch model);
        int UpdateBranchGEO(DTOInputUpdateBranchGEO model);
        int UpdateWorkHour(DTOInputUpdateWorkHour model);
        Task<Branch> GetBranchById(int Id);
        Task<DTOOutBranchDetails> GetBranchDetailsAsync(int Id);
        List<DTOOutBranchTrendingBranch> TrendingBranchByDate(DTOInputBranchTrendingBranchByDate model);
    }
}
