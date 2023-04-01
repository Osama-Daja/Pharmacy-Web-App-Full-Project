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

namespace Pharmacy.Infra.Repository
{
    public class ReportRepository : IReportRepository
    {
        IConnection _connection;

        public ReportRepository(IConnection connection)
        {
            _connection = connection;
        }
        public int AddReport(DTOInputReport model)
        {
            try
            {
                var P = new DynamicParameters();
                P.Add("@CustomerId", model.CustomerId, DbType.Int32, direction: ParameterDirection.Input);
                P.Add("@Text", model.Text, DbType.String, direction: ParameterDirection.Input);
                P.Add("@Date", model.Date, DbType.DateTime, direction: ParameterDirection.Input);
                P.Add("@OrderId", model.OrderId, DbType.Int32, direction: ParameterDirection.Input);
                P.Add("@Rating", model.Rating, DbType.Int32, direction: ParameterDirection.Input);
                var R = _connection.DBContext.ExecuteAsync("AddReport", P, commandType: CommandType.StoredProcedure).Result;
                 
                return R;
            }
            catch
            {
                return 2;
            }
        }

        public int DeleteReport(int Id)
        {
            var P = new DynamicParameters();

            P.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("DeleteReport", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public List<Report> GetAll()
        {
           
            IEnumerable<Report> result = _connection.DBContext.Query<Report>("GetAllReport", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public int UpdateReport(DTOInputReport model)
        {
            var P = new DynamicParameters();
            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@CustomerId", model.CustomerId, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Text", model.Text, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Date", model.Date, DbType.DateTime, direction: ParameterDirection.Input);
            P.Add("@OrderId", model.OrderId, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Rating", model.Rating, DbType.Int32, direction: ParameterDirection.Input);
            var R = _connection.DBContext.ExecuteAsync("EditReport", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public DTOOutReportDeatails GetReportDeatailsByReportId(int ReportId)
        {
            var para = new DynamicParameters();
            para.Add("@ReportId", ReportId, DbType.Int32, direction: ParameterDirection.Input);
            var result = _connection.DBContext.Query<DTOOutReportDeatails>("GetReportDeatailsByReportId", para, commandType: CommandType.StoredProcedure);
             
            return result.FirstOrDefault();

        }

        public List<DTOOutReportDeatails> SearchReportByDate(DTOInputReportDeatails report)
        {
            var para = new DynamicParameters();
            para.Add("@StartDate", report.StartDate, DbType.String, direction: ParameterDirection.Input);
            para.Add("@EndDate", report.EndDate, DbType.String, direction: ParameterDirection.Input);
            var result = _connection.DBContext.Query<DTOOutReportDeatails>("SearchReportByDate", para, commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }
    }
}
