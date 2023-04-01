using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Infra.Service
{
    public class CategoryService : ICategoryService
    {
        readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public int AddCategory(DTOInputCategory model)
        {
            return _categoryRepository.AddCategory(model);
        }

        public int DeleteCategory(int Id)
        {
            return _categoryRepository.DeleteCategory(Id);
        }

        public List<Category> GetAll()
        {
            return _categoryRepository.GetAll();
        }

        public int UpdateCategory(DTOInputCategory model)
        {
            return _categoryRepository.UpdateCategory(model);
        }
    }
}
