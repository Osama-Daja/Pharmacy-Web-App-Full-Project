using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.IService
{
   public interface ICompanyOfOriginService
    {
        int AddCompanyOfOrigin(DTOInputCompanyOfOrigin model);
        int UpdateCompanyOfOrigin(DTOInputCompanyOfOriginUpdate model);
        int DeleteCompanyOfOrigin(int Id);

        List<CompanyOfOrigin> GetAll();
    }
}
