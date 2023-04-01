using Dapper;
using Pharmacy.Core.Connection;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Pharmacy.Infra.Repository
{
    public class DeliveryLocationRepository : IDeliveryLocationRepository
    {
        IConnection _connection;

        public DeliveryLocationRepository(IConnection connection)
        {
            _connection = connection;
        }
        public int AddDeliveryLocation(DTOInputAddDeliveryLocation model)
        {
            var P = new DynamicParameters();

            P.Add("@Latitude", model.Latitude, DbType.Double, direction: ParameterDirection.Input);
            P.Add("@Longitude", model.Longitude, DbType.Double, direction: ParameterDirection.Input);
            P.Add("@DeliveryId", model.DeliveryId, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@CurrentDate", model.CurrentDate, DbType.DateTime, direction: ParameterDirection.Input);
            var R = _connection.DBContext.ExecuteAsync("AddDeliveryLocation", P, commandType: CommandType.StoredProcedure);
            // 
            return R.Result;
        }

       

        public List<DeliveryLocation> GetBetweenTwoDatesDeliveryLocation(DTOInputDeliveryLocation model)
        {
            var P = new DynamicParameters();
            P.Add("@DelvieryId", model.DeliveryId, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@StartDate", model.StartDate, DbType.DateTime, direction: ParameterDirection.Input);
            P.Add("@EndDate", model.EndDate, DbType.DateTime, direction: ParameterDirection.Input);
            var R = _connection.DBContext.Query<DeliveryLocation>("GetBetweenTwoDatesDeliveryLocation", P, commandType: CommandType.StoredProcedure).AsList();
            
            return R;
        }

       

        public DeliveryLocation GetDeliveryLocationById(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@DeliveryId", Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DeliveryLocation>("GetDeliveryLocationById", P, commandType: CommandType.StoredProcedure).AsList();
             
            if (R.Count == 0) {
                return null;
            }

            return R.ToArray()[0];
        }
    }
}
