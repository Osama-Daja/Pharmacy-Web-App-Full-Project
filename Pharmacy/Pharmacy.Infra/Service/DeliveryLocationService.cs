using Pharmacy.Core.Data.DTOInput;
using Pharmacy.Core.Data.Models;
using Pharmacy.Core.IRepository;
using Pharmacy.Core.IService;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Infra.Service
{
    public class DeliveryLocationService : IDeliveryLocationService
    {

        readonly IDeliveryLocationRepository _deliveryLocationRepository;
        public DeliveryLocationService(IDeliveryLocationRepository deliveryLocationRepository)
        {
            _deliveryLocationRepository = deliveryLocationRepository;
        }
        public int AddDeliveryLocation(DTOInputAddDeliveryLocation model)
        {
            return _deliveryLocationRepository.AddDeliveryLocation(model);
        }

        public List<DeliveryLocation> GetBetweenTwoDatesDeliveryLocation(DTOInputDeliveryLocation model)
        {
            return _deliveryLocationRepository.GetBetweenTwoDatesDeliveryLocation(model);
        }

        public DeliveryLocation GetDeliveryLocationById(int Id)
        {
            return _deliveryLocationRepository.GetDeliveryLocationById(Id);
        }
    }
}
