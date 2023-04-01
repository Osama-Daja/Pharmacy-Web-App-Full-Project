using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.Data.DTOOutput.Chat
{
    public class DTOChatForm
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CurrentDate { get; set; }
        public int FromId { get; set; }
    }


    public class ConnectionUsers
    {
        public int Id { get; set; }
        public string IdConnection { get; set; }
        public DateTime CurrentDate { get; set; }
    }

    public class BagList
    {
        public int Id { get; set; }
        public string IdConnection { get; set; }
        public DateTime CurrentDate { get; set; }
    }
}
