using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pharmacy.Infra.Service
{
    public class MessageService : IMessageService
    {
        readonly IMessageRepository _messageRepository;
        public MessageService(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public int DeleteMyMessage(int Id)
        {
            return _messageRepository.DeleteMyMessage(Id);
        }

        public List<DTOOutEmployee> GetEmployeesInBranch(int Id)
        {
            return _messageRepository.GetEmployeesInBranch(Id);
        }

        public async Task<List<DTOOutMessageList>> GetMyMessage(int Id)
        {
            return await _messageRepository.GetMyMessage(Id);
        }

        public int InsertMyMessage(DTOInputMessage model)
        {
            return _messageRepository.InsertMyMessage(model);
        }
    }
}
