using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.IRepository
{
   public interface ICategoryRepository
    {
        int AddCategory(DTOInputCategory model);
        int UpdateCategory(DTOInputCategory model);
        int DeleteCategory(int Id);

        List<Category> GetAll();
    }
}
