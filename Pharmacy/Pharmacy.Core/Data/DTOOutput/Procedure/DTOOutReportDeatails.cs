using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.Data.DTOOutput.Procedure
{
    public class DTOOutReportDeatails
    {
        //DTOInputReportDeatails
        public int Id { get; set; }// report Id 
        public int CustomerId { get; set; }
        public int OrderId { get; set; }
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
        ////////////// for customer
        public int Quantity { get; set; }
        public string Email { get; set; }
        public string NickName { get; set; }
        public string Image { get; set; }
        public string PhoneNumber { get; set; }
        ///////////
        public string ProductName { get; set; }
        public DateTime ProduceDate { get; set; }
        public DateTime ExpiredDate { get; set; }
    }
}
