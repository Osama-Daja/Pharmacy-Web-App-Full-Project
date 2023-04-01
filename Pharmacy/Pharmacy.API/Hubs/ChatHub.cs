using Microsoft.AspNetCore.SignalR;
using Pharmacy.Core.Data.DTOOutput.Chat;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.IService;
using Pharmacy.Encrypt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pharmacy.API.Hubs
{
    public class ChatHub : Hub
    {
        IMessageService _messageService;
        public ChatHub(IMessageService messageService)
        {
            _messageService = messageService;
        }
        public Task SendMessageToUser(string connectionId, object message)
        {
            return Clients.Client(connectionId).SendAsync("SendMessageToUser", message);
        }

        public Task SendLocationToCustomer(string connectionId, object Location)
        {
            return Clients.Client(connectionId).SendAsync("SendLocationToCustomer", Location);
        }

        public async Task<List<DTOOutMessageList>> getConnectionId(string Id)
        {
            var MyId = Convert.ToInt32(AesOperation.DecryptString(Id));

            var MyConnection = new ConnectionUsers() { Id = MyId, IdConnection = Context.ConnectionId,CurrentDate=DateTime.Now };
            ConnectedUser.Users.Add(MyConnection);

            var R = await _messageService.GetMyMessage(MyId);
            _messageService.DeleteMyMessage(MyId);

            return R;
        }
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception ex)
        {
            var MyConnection = ConnectedUser.Users.FirstOrDefault(a => a.IdConnection == Context.ConnectionId);
            ConnectedUser.Users.Remove(MyConnection);
            return base.OnDisconnectedAsync(ex);
        }

        public static class ConnectedUser
        {
            public static List<ConnectionUsers> Users = new List<ConnectionUsers>();
        }
    }
}
