using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pharmacy.Core.Data.Models
{
    public class ApplicationUser
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool Block { get; set; }
        public string NickName { get; set; }
        public bool Gender { get; set; }
        public string Image { get; set; }
        public string ConnectionId { get; set; }
        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }
        [ForeignKey("EmoloyeeId")]
        public virtual Employee Emoloyee { get; set; }
        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        public ICollection<Message> Message { get; set; }
    }
}
