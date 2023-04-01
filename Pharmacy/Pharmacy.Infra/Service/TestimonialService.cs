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
    public class TestimonialService : ITestimonialService
    {
        readonly ITestimonialRepository _testimonialRepository;
        public TestimonialService(ITestimonialRepository testimonialRepository)
        {
            _testimonialRepository = testimonialRepository;
        }
        public int AddTestimonial(DTOInputTestamonial model)
        {
            return _testimonialRepository.AddTestimonial(model);
           
        }

        public int DeleteTestimonial(int Id)
        {
            return _testimonialRepository.DeleteTestimonial(Id);
        }

        public List<Testimonial> GetAll()
        {
            return _testimonialRepository.GetAll();
        }

        public int UpdateTestimonial(DTOInputTestamonial model)
        {
            return _testimonialRepository.UpdateTestimonial(model);
            
        }

        public List<DTOInputUpdateTestimonial> TestimonialSearchByText(DTOInputTestimonialSearchByText model)
        {
            return _testimonialRepository.TestimonialSearchByText(model);
        }

        public List<DTOInputUpdateTestimonial> SearchByDate(DTOInputTestimonialSearchByDate model)
        {
            return _testimonialRepository.SearchByDate(model);
        }

        public int UpdateTestimonialBlockStatus(DTOInputTestimonialBlockStatus model)
        {
            return _testimonialRepository.UpdateTestimonialBlockStatus(model);
        }

        public List<DTOOutTestimonialGetTrue> GetTrueTestimonial()
        {
            return _testimonialRepository.GetTrueTestimonial();
        }
    }
}
