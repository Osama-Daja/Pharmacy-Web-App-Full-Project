using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Pharmacy.Core.Data.Models;
using Microsoft.AspNetCore.SignalR;
using Pharmacy.API.Hubs;
using static Pharmacy.API.Hubs.ChatHub;

namespace Pharmacy.API.BackGroundService
{
    public class Service : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        public Service(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    try
                    {
                        await Task.Delay(new TimeSpan(0, 0, 10));
                        var _bagService = (IBagService)scope.ServiceProvider.GetRequiredService(typeof(IBagService));
                        var _orderLogService = (IOrderLogService)scope.ServiceProvider.GetRequiredService(typeof(IOrderLogService));
                        var _applicationUserService = (IApplicationUserService)scope.ServiceProvider.GetRequiredService(typeof(IApplicationUserService));
                        var _chatHubContext = (IHubContext<ChatHub>)scope.ServiceProvider.GetRequiredService(typeof(IHubContext<ChatHub>));
                        var AllBags = await _bagService.GetBagsInWay();

                        foreach (var B in AllBags)
                        {
                            var Customer = await _applicationUserService.GetUserCustomerData(B.CustomerId);
                            var CustomerPoint = new Point(x: Customer.Latitude, Customer.Longitude);
                            var DeliveryList = await _applicationUserService.GetInactiveDeliveries(Customer.BranchId);
                            if (DeliveryList.Any())
                            {
                                var BestDelivery = DeliveryList.OrderBy(a => new Point(x: a.Latitude, y: a.Longitude).Distance(CustomerPoint)).FirstOrDefault();

                                OrderLog orderLog = new OrderLog()
                                {
                                    BagId = B.Id,
                                    Status = 1,
                                    DeliveryId = BestDelivery.ApplicationUserId,
                                    PaymentType = B.PaymentType
                                };

                                if (ConnectedUser.Users.Any())
                                {
                                    var LastBag = await _bagService.GetMyLastBagByCustomer(B.CustomerId);
                                    var D = await _applicationUserService.GetUserEmployeeData(BestDelivery.ApplicationUserId);
                                    LastBag.Status = 1;
                                    var Con = ConnectedUser.Users.Where(a => a.Id == BestDelivery.ApplicationUserId);
                                    var Message = new
                                    {
                                        Bag = LastBag,
                                        Delivery = new
                                        {
                                            D.Image,
                                            D.NickName,
                                            D.PhoneNumber,
                                        }
                                    };

                                    if (Con.Any())
                                    {
                                        await _chatHubContext.Clients.Clients(Con.OrderBy(a => a.CurrentDate).Last().IdConnection)
                                            .SendAsync("SendLocationToCustomer", Message);
                                    }
                                    Con = ConnectedUser.Users.Where(a => a.Id == B.CustomerId);
                                    if (Con != null)
                                    {
                                        await _chatHubContext.Clients.Clients(Con.OrderBy(a => a.IdConnection).Last().IdConnection)
                                            .SendAsync("SendLocationToCustomer", Message);
                                    }
                                }

                                await _orderLogService.CreateOrderLog(orderLog);
                            }
                        }
                    }
                    catch
                    {

                    }
                }
            }
        }
    }
}
