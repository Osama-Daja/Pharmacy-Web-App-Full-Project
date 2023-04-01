using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public int ApplicationUserId { get; set; }
        public int BranchId { get; set; }
        public float Salary { get; set; }

        [ForeignKey("ApplicationUserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Branch Branch { get; set; }
    }
}
