using Dapper;
using Pharmacy.Core.Connection;
using Pharmacy.Core.Data.DTOInput.Procedure;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.IRepository;
using Pharmacy.Encrypt;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Pharmacy.Infra.Repository
{
    public class SharedRepository : ISharedRepository
    {
        IConnection _connection;

        public SharedRepository(IConnection connection)
        {
            _connection = connection;
        }
        public LogIn logIn(LogIn model)
        {
            var P = new DynamicParameters();

            P.Add("@UserName", model.UserName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Password", AesOperation.EncryptString(model.Password), DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<LogIn>("LogIn", P, commandType: CommandType.StoredProcedure).AsList();

             

            if (R.Count == 0) { return null; }

            return R.ToArray()[0];
        }

        public int UpdateImageUser(DTOInputUpdateImageUser model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Image", model.Image, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("UpdateImageUser", P, commandType: CommandType.StoredProcedure);

             

            return 1;
        }

        public int UpdateEmailUser(DTOInputUpdateEmailUser model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Email", model.Email, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("UpdateEmailUser", P, commandType: CommandType.StoredProcedure);

             

            return 1;
        }
        public int UpdateUserNameUser(DTOInputUpdateUserNameUser model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@UserName", model.UserName, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("UpdateUserNameUser", P, commandType: CommandType.StoredProcedure);

             

            return 1;
        }

        public int UpdatePasswordUser(DTOInputUpdatePasswordUser model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Password", model.Password, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("UpdatePasswordUser", P, commandType: CommandType.StoredProcedure);

             

            return 1;
        }

        public int UpdateSalaryUser(DTOInputUpdateSalaryUser model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Salary", model.Salary, DbType.Double, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("UpdateSalaryUser", P, commandType: CommandType.StoredProcedure);

             

            return 1;
        }

        public int UpdateBlockUserForAdmin(DTOInputUpdateBlockUserForAdmin model)
        {
            try
            {
                var P = new DynamicParameters();

                P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
                P.Add("@Block", model.Block, DbType.Double, direction: ParameterDirection.Input);

                var R = _connection.DBContext.ExecuteAsync("UpdateBlockUserForAdmin", P, commandType: CommandType.StoredProcedure).Result;
                 
                return R;
            }
            catch
            {
                return 2;
            }
        }

        public int UpdateBlockUserForSuperUser(DTOInputUpdateBlockUserForSuperUser model)
        {
            try
            {
                var P = new DynamicParameters();

                P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
                P.Add("@Block", model.Block, DbType.Boolean, direction: ParameterDirection.Input);

                var R = _connection.DBContext.ExecuteAsync("UpdateBlockUserForSuperUser", P, commandType: CommandType.StoredProcedure).Result;
                 
                return R;
            }
            catch
            {
                return 2;
            }
        }
    }
}
