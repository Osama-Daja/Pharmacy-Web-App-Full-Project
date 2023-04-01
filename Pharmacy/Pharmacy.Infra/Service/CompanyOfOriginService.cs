using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Infra.Service
{
    public class CompanyOfOriginService : ICompanyOfOriginService
    {
        readonly ICompanyOfOriginRepository _companyOfOriginRepository;
        public CompanyOfOriginService(ICompanyOfOriginRepository companyOfOriginRepository)
        {
            _companyOfOriginRepository = companyOfOriginRepository;
        }

        public int AddCompanyOfOrigin(DTOInputCompanyOfOrigin model)
        {
            return _companyOfOriginRepository.AddCompanyOfOrigin(model);
        }

        public int DeleteCompanyOfOrigin(int Id)
        {
            return _companyOfOriginRepository.DeleteCompanyOfOrigin(Id);
        }

        public List<CompanyOfOrigin> GetAll()
        {
            return _companyOfOriginRepository.GetAll();
        }

        public int UpdateCompanyOfOrigin(DTOInputCompanyOfOriginUpdate model)
        {
            return _companyOfOriginRepository.UpdateCompanyOfOrigin(model);
        }
    }
}
