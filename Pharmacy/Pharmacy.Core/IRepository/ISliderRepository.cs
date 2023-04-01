using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.DTOOutput.Procedure;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.IRepository
{
    public interface ISliderRepository
    {
        List<DTOOutputSlider> GetAllSlider();
        List<DTOOutputSlider> GetTopSlider();
        DTOOutputSlider GetSliderById(int Id);
        int CreateSlider(DTOInputSlider slider);
        int UpdateSlider(DTOInputSlider slider);
        int DeleteSlider(int Id);
    }
}
