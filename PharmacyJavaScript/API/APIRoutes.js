const Server_URL = 'http://fff8-46-248-203-122.ngrok.io/';
const API_URL = Server_URL + 'api/';
const Hub_URL = Server_URL + 'ChatHub';

//******************************************************Controllers
const Controller_Shared_URL = API_URL + 'Shared/';
const Controller_ApplicationUser_URL = API_URL + 'ApplicationUser/';
const Controller_DeliveryLocation_URL = API_URL + 'DeliveryLocation/';
const Controller_Product_URL = API_URL + 'Product/';
const Controller_Bag_URL = API_URL + 'Bag/';
const Controller_OrderLog_URL = API_URL + 'OrderLog/';
const Controller_Message_URL = API_URL + 'Message/';
const Controller_CompanyOfOrigin_URL = API_URL + 'CompanyOfOrigin/';
const Controller_Category_URL = API_URL + 'Category/';

module.exports = {
    //*******************************Server URL
    Server_URL : Server_URL,
    //*******************************Hub URL
    Hub_URL : Hub_URL,



    //*******************************Shared
    LogIn : Controller_Shared_URL + 'LogIn',
    GetMyAccountData : Controller_Shared_URL + 'GetMyAccountData',
    UpdateImageUser : Controller_Shared_URL + 'UpdateImageUser',
    UpdateUserNameUser : Controller_Shared_URL + 'UpdateUserNameUser',
    UpdateEmailUser : Controller_Shared_URL + 'UpdateEmailUser',
    UpdatePasswordUser : Controller_Shared_URL + 'UpdatePasswordUser',

    GetConfirmCodePassword : Controller_Shared_URL + 'GetConfirmCodePassword',



    //*******************************ApplicationUser
    RegisterCustomer : Controller_ApplicationUser_URL + 'RegisterCustomer',
    UpdateCustomer : Controller_ApplicationUser_URL + 'UpdateCustomer',
    UpdateSuperUser : Controller_ApplicationUser_URL + 'UpdateSuperUser',
    UpdateAdmin : Controller_ApplicationUser_URL + 'UpdateAdmin',
    UpdateDelivery : Controller_ApplicationUser_URL + 'UpdateDelivery',


    //*******************************DeliveryLocation
    AddDeliveryLocation : Controller_DeliveryLocation_URL + 'AddDeliveryLocation',



    //*******************************Product
    SearchProductByCustomer : Controller_Product_URL + 'SearchProductByCustomer',
    TrendingProductTop3 : Controller_Product_URL + 'TrendingProductTop3',
    GetAllTrendingProduct : Controller_Product_URL + 'GetAllTrendingProduct',
    GetByCategoryIdTrendingProduct : Controller_Product_URL + 'GetByCategoryIdTrendingProduct',



    //*******************************Bag
    CreateBagByCustomerId : Controller_Bag_URL,
    GetMyLastBagByDelivery : Controller_Bag_URL + 'GetMyLastBagByDelivery',
    GetMyLastBagByCustomer : Controller_Bag_URL + 'GetMyLastBagByCustomer',



    //*******************************Order Log
    DoneOrderDelivery : Controller_OrderLog_URL + 'DoneOrderDelivery',
    CancelOrderCustomer : Controller_OrderLog_URL + 'CancelOrderCustomer',
    DoneOrderCustomer : Controller_OrderLog_URL + 'DoneOrderCustomer',



    //*******************************Message
    InsertMyMessage : Controller_Message_URL + 'InsertMyMessage',
    GetEmployeesInBranch : Controller_Message_URL + 'GetEmployeesInBranch',


    //*******************************Category
    GetAllCategory : Controller_Category_URL + 'GetAll',


    
    //*******************************CompanyOfOrigin
    GetAllCompanyOfOrigin : Controller_CompanyOfOrigin_URL + 'GetAll',
}