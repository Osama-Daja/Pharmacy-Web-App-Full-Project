using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputMessage
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        public DateTime CurrentDate { get; set; }
        public int FromId { get; set; }
        [Required]
        public int ToId { get; set; }
    }

    public class DTOInputConnectionUser
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ConnectionId { get; set; }
    }
}
