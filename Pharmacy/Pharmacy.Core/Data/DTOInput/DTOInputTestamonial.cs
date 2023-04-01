using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pharmacy.Core.Data.DTOInput
{
    public class DTOInputTestamonial
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        public bool Status { get; set; }
        public DateTime Date { get; set; }
        public int CustomerId { get; set; }
    }

    public class DTOInputUpdateTestimonial
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public bool Status { get; set; }
        public DateTime Date { get; set; }
        [Required]
        public int CustomerId { get; set; }
    }

    //-----------------------------------------------------------------------------Search
    public class DTOInputTestimonialSearchByText
    {
        [Required]
        public string Text { get; set; }
    }

    //-----------------------------------------------------------------------------SearchDate
    public class DTOInputTestimonialSearchByDate
    {
        [Required]
        public string StartDay { get; set; }
        [Required]
        public string EndDay { get; set; }
    }

    public class DTOInputTestimonialBlockStatus
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public bool Status { get; set; }
    }
}
