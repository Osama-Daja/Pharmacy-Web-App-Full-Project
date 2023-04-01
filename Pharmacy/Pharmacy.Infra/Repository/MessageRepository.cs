using Dapper;
using Pharmacy.Core.Connection;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Infra.Repository
{
    public class MessageRepository : IMessageRepository
    {
        IConnection _connection;

        public MessageRepository(IConnection connection)
        {
            _connection = connection;
        }

        public int DeleteMyMessage(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

            _connection.DBContext.ExecuteAsync("DeleteMyMessage", P,commandType:CommandType.StoredProcedure);
             
            return 1;

        }

        public List<DTOOutEmployee> GetEmployeesInBranch(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOOutEmployee>("GetEmployeesInBranch", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public async Task<List<DTOOutMessageList>> GetMyMessage(int Id)
        {
            
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);
            
            var R = await _connection.DBContext.QueryAsync<DTOOutMessageList, DTOOutMessage, DTOOutMessageList>("GetMyMessage",(user,message)=>
            {
                user.Messages = user.Messages ?? new List<DTOOutMessage>();
                user.Messages.Add(message);
                return user;
            },
            splitOn:"Id"
            ,param:P
            ,commandType: CommandType.StoredProcedure);

             

            var NewList = R.AsList<DTOOutMessageList>().GroupBy(a => a.Email).Select(g => {
                var User = new DTOOutMessageList();
                User = g.First();

                User.Messages = g.Select(a => a.Messages.Single()).GroupBy(a => a.Id).Select(m => { return m.First(); }).ToList();
                return User;
            }).ToList();

            return NewList;
        }

        public int InsertMyMessage(DTOInputMessage model)
        {
            var P = new DynamicParameters();

            P.Add("@FromId", model.FromId, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@ToId", model.ToId, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Text", model.Text, DbType.String, direction: ParameterDirection.Input);
            P.Add("@CurrentDate", model.CurrentDate, DbType.DateTime, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("InsertMyMessage", P, commandType: CommandType.StoredProcedure);

             

            return 1;
        }
    }
}
