using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.IService
{
    public interface IContactUService
    {
        List<ContactU> GetAllContactUs();
        ContactU GetContactUsById(int Id);
        int CreateContactUs(DTOInputContactU contactU);
        int UpdateContactUs(DTOInputContactU contactU);
        int DeleteContactUs(int Id);

        List<DTOInputContactU> SearchContactUsByEmail(DTOInputInputContactusSearchByEmail model);
        List<DTOInputContactU> SearchContactUsByPhoneNumber(DTOInputContactusByPhoneNumber model);
    }
}
