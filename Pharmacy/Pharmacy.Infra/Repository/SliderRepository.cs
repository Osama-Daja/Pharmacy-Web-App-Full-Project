using Dapper;
using Pharmacy.Core.Connection;
using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Pharmacy.Infra.Repository
{
    public class SliderRepository : ISliderRepository
    {
        private readonly IConnection _dBContext;
        public SliderRepository(IConnection dBContext)
        {
            _dBContext = dBContext;
        }

        public List<DTOOutputSlider> GetAllSlider()
        {
            var result = _dBContext.DBContext.Query<DTOOutputSlider>("GetAllSlider", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public List<DTOOutputSlider> GetTopSlider()
        {
            var result = _dBContext.DBContext.Query<DTOOutputSlider>("GetTopSlider", commandType: CommandType.StoredProcedure);
             
            return result.ToList();
        }

        public DTOOutputSlider GetSliderById(int Id)
        {
            var para = new DynamicParameters();
            para.Add("@Id", Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = _dBContext.DBContext.Query<DTOOutputSlider>("GetSliderById", para, commandType: CommandType.StoredProcedure);
             
            return result.FirstOrDefault();
        }

        public int CreateSlider(DTOInputSlider slider)
        {
            var para = new DynamicParameters();
            para.Add("@SliderImg", slider.SliderImg, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@TitleText", slider.TitleText, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@BriefText", slider.BriefText, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = _dBContext.DBContext.ExecuteAsync("CreateSlider", para, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int UpdateSlider(DTOInputSlider slider)
        {
            var para = new DynamicParameters();
            para.Add("@Id", slider.Id, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@SliderImg", slider.SliderImg, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@TitleText", slider.TitleText, dbType: DbType.String, direction: ParameterDirection.Input);
            para.Add("@BriefText", slider.BriefText, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = _dBContext.DBContext.ExecuteAsync("UpdateSlider ", para, commandType: CommandType.StoredProcedure);
             
            return 1;
        }

        public int DeleteSlider(int Id)
        {
            try
            {
                var para = new DynamicParameters();
                para.Add("@Id", Id, DbType.Int32, direction: ParameterDirection.Input);
                
                var result = _dBContext.DBContext.ExecuteAsync("DeleteSlider ", para, commandType: CommandType.StoredProcedure).Result;
                 
                return result;
            }
            catch
            {
                return 2;
            }
        }


    }
}
