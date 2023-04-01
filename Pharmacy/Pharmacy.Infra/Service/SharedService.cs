using Microsoft.IdentityModel.Tokens;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.IRepository;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Pharmacy.Encrypt;
using Pharmacy.Core.Data.DTOInput.Procedure;
using Pharmacy.Core.IService;

namespace Pharmacy.Infra.Repository
{
    public class SharedService : ISharedService
    {
        readonly ISharedRepository _sharedRepository;
        public SharedService(ISharedRepository repositoryShared)
        {
            _sharedRepository = repositoryShared;
        }
        public string logIn(LogIn model)
        {
            
            var LogIn = _sharedRepository.logIn(model);
            if (LogIn == null) { return null; }
            if (LogIn.Block) { return "Block"; }
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes("***^-^Online^_^Pharmacy^-^***");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
            {
new Claim("UserId", AesOperation.EncryptString(LogIn.Id.ToString())),
new Claim(ClaimTypes.Role, LogIn.RoleName)
            }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }

        public int UpdateImageUser(DTOInputUpdateImageUser model)
        {
            return _sharedRepository.UpdateImageUser(model);
        }

        public int UpdateEmailUser(DTOInputUpdateEmailUser model)
        {
            return _sharedRepository.UpdateEmailUser(model);
        }
        public int UpdateUserNameUser(DTOInputUpdateUserNameUser model)
        {
            return _sharedRepository.UpdateUserNameUser(model);
        }

        public int UpdatePasswordUser(DTOInputUpdatePasswordUser model)
        {
            return _sharedRepository.UpdatePasswordUser(model);
        }

        public int UpdateSalaryUser(DTOInputUpdateSalaryUser model)
        {
            return _sharedRepository.UpdateSalaryUser(model);
        }

        public int UpdateBlockUserForAdmin(DTOInputUpdateBlockUserForAdmin model)
        {
            return _sharedRepository.UpdateBlockUserForAdmin(model);
        }

        public int UpdateBlockUserForSuperUser(DTOInputUpdateBlockUserForSuperUser model)
        {
            return _sharedRepository.UpdateBlockUserForSuperUser(model);
        }
    }
}
