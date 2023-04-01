
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Infra.Service
{
    public class ContactUService: IContactUService
    {
        private readonly IContactURepository _contactURepository;
        public ContactUService(IContactURepository contactURepository)
        {
            _contactURepository = contactURepository;
        }
        
        public List<ContactU> GetAllContactUs()
        {
            return _contactURepository.GetAllContactUs();
        }
        public ContactU GetContactUsById(int Id)
        {
            return _contactURepository.GetContactUsById(Id);
        }
        public int CreateContactUs(DTOInputContactU contactU)
        {
            return _contactURepository.CreateContactUs(contactU);
        }

        public int UpdateContactUs(DTOInputContactU contactU)
        {
            return _contactURepository.UpdateContactUs(contactU);
        }
        public int DeleteContactUs(int Id)
        {
            return _contactURepository.DeleteContactUs(Id);
             
        }

        public List<DTOInputContactU> SearchContactUsByEmail(DTOInputInputContactusSearchByEmail model)
        {
            return _contactURepository.SearchContactUsByEmail(model);
        }

        public List<DTOInputContactU> SearchContactUsByPhoneNumber(DTOInputContactusByPhoneNumber model)
        {
            return _contactURepository.SearchContactUsByPhoneNumber(model);
        }
    }
}
