import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Report } from '../../Models/Report';
import { Testimonial } from '../../Models/Testimonial';
import { OurservicesprivateService } from './ourservicesprivate.service';

@Injectable({
  providedIn: 'root'
})
export class OurservicescustomerService {

  ListProducts : any = [];

  MyBag : any;
  OrderList:any[] = [];
  TotalPrice = 0;
  ListOfBags : any[] = [];

  constructor( private http: HttpClient, private router: Router,private toastr: ToastrService
    ,private OurservicesprivateService : OurservicesprivateService) {}

  URLIMG = 'https://localhost:44315/';
  URL = this.URLIMG + "api/";

  UpdateMyLocation(Latitude : number,Longitude : number)
  {
    var body = {
      Latitude : Latitude,
      Longitude : Longitude
    }
    this.http.put(this.URL+'ApplicationUser/UpdateMyLocation',body).subscribe(R=>{
      this.toastr.success('Success');
    },E=>{
      if(E.status == 406){
        this.toastr.warning('Your Area Is Not Covered')
      }else
      {
        this.toastr.error('Make Sure Your Connection')
      }
    })
  }

  UpdateCustomer(PhoneNumber : string,NickName : string,Gender:string,BirthDay:Date)
  {    
    var body = {
      PhoneNumber : PhoneNumber,
      NickName : NickName,
      Gender : Gender == 'True' ? true : false,
      BirthDay : BirthDay
    }
    
    this.http.put(this.URL+'ApplicationUser/UpdateCustomer',body).subscribe(R=>{
      this.toastr.success('Success');
      this.OurservicesprivateService.GetMyDataAccount();
    })
  }

  SearchProductByCustomer(Form : any){
    var Body ={
      Name : Form.Name,
      CategoryId : Number(Form.CategoryId),
      CompanyOfOriginId : Number(Form.CompanyOfOriginId)
    }
    
    this.http.post(this.URL + 'Product/SearchProductByCustomer' , Body).subscribe(R=>{
      this.ListProducts = R as [];      
    })
  }


  CreateBagByCustomerId(Status : boolean){
    var body ={
      status : Status,
      OrderList : this.OrderList.map((a : any)=>{
        return {ProductId : a.ProductId,Quantity : a.Quantity}
      })
    }

    if(body.OrderList.find(a=>a.Quantity <= 0) != null){
      this.toastr.warning('Check Quantity Of Products.')
    }else
    {
      this.http.post(this.URL + 'Bag' , body).subscribe((a: any)=>{        
        this.OrderList.length = 0;
        this.TotalPrice = 0;
        this.toastr.success('Done');
        this.GetMyLastBagByCustomer();
      },E=>{
        switch(E.status){
          case 404:{this.toastr.warning('Out Of Work Hours.'); break;}
          case 405:{this.toastr.warning('You Have Already Bag.'); break;}
          case 406:{this.toastr.warning('Product Not Enough In Our Stock.'); break;}
          default :{this.toastr.warning('Unsuccess'); break;}
        }
      })
    }
    
  }

  
  //----------------------------------------------------------------------------------------------Testimonial
  AddTestimonial(testimonial : Testimonial){
    var body = {
      Text: testimonial.Text,
      
         }
  
         this.http.post(this.URL+'Testimonial/AddTestimonial',body).subscribe(R=>{
          this.toastr.success('Success');
            },E=>{
              this.toastr.warning('Error')
            })
   }






   //----------------------------------------------------------------------------------------------Bag
   GetMyLastBagByCustomer(){
     this.http.get(this.URL+'Bag/GetMyLastBagByCustomer').subscribe(a=>{
       var NewList = a as any;
       console.log('GetMyLastBagByCustomer');
       
console.log(NewList);

if(NewList.bag.status == 1 || NewList.bag.status == 3)
{
  this.OurservicesprivateService.ListOfNotifications.length = 0;
      var NewNot = {
      Status : "Order"+NewList.delivery.phoneNumber,
      Bag : NewList.bag,
      Delivery : NewList.delivery
    }
    this.OurservicesprivateService.LatDelivery = NewList.delivery.latitude;
    this.OurservicesprivateService.LongDelivery = NewList.delivery.longitude;

    this.OurservicesprivateService.ListOfNotifications.push(NewNot);
}else
{
  if(NewList.bag.status == 0)
  {
    var NewNot0 = {
      Bag : NewList.bag,
    }
    this.OurservicesprivateService.ListOfNotifications.length = 0;
    this.OurservicesprivateService.ListOfNotifications.push(NewNot0);
    
  }else
  {
    this.OurservicesprivateService.ListOfNotifications.length = 0;
  }
}
     })
   }


   DoneOrderCustomer(){
    this.http.post(this.URL+'OrderLog/DoneOrderCustomer',{}).subscribe(R=>{
      this.toastr.success('Success');
      this.GetMyLastBagByCustomer();
    })
   }

   CancelOrderCustomer(){
    this.http.post(this.URL+'OrderLog/CancelOrderCustomer',{}).subscribe(R=>{
      this.toastr.success('Success');
      this.GetMyLastBagByCustomer();
    })
   }




   //----------------------------------------------------------------------------------------------Search Bags
   SearchOrdersByDateCustomer(StartDate :string, EndDate : string){
     var body = {
      StartDate : StartDate,
      EndDate : EndDate
     }
     this.http.post(this.URL+'Bag/SearchOrdersByDateCustomer',body).subscribe(R=>{
       this.ListOfBags = R as [];
     })
   }

   AddReport(report :Report){
    var body ={
      Text : report.Text,
      OrderId : report.OrderId,
      Rating : report.Rating
    }
    this.http.post(this.URL + 'Report/AddReport',body).subscribe( result =>{
      this.toastr.success('Success');
    }, error =>{
      this.toastr.warning('Error');
    });
   }


}
