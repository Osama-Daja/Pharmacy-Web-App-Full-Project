using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.IRepository
{
   public interface ITestimonialRepository
    {

        int AddTestimonial(DTOInputTestamonial model);
        int UpdateTestimonial(DTOInputTestamonial model);
        int DeleteTestimonial(int Id);
        List<DTOInputUpdateTestimonial> TestimonialSearchByText(DTOInputTestimonialSearchByText model);
        List<DTOInputUpdateTestimonial> SearchByDate(DTOInputTestimonialSearchByDate model);
        List<Testimonial> GetAll();

        int UpdateTestimonialBlockStatus(DTOInputTestimonialBlockStatus model);
        List<DTOOutTestimonialGetTrue> GetTrueTestimonial();
    }
}
