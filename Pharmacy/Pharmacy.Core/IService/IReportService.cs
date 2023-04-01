using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.IService
{
   public interface IReportService
    {
        int AddReport(DTOInputReport model);
        int UpdateReport(DTOInputReport model);
        int DeleteReport(int Id);

        List<Report> GetAll();

        DTOOutReportDeatails GetReportDeatailsByReportId(int ReportId);
        List<DTOOutReportDeatails> SearchReportByDate(DTOInputReportDeatails report);
    }
}
