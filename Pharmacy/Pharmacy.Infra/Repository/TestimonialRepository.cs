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
    public class TestimonialRepository : ITestimonialRepository
    {
        IConnection _connection;

        public TestimonialRepository(IConnection connection)
        {
            _connection = connection;
        }
        public int AddTestimonial(DTOInputTestamonial model)
        {
            var P = new DynamicParameters();

            P.Add("@Text", model.Text, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Status", false, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@Date", model.Date, DbType.DateTime, direction: ParameterDirection.Input);
            P.Add("@CustomerId", model.CustomerId, DbType.Int32, direction: ParameterDirection.Input);
            var R = _connection.DBContext.ExecuteAsync("AddTestimonial", P, commandType: CommandType.StoredProcedure);

             

            return 1;
        }

        public int DeleteTestimonial(int Id)
        {
            try
            {
                var P = new DynamicParameters();

                P.Add("@TestimonialID", Id, DbType.Int32, direction: ParameterDirection.Input);

                var R = _connection.DBContext.ExecuteAsync("DeleteTestimonial", P, commandType: CommandType.StoredProcedure).Result;
                 
                return R;
            }
            catch
            {
                return 2;
            }
        }

        public List<Testimonial> GetAll()
        {
           
            IEnumerable<Testimonial> result = _connection.DBContext.Query<Testimonial>("GetAllTestimonials", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public int UpdateTestimonial(DTOInputTestamonial model)
        {
            var P = new DynamicParameters();
            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Text", model.Text, DbType.String, direction: ParameterDirection.Input);
            P.Add("@Status", model.Status, DbType.Boolean, direction: ParameterDirection.Input);
            P.Add("@Date", model.Date, DbType.DateTime, direction: ParameterDirection.Input);
            P.Add("@CustomerId", model.CustomerId, DbType.Int32, direction: ParameterDirection.Input);
            var R = _connection.DBContext.ExecuteAsync("EditTestimonial", P, commandType: CommandType.StoredProcedure);

             

            return 1;
        }

        public List<DTOInputUpdateTestimonial> TestimonialSearchByText(DTOInputTestimonialSearchByText model)
        {
            var P = new DynamicParameters();

            P.Add("@Text", model.Text, DbType.String, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOInputUpdateTestimonial>("SearchTestimonialByText", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public List<DTOInputUpdateTestimonial> SearchByDate(DTOInputTestimonialSearchByDate model)
        {
            var P = new DynamicParameters();

            P.Add("@StartDay", model.StartDay, DbType.Date, direction: ParameterDirection.Input);
            P.Add("@EndDay", model.EndDay, DbType.Date, direction: ParameterDirection.Input);

            var R = _connection.DBContext.Query<DTOInputUpdateTestimonial>("SearchTestimonialByDate", P, commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }

        public int UpdateTestimonialBlockStatus(DTOInputTestimonialBlockStatus model)
        {
            var P = new DynamicParameters();

            P.Add("@Id", model.Id, DbType.Int32, direction: ParameterDirection.Input);
            P.Add("@Status", model.Status, DbType.Boolean, direction: ParameterDirection.Input);

            var R = _connection.DBContext.ExecuteAsync("UpdateTestamonialStatus", P, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public List<DTOOutTestimonialGetTrue> GetTrueTestimonial()
        {
            var R = _connection.DBContext.Query<DTOOutTestimonialGetTrue>("GetTrueTestimonial", commandType: CommandType.StoredProcedure).AsList();
             
            return R;
        }
    }
}
