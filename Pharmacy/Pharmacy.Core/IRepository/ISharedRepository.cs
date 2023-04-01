using Pharmacy.Core.Data.DTOInput.Procedure;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.IRepository
{
    public interface ISharedRepository
    {
        LogIn logIn(LogIn model);
        int UpdateImageUser(DTOInputUpdateImageUser model);
        int UpdateUserNameUser(DTOInputUpdateUserNameUser model);
        int UpdateEmailUser(DTOInputUpdateEmailUser model);
        int UpdatePasswordUser(DTOInputUpdatePasswordUser model);
        int UpdateSalaryUser(DTOInputUpdateSalaryUser model);
        int UpdateBlockUserForAdmin(DTOInputUpdateBlockUserForAdmin model);
        int UpdateBlockUserForSuperUser(DTOInputUpdateBlockUserForSuperUser model);
    }
}
