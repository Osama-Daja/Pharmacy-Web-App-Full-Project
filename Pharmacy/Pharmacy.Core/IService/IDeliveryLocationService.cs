using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.IService
{
   public interface IDeliveryLocationService
    {
        int AddDeliveryLocation(DTOInputAddDeliveryLocation model);
        List<DeliveryLocation> GetBetweenTwoDatesDeliveryLocation(DTOInputDeliveryLocation model);
        DeliveryLocation GetDeliveryLocationById(int Id);
    }
}
