using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CurrentDate { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }

        [ForeignKey("FromId")]
        public virtual ApplicationUser FromApplicationUser { get; set; }
        [ForeignKey("ToId")]
        public virtual ApplicationUser ToApplicationUser { get; set; }
    }
}
