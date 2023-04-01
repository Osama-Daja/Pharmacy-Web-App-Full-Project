using Dapper;
using Pharmacy.Core.Connection;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Pharmacy.Infra.Repository
{
    public class ContactURepository : IContactURepository
    {
        private readonly IConnection _dBContext;        
        public ContactURepository(IConnection dBContext)
        {
            _dBContext = dBContext;
        }

        public List<ContactU> GetAllContactUs()
        {
            var result = _dBContext.DBContext.Query<ContactU>("GetAllContactUs", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }
        
        public ContactU GetContactUsById(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<ContactU>("GetContactUsById", para, commandType: CommandType.StoredProcedure);
             
            return result.FirstOrDefault();
        }

        public int CreateContactUs(DTOInputContactU contactU)
        {
            var para = new DynamicParameters();
            para.Add("@Name", contactU.Name, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@Email", contactU.Email, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@PhoneNumber", contactU.PhoneNumber, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@Message", contactU.Message, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.ExecuteAsync("CreateContactUs", para, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int UpdateContactUs(DTOInputContactU contactU)
        {
            var para = new DynamicParameters();
            para.Add("@Id", contactU.Id, DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@Id", contactU.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            para.Add("@Name", contactU.Name, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@Email", contactU.Email, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@PhoneNumber", contactU.PhoneNumber, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@Message", contactU.Message, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = _dBContext.DBContext.ExecuteAsync("UpdateContactUs", para, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int DeleteContactUs(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.ExecuteAsync("DeleteContactUs", para, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public List<DTOInputContactU> SearchContactUsByEmail(DTOInputInputContactusSearchByEmail model)
        {
            var P = new DynamicParameters();

            P.Add("@Email", model.Email, DbType.String, direction: ParameterDirection.Input);

            var R = _dBContext.DBContext.Query<DTOInputContactU>("SearchContactUsByEmail", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOInputContactU> SearchContactUsByPhoneNumber(DTOInputContactusByPhoneNumber model)
        {
            var P = new DynamicParameters();

            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);

            var R = _dBContext.DBContext.Query<DTOInputContactU>("SearchContactusByPhoneNumber", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }
    }
}
