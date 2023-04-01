using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Infra.Service
{
    public class ReportService : IReportService
    {
        readonly IReportRepository _reportRepository;
        public ReportService(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }
        public int AddReport(DTOInputReport model)
        {
            return _reportRepository.AddReport(model);
           
        }

        public int DeleteReport(int Id)
        {
            return _reportRepository.DeleteReport(Id);
        }

        public List<Report> GetAll()
        {
            return _reportRepository.GetAll();
        }

        public DTOOutReportDeatails GetReportDeatailsByReportId(int ReportId)
        {
            return _reportRepository.GetReportDeatailsByReportId(ReportId);
        }

        public List<DTOOutReportDeatails> SearchReportByDate(DTOInputReportDeatails report)
        {
            return _reportRepository.SearchReportByDate(report);
        }

        public int UpdateReport(DTOInputReport model)
        {
            return _reportRepository.UpdateReport(model);
            
        }
    }
}
