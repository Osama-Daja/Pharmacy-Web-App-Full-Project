using System;
using System.Collections.Generic;
using System.Text;

namespace Pharmacy.Core.Data.DTOOutput.Procedure
{
    public class DTOOutBag
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }
        public double TotalPrice { get; set; }
        public DateTime CurrentDate { get; set; }
        public bool PaymentType { get; set; }
    }

    public class DTOOutputBagDeatails
    {
        public int Id { get; set; }
        public Nullable<System.DateTime> BagDate { get; set; }
        public int Quantity { get; set; }
        public byte OrderLogStatus { get; set; }
        public System.DateTime OrderLogDate { get; set; }
        public bool PaymentType { get; set; }
        public string NickName { get; set; }// for delivery 
        public string PhoneNumber { get; set; }// for delivery
        public string ProductName { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
    }

    public class DTOOutputBagLastBagByDelivery
    {
        //Bag
        public int Id { get; set; }
        public float TotalPrice { get; set; }
        //Order Log
        public DateTime CurrentDate { get; set; }
        public bool PaymentType { get; set; }
        public int Status { get; set; }
        public int DeliveryId { get; set; }
        //Customer
        public int CustomerId { get; set; }
        public string NickName { get; set; }
        public string PhoneNumber { get; set; }
        public string Image { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        //Product
        public List<ProductBag> Product { get; set; }
    }

    public class ProductBag
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public float ProductPrice { get; set; }

        //Order
        public int Quantity { get; set; }
        public int OrderId { get; set; }

    }




    public class DTOOutputBagSearchOrdersByDateAdmin
    {
        //Bag
        public int Id { get; set; }
        public float TotalPrice { get; set; }
        public DateTime CurrentDate { get; set; }
        public string CustomerNickName { get; set; }
        public string CustomerPhoneNumber { get; set; }
        public string CustomerImage { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        //Order Log
        public List<OrderLogBagSearchByCustomer> OrderLog { get; set; }
        //Product
        public List<ProductBagSearchByCustomer> Product { get; set; }
    }

    //-------------------------------------------------------------------------------Search By Customer
    public class DTOOutputBagSearchOrdersByDateCustomer
    {
        //Bag
        public int Id { get; set; }
        public float TotalPrice { get; set; }
        public DateTime CurrentDate { get; set; }
        //Order Log
        public List<OrderLogBagSearchByCustomer> OrderLog { get; set; }
        //Product
        public List<ProductBagSearchByCustomer> Product { get; set; }
    }

    //-------------------------------------------------------------------------------Search (Shared)
    public class ProductBagSearchByCustomer
    {
        public int BagId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public float ProductPrice { get; set; }

        //Order
        public int Quantity { get; set; }
        public int OrderId { get; set; }
    }

    public class OrderLogBagSearchByCustomer
    {
        public int BagId { get; set; }
        public int OrderLogId { get; set; }
        public DateTime OrderLogCurrentDate { get; set; }
        public bool PaymentType { get; set; }
        public int Status { get; set; }
        public string DeliveryNickName { get; set; }
        public string DeliveryPhoneNumber { get; set; }
        public string DeliveryImage { get; set; }

    }


    //-------------------------------------------------------------------------------Active Deliveries
    public class DTOOutputBagActiveDeliveries
    {
        public int ApplicationUserId { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float TotalPrice { get; set; }
        public string NickName { get; set; }
        public string PhoneNumber { get; set; }
        public List<DTOOutputBagActiveDeliveriesOrder> Orders { get; set; }
    }
    public class DTOOutputBagActiveDeliveriesOrder
    {
        public int OrderId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Image { get; set; }
    }

}
