import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OurservicesprivateService } from './ourservicesprivate.service';

@Injectable({
  providedIn: 'root'
})
export class OurservicesdeliveryService {

  ListOrders : any[] = [];
  MyLocation : any;
  setIntervalDeliveryLocation : any;

  constructor( private http: HttpClient, private router: Router,private toastr: ToastrService
    ,private OurservicesprivateService : OurservicesprivateService) {}


  URLIMG = 'https://localhost:44315/';
  URL = this.URLIMG + "api/";

  UpdateDelivery(PhoneNumber : string,NickName : string,Gender:string)
  {
    var body = {
      PhoneNumber : PhoneNumber,
      NickName : NickName,
      Gender : Gender == 'True' ? true : false,
    }
    
    this.http.put(this.URL+'ApplicationUser/UpdateDelivery',body).subscribe(R=>{
      this.toastr.success('Success');
      this.OurservicesprivateService.GetMyDataAccount();
    })
  }

  AddDeliveryLocation(Latitude : number,Longitude:number)
  {
    var body = {
      Latitude : Longitude,
      Longitude : Latitude
    }
    this.MyLocation = body;

    this.http.post(this.URL + 'DeliveryLocation/AddDeliveryLocation',body).subscribe(a=>{
    });
  }





     //----------------------------------------------------------------------------------------------Bag
     GetMyLastBagByDelivery(){
      this.http.get(this.URL+'Bag/GetMyLastBagByDelivery').subscribe(a=>{
        var NewList = a as any;
 console.log(NewList);


 if(NewList.bag.status == 1)
{
  this.OurservicesprivateService.ListOfNotifications.length = 0;
      var NewNot = {
      Status : "Order"+NewList.delivery.phoneNumber,
      Bag : NewList.bag,
      Delivery : NewList.delivery
    }
    this.OurservicesprivateService.LatDelivery = NewList.delivery.latitude;
    this.OurservicesprivateService.LongDelivery = NewList.delivery.longitude;
    this.OurservicesprivateService.LatCustomer = NewList.bag.latitude;
    this.OurservicesprivateService.LongCustomer = NewList.bag.longitude;

    this.OurservicesprivateService.ListOfNotifications.push(NewNot);
}else
{
  this.OurservicesprivateService.ListOfNotifications.length = 0;
}
      })
    }
 
    DoneOrderDelivery(){
      this.http.post(this.URL + 'OrderLog/DoneOrderDelivery',{}).subscribe(a=>{
        this.toastr.success('Success');
        this.GetMyLastBagByDelivery();
      })
    }

    SearchOrdersByDateDelivery(StartDate : Date,EndDate:Date){
      var Body = {
        StartDate : StartDate,
        EndDate : EndDate
      }
      this.http.post(this.URL + 'Bag/SearchOrdersByDateDelivery',Body).subscribe(R=>{
        this.ListOrders = R as any[];
      })
    }


}
