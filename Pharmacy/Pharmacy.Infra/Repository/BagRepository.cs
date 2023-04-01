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
    public class BagRepository: IBagRepository
    {
        private readonly IConnection _dBContext;
        public BagRepository(IConnection dBContext)
        {
            _dBContext = dBContext;
        }

        public List<Bag> GetAllBag()
        {
            var result = _dBContext.DBContext.Query<Bag>("GetAllBag", commandType: CommandType.StoredProcedure);
            var R = result.ToList();
             
            return R;
        }

        public Bag GetBagById(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Bag>("GetBagById", para, commandType: CommandType.StoredProcedure);
             
            return result.FirstOrDefault();
        }

        public int CreateBagByCustomerId(DTOInputBag model)
        {
            try
            {
                var para = new DynamicParameters();
                para.Add("@CustomerId", model.CustomerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
                para.Add("@PaymentType", model.PaymentType, dbType: DbType.Boolean, direction: ParameterDirection.Input);
                var result = _dBContext.DBContext.ExecuteAsync("CreateBagByCustomerId", para, commandType: CommandType.StoredProcedure);
                // 
                return result.Result;
            }
            catch
            {
                return 2;
            }
        }

        public int GetLastBag(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<Bag>("GetLastBag", para, commandType: CommandType.StoredProcedure);
            // 
            return result.FirstOrDefault().Id;
        }

        public async Task<List<DTOOutBag>> GetBagsInWay()
        {
            var result = await _dBContext.DBContext.QueryAsync<DTOOutBag>("GetBagsInWay", commandType: CommandType.StoredProcedure);
             
            return result.AsList();
        }

        public List<DTOOutBag> GetBagByCustomerId(int CustomerId)
        {
            var para = new DynamicParameters();
            para.Add("@CustomerId", CustomerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<DTOOutBag>("GetBagByCustomerId", para, commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public List<DTOOutputBagDeatails> GetBagDeatailsById(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<DTOOutputBagDeatails>("GetBagDeatailsById", para, commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public async Task<DTOOutputBagLastBagByDelivery> GetMyLastBagByDeliveryAsync(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var R = await _dBContext.DBContext.QueryAsync<DTOOutputBagLastBagByDelivery, ProductBag, DTOOutputBagLastBagByDelivery>("GetMyLastBagByDelivery", (Bag, Product) =>
            {
                Bag.Product = Bag.Product ?? new List<ProductBag>();
                Bag.Product.Add(Product);
                return Bag;
            },
            splitOn : "ProductId"
            ,param: para, commandType: CommandType.StoredProcedure);

             

            if (!R.Any()) { return null; }
            var Result = R.GroupBy(a => a.Id).Select(Group =>
            {
                var Bag = new DTOOutputBagLastBagByDelivery();
                Bag = R.First();

                Bag.Product = R.Select(a => a.Product.Single()).GroupBy(a => a.ProductId).Select(P => { return P.First(); }).ToList();
                return Bag;
            });


            
            return Result.First();
        }

        public async Task<DTOOutputBagLastBagByDelivery> GetMyLastBagByCustomer(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var R = await _dBContext.DBContext.QueryAsync<DTOOutputBagLastBagByDelivery, ProductBag, DTOOutputBagLastBagByDelivery>("GetMyLastBagByCustomer", (Bag, Product) =>
            {
                Bag.Product = Bag.Product ?? new List<ProductBag>();
                Bag.Product.Add(Product);
                return Bag;
            },
            splitOn: "ProductId"
            , param: para, commandType: CommandType.StoredProcedure);

            if (!R.Any()) { return null; }
            var Result = R.GroupBy(a => a.Id).Select(Group =>
            {
                var Bag = new DTOOutputBagLastBagByDelivery();
                Bag = R.First();

                Bag.Product = R.Select(a => a.Product.Single()).GroupBy(a => a.ProductId).Select(P => { return P.First(); }).ToList();
                return Bag;
            });



            return Result.First();
        }

        public async Task<List<DTOOutputBagSearchOrdersByDateCustomer>> SearchOrdersByDateCustomer(DTOInputBagSearchByCustomer model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@StartDate", model.StartDate, DbType.DateTime, direction: ParameterDirection.Input);
            P.Add("@EndDate", model.EndDate, DbType.DateTime, direction: ParameterDirection.Input);

            var Output = await _dBContext.DBContext.QueryAsync<DTOOutputBagSearchOrdersByDateCustomer,
                OrderLogBagSearchByCustomer, ProductBagSearchByCustomer,
                DTOOutputBagSearchOrdersByDateCustomer>("SearchOrdersByDateCustomer", (Bag,OrderLog
                , Product
                ) =>
                {
                    Bag.OrderLog = Bag.OrderLog ?? new List<OrderLogBagSearchByCustomer>();
                    Bag.OrderLog.Add(OrderLog);
                    Bag.Product = Bag.Product ?? new List<ProductBagSearchByCustomer>();
                    Bag.Product.Add(Product);
                    return Bag;
                },
            splitOn: "BagId"
            , param: P
            , commandType: CommandType.StoredProcedure);

            var MyBag = Output.AsList().GroupBy(a => a.Id).Select(g =>
            {
                var Bag = g.First();

                Bag.OrderLog = g.Select(a => a.OrderLog.Single()).GroupBy(a => a.OrderLogId).Select(m => { return m.Last(); }).ToList();
                Bag.Product = g.Select(a => a.Product.Single()).GroupBy(a => a.OrderId).Select(m => { return m.First(); }).ToList();
                return Bag;
            });

            return MyBag.AsList();
        }
        public async Task<List<DTOOutputBagSearchOrdersByDateAdmin>> SearchOrdersByDateAdmin(DTOInputBagSearchByCustomer model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@StartDate", model.StartDate, DbType.DateTime, direction: ParameterDirection.Input);
            P.Add("@EndDate", model.EndDate, DbType.DateTime, direction: ParameterDirection.Input);

            var Output = await _dBContext.DBContext.QueryAsync<DTOOutputBagSearchOrdersByDateAdmin,
                OrderLogBagSearchByCustomer, ProductBagSearchByCustomer,
                DTOOutputBagSearchOrdersByDateAdmin>("SearchOrdersByDateAdmin", (Bag, OrderLog
                , Product
                ) =>
                {
                    Bag.OrderLog = Bag.OrderLog ?? new List<OrderLogBagSearchByCustomer>();
                    Bag.OrderLog.Add(OrderLog);
                    Bag.Product = Bag.Product ?? new List<ProductBagSearchByCustomer>();
                    Bag.Product.Add(Product);
                    return Bag;
                },
            splitOn: "BagId"
            , param: P
            , commandType: CommandType.StoredProcedure);

             

            var MyBag = Output.AsList().GroupBy(a => a.Id).Select(g =>
            {
                var Bag = g.First();

                Bag.OrderLog = g.Select(a => a.OrderLog.Single()).GroupBy(a => a.OrderLogId).Select(m => { return m.Last(); }).ToList();
                Bag.Product = g.Select(a => a.Product.Single()).GroupBy(a => a.OrderId).Select(m => { return m.First(); }).ToList();
                return Bag;
            });

            return MyBag.AsList();
        }
        public async Task<List<DTOOutputBagSearchOrdersByDateAdmin>> SearchOrdersByDateDelivery(DTOInputBagSearchByCustomer model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@StartDate", model.StartDate, DbType.DateTime, direction: ParameterDirection.Input);
            P.Add("@EndDate", model.EndDate, DbType.DateTime, direction: ParameterDirection.Input);

            var Output = await _dBContext.DBContext.QueryAsync<DTOOutputBagSearchOrdersByDateAdmin,
                OrderLogBagSearchByCustomer, ProductBagSearchByCustomer,
                DTOOutputBagSearchOrdersByDateAdmin>("SearchOrdersByDateDelivery", (Bag, OrderLog
                , Product
                ) =>
                {
                    Bag.OrderLog = Bag.OrderLog ?? new List<OrderLogBagSearchByCustomer>();
                    Bag.OrderLog.Add(OrderLog);
                    Bag.Product = Bag.Product ?? new List<ProductBagSearchByCustomer>();
                    Bag.Product.Add(Product);
                    return Bag;
                },
            splitOn: "BagId"
            , param: P
            , commandType: CommandType.StoredProcedure);



            var MyBag = Output.AsList().GroupBy(a => a.Id).Select(g =>
            {
                var Bag = g.First();

                Bag.OrderLog = g.Select(a => a.OrderLog.Single()).GroupBy(a => a.OrderLogId).Select(m => { return m.Last(); }).ToList();
                Bag.Product = g.Select(a => a.Product.Single()).GroupBy(a => a.OrderId).Select(m => { return m.First(); }).ToList();
                return Bag;
            });

            return MyBag.AsList();
        }

        public async Task<List<DTOOutputBagActiveDeliveries>> GetActiveDeliveries(DTOInputBagGetActiveDeliveries model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);

            var Output = await _dBContext.DBContext.QueryAsync<
                DTOOutputBagActiveDeliveries, DTOOutputBagActiveDeliveriesOrder,
                DTOOutputBagActiveDeliveries>("GetActiveDeliveries", (Delivery, Order) =>
                {
                    Delivery.Orders = Delivery.Orders ?? new List<DTOOutputBagActiveDeliveriesOrder>();
                    Delivery.Orders.Add(Order);
                    return Delivery;
                },
            splitOn: "OrderId"
            , param: P
            , commandType: CommandType.StoredProcedure);



            var MyBag = Output.AsList().GroupBy(a => a.ApplicationUserId).Select(g =>
            {
                var Bag = g.First();

                Bag.Orders = g.Select(a => a.Orders.Single()).GroupBy(a => a.OrderId).Select(m => { return m.Last(); }).ToList();
                return Bag;
            });

            return MyBag.AsList();
        }
    }
}
