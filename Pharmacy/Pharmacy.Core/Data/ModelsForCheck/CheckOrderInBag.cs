using Pharmacy.Core.Data.DTOInput;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.Data.ModelsForCheck
{
    public class CheckOrderInBag
    {
        public DTOInputOrder Order { get; set; }
        public bool Status { get; set; }
    }
}
