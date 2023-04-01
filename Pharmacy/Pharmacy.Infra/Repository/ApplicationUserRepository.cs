using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Pharmacy.Core.Connection;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOInput.Procedure;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Encrypt;

namespace Pharmacy.Infra.Repository
{
    public class ApplicationUserRepository : IApplicationUserRepository
    {
        IConnection _connection;

        public ApplicationUserRepository(IConnection connection)
        {
            _connection = connection;
        }


        //Customer
        public int RegisterCustomer(DTOInputCustomer model)
        {
            var PCheck = new DynamicParameters();
            PCheck.Add("@UserName", model.UserName, DbType.String, ParameterDirection.Input);
            PCheck.Add("@Email", model.Email, DbType.String, ParameterDirection.Input);
            var RC = _connection.DBContext.Query<CheckEmailAndUserName>("CheckEmailAndUserName", PCheck, commandType: CommandType.StoredProcedure);
            if(RC.AsList().Find(a=>true).CheckV) { return 0; }

            model.Password = AesOperation.EncryptString(model.Password);
            var P = new DynamicParameters();

            P.Add("@UserName", model.UserName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Password", model.Password, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Email", model.Email, DbType.String, direction: ParameterDirection.Input);
            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Block", false, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@NickName", model.NickName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Gender", model.Gender, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@Image", "", DbType.String, direction: ParameterDirection.Input);
            P.Add("@Latitude", model.Latitude, DbType.Double, direction: ParameterDirection.Input);
            P.Add("@Longitude", model.Longitude, DbType.Double, direction: ParameterDirection.Input);
            P.Add("@BranchId", model.BranchId, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@BirthDay", model.BirthDay, DbType.Date, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("RegisterCustomer", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int UpdateCustomer(DTOInputUpdeteCustomer model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);
            P.Add("@NickName", model.NickName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Gender", model.Gender, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@BirthDay", model.BirthDay, DbType.Date, direction: ParameterDirection.Input);

            return _connection.DBContext.ExecuteAsync("UpdateCustomer", P, commandType: CommandType.StoredProcedure).Result;
        }

        public int DeleteCustomer(int Id)
        {
            try
            {
                var P = new DynamicParameters();

                P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

                return _connection.DBContext.ExecuteAsync("DeleteCustomer", P, commandType: CommandType.StoredProcedure).Result;
            }
            catch
            {
                return 2;
            }

        }

        public async Task<DTOOutCustomer> GetUserCustomerData(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = await _connection.DBContext.QueryAsync<DTOOutCustomer>("GetUserCustomerData", P, commandType: CommandType.StoredProcedure);
            // 
            if(R.AsList().Count == 0) { return null; }

            return R.AsList().Find(a=>true);
        }
        public int UpdateMyLocation(DTOInputUpdateMyLocation model)
        {
            var P = new DynamicParameters();
            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Latitude", model.Latitude, DbType.Double, direction: ParameterDirection.Input);
            P.Add("@Longitude", model.Longitude, DbType.Double, direction: ParameterDirection.Input);
            P.Add("@BranchId", model.BranchId, DbType.Int32, direction: ParameterDirection.Input);

            return _connection.DBContext.ExecuteAsync("UpdateMyLocation", P, commandType: CommandType.StoredProcedure).Result;
        }







        //Admin
        public int RegisterAdmin(DTOInputEmployee model)
        {
            var PCheck = new DynamicParameters();
            PCheck.Add("@UserName", model.UserName, DbType.String, ParameterDirection.Input);
            PCheck.Add("@Email", model.Email, DbType.String, ParameterDirection.Input);
            var RC = _connection.DBContext.Query<CheckEmailAndUserName>("CheckEmailAndUserName", PCheck, commandType: CommandType.StoredProcedure);
            if (RC.AsList().Find(a => true).CheckV) { return 0; }

            model.Password = AesOperation.EncryptString(model.Password);
            var P = new DynamicParameters();

            P.Add("@UserName", model.UserName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Password", model.Password, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Email", model.Email, DbType.String, direction: ParameterDirection.Input);
            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Block", false, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@NickName", model.NickName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Gender", model.Gender, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@Image", "", DbType.String, direction: ParameterDirection.Input);
            P.Add("@BranchId", model.BranchId, DbType.Double, direction: ParameterDirection.Input);
            P.Add("@Salary", model.Salary, DbType.Double, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("RegisterAdmin", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int UpdateAdmin(DTOInputUpdeteEmployee model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);
            P.Add("@NickName", model.NickName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Gender", model.Gender, DbType.Boolean, direction: ParameterDirection.Input);

            return _connection.DBContext.ExecuteAsync("UpdateAdmin", P, commandType: CommandType.StoredProcedure).Result;
            // 
            return 1;
        }

        public int DeleteAdmin(int Id)
        {
            try
            {
                var P = new DynamicParameters();

                P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

                var R = _connection.DBContext.ExecuteAsync("DeleteEmployee", P, commandType: CommandType.StoredProcedure).Result;

                return R;
            }
            catch
            {
                return 2;
            }
        }


        //Delivery
        public int RegisterDelivery(DTOInputEmployee model)
        {
            var PCheck = new DynamicParameters();
            PCheck.Add("@UserName", model.UserName, DbType.String, ParameterDirection.Input);
            PCheck.Add("@Email", model.Email, DbType.String, ParameterDirection.Input);
            var RC = _connection.DBContext.Query<CheckEmailAndUserName>("CheckEmailAndUserName", PCheck, commandType: CommandType.StoredProcedure);
            if (RC.AsList().Find(a => true).CheckV) { return 0; }

            model.Password = AesOperation.EncryptString(model.Password);
            var P = new DynamicParameters();

            P.Add("@UserName", model.UserName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Password", model.Password, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Email", model.Email, DbType.String, direction: ParameterDirection.Input);
            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Block", false, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@NickName", model.NickName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Gender", model.Gender, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@Image", "", DbType.String, direction: ParameterDirection.Input);
            P.Add("@BranchId", model.BranchId, DbType.Double, direction: ParameterDirection.Input);
            P.Add("@Salary", model.Salary, DbType.Double, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("RegisterDelivery", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int UpdateDelivery(DTOInputUpdeteEmployee model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);
            P.Add("@NickName", model.NickName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Gender", model.Gender, DbType.Boolean, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("UpdateDelivery", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int DeleteDelivery(int Id)
        {
            try
            {
                var P = new DynamicParameters();

                P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

                var R = _connection.DBContext.ExecuteAsync("DeleteEmployee", P, commandType: CommandType.StoredProcedure).Result;

                return R;
            }
            catch
            {
                return 2;
            }
        }


        //Employee
        public async Task<DTOOutEmployee> GetUserEmployeeData(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = await _connection.DBContext.QueryAsync<DTOOutEmployee>("GetUserEmployeeData", P, commandType: CommandType.StoredProcedure);
            // 
            if (R.AsList().Count == 0) { return null; }

            return R.AsList().Find(a => true);
        }


        //User
        public int EditUser(DTOInputUser model)
        {
            var P = new DynamicParameters();
            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@UserName", model.UserName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Email", model.Email, DbType.String, direction: ParameterDirection.Input);
            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);
            P.Add("@NickName", model.NickName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Gender", model.Gender, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@BranchId", model.BranchId, DbType.Int32, direction: ParameterDirection.Input);

            return _connection.DBContext.ExecuteAsync("EditUser", P, commandType: CommandType.StoredProcedure).Result;
        }

        public DTOOutUser GetUserById(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOOutUser>("GetUserById", P, commandType: CommandType.StoredProcedure).AsList();
             
            if (R.Count == 0) { return null; }

            return R.Find(a => true);
        }

        public List<DTOOutEmployee> SearchAdminByPhoneNumber(DTOInputSearchEmployeeByPhoneNumber model)
        {
            var P = new DynamicParameters();

            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOOutEmployee>("SearchAdminByPhoneNumber", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOOutEmployee> SearchAdminByBranch(DTOInputSearchEmployeeByBranch model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOOutEmployee>("SearchAdminByBranch", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public async Task<List<DTOOutDelivery>> GetInactiveDeliveries(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = await _connection.DBContext.QueryAsync<DTOOutDelivery>("GetInactiveDeliveries", P, commandType: CommandType.StoredProcedure);
            // 
            return R.AsList();
        }

        public int UpdateSuperUser(DTOInputUpdeteEmployee model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);
            P.Add("@NickName", model.NickName, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Gender", model.Gender, DbType.Boolean, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("UpdateSuperUser", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public List<DTOOutCustomer> SearchCustomerByUserName(DTOInputCustomerSearchByUserName model)
        {
            var P = new DynamicParameters();

            P.Add("@UserName", model.UserName, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOOutCustomer>("SearchCustomerByUserName", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOOutCustomer> SearchCustomerByPhoneNumber(DTOInputCustomerSearchByPhoneNumber model)
        {
            var P = new DynamicParameters();

            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOOutCustomer>("SearchCustomerByPhoneNumber", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOOutCustomer> SearchCustomerByEmail(DTOInputCustomerSearchByEmail model)
        {
            var P = new DynamicParameters();

            P.Add("@Email", model.Email, DbType.String, direction: ParameterDirection.Input);

            var R= _connection.DBContext.Query<DTOOutCustomer>("SearchCustomerByEmail", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOOutCustomer> SearchCustomerByBranch(DTOInputCustomerSearchByBranch model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);

            var R= _connection.DBContext.Query<DTOOutCustomer>("SearchCustomerByBranch", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOOutCustomer> SearchCustomerByBirthDay(DTOInputCustomerSearchByBirthDay model)
        {
            var P = new DynamicParameters();

            P.Add("@StartBirthDay", model.StartBirthDay, DbType.Date, direction: ParameterDirection.Input);
            P.Add("@EndBirthDay", model.EndBirthDay, DbType.Date, direction: ParameterDirection.Input);

            var R= _connection.DBContext.Query<DTOOutCustomer>("SearchCustomerByBirthDay", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOOutDelivery> GetDeliveryByBranchId(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);
            var R = _connection.DBContext.Query<DTOOutDelivery>("GetDeliveryByBranchId", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOOutEmployee> SearchDeliveryByPhoneNumber(DTOInputSearchEmployeeByPhoneNumber model)
        {
            var P = new DynamicParameters();

            P.Add("@PhoneNumber", model.PhoneNumber, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOOutEmployee>("SearchDeliveryByPhoneNumber", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOOutEmployee> SearchDeliveryByBranch(DTOInputSearchEmployeeByBranch model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOOutEmployee>("SearchDeliveryByBranch", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }
    }
}
