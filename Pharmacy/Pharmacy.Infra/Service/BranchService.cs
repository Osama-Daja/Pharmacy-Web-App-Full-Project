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
    public class BranchService : IBranchService
    {
        IBranchRepository _branchRepository;
        public BranchService(IBranchRepository branchRepository)
        {
            _branchRepository = branchRepository;
        }

        public int DeleteBranch(int Id)
        {
            return _branchRepository.DeleteBranch(Id);
        }

        public async Task<Branch> GetBranchByIdAsync(int Id)
        {
            return await _branchRepository.GetBranchById(Id);
        }

        public async Task<DTOOutBranchDetails>GetBranchDetails(int Id)
        {
            return await _branchRepository.GetBranchDetailsAsync(Id);
        }

        public async Task<List<Branch>> GetFullBranch()
        {
            return await _branchRepository.GetFullBranch();
        }

        public int InsertBranch(DTOInputBranch model)
        {
            return _branchRepository.InsertBranch(model);
        }

        public List<DTOOutBranchTrendingBranch> TrendingBranchByDate(DTOInputBranchTrendingBranchByDate model)
        {
            return _branchRepository.TrendingBranchByDate(model);
        }

        public int UpdateBranch(DTOInputUpdateBranch model)
        {
            return _branchRepository.UpdateBranch(model);
        }

        public int UpdateBranchGEO(DTOInputUpdateBranchGEO model)
        {
            return _branchRepository.UpdateBranchGEO(model);
        }

        public int UpdateWorkHour(DTOInputUpdateWorkHour model)
        {
            return _branchRepository.UpdateWorkHour(model);
        }
    }
}
