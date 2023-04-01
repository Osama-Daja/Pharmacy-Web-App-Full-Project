using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Infra.Service
{
    public class SliderService: ISliderService
    {
        readonly ISliderRepository _sliderRepository;
        public SliderService(ISliderRepository sliderRepository )
        {
            _sliderRepository = sliderRepository;
        }

        public List<DTOOutputSlider> GetAllSlider()
        {
            return _sliderRepository.GetAllSlider();
        }

        public List<DTOOutputSlider> GetTopSlider()
        {
            return _sliderRepository.GetTopSlider();
        }        

        public int CreateSlider(DTOInputSlider slider)
        {
            return _sliderRepository.CreateSlider(slider);
        }

        public int UpdateSlider(DTOInputSlider slider)
        {
            return _sliderRepository.UpdateSlider(slider);
        }

        public int DeleteSlider(int Id)
        {
            return _sliderRepository.DeleteSlider(Id);
        }

        public DTOOutputSlider GetSliderById(int Id)
        {
            return _sliderRepository.GetSliderById(Id);
        }
    }
}
