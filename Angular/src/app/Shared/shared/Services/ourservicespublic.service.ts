import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { TrendingproductsbycategoryComponent } from 'src/app/publicportal/trendingproductsbycategory/trendingproductsbycategory.component';
import { ContactUs } from '../../Models/ContactUs';
import { Customer } from '../../Models/User';

@Injectable({
  providedIn: 'root'
})
export class OurservicespublicService {

  ConfirmCode = '';
  AboutUs : any;

  ListCategory : any = [];
  ListTestimonial : any = [];
  ListAllTrendingProduct : any = [];
  ListTrendingProductByCategory : any[] = [];
  ListTrendingProductTop3 : any[] = [];
  TrendingProductValue: any;

  ListSlider : any[] = [];

  DetailsProduct: any = null;

  constructor( private http: HttpClient, private router: Router,private toastr: ToastrService
    ,private dialog : MatDialog) {}

  URLIMG = 'https://localhost:44315/';
  URL = this.URLIMG + "api/";

  login(UserName: string, Password: string,RememberMe : boolean) {
    var body = {
      UserName: UserName,
      Password: Password
    }
    
    return this.http.post(this.URL + 'Shared/LogIn', body).subscribe(
      (R: any) => {
         localStorage.setItem('token', R.token);
         var TokenDecode : any = jwtDecode(R.token);
          const MyRole = TokenDecode.role;

          if(RememberMe){

            localStorage.removeItem('UserName');
            localStorage.removeItem('Password');
    
            localStorage.setItem('UserName',UserName);
            localStorage.setItem('Password',Password);
          }else
          {
            localStorage.removeItem('UserName');
            localStorage.removeItem('Password');
          }

          switch(MyRole)
          {
            case ('SuperUser'):{this.router.navigateByUrl('/private/admin'); break;}
            case ('Admin'):{this.router.navigateByUrl('/private/admin'); break;}
            case ('Delivery'):{this.router.navigateByUrl('/private/delivery'); break;}
            case ('Customer'):{this.router.navigateByUrl('/private/customer'); break;}
          }
      },
      E => {
        if (E.status == 404) {
          this.toastr.warning('User Name Or Password is incorrect.','ERROR');
        }
        if(E.status == 403)
        {
          this.toastr.warning('Your Account is Bloked.','ERROR');
        } 
        if (E.status == 400) {
          this.toastr.warning('Make Sure Enter All Values.','ERROR');
        }
      }
    );
  }

  RegisterCustomer(Customer: Customer)
  {
    var body ={
      UserName : Customer.UserName,
      Password : Customer.Password,
      Email : Customer.Email,
      PhoneNumber : String(Customer.PhoneNumber),
      NickName : Customer.NickName,
      Gender : Customer.Gender == 'true' ? true : false,
      Latitude : Customer.Latitude,
      Longitude : Customer.Longitude,
      BirthDay : Customer.BirthDay,
    }    

    this.toastr.info('Please Wait.');
    this.http.post(this.URL + 'ApplicationUser/RegisterCustomer' , body).subscribe(R=>{
      setTimeout(() => {
        this.toastr.success('Welcome');
        this.login(body.UserName,body.Password,false);
      }, 1000);
    },E=>{
      if(E.status == 406){
        this.toastr.warning('Your Area Is Not Covered')
      }else
      {
        this.toastr.warning('UserName Or Email Is Used.')
      }
    })
  }

  GetConfirmCode(Email : string)
  {
    this.http.post(this.URL + 'Shared/GetConfirmCode',{Email : Email}).subscribe(R=>{
      this.ConfirmCode = R as string;
      this.toastr.info('Make Sure Your Email.');
    })
  }


  RegisterContactUs(contactUs: ContactUs)
  {
    var body ={
      Name : contactUs.Name,
      Email : contactUs.Email,
      PhoneNumber : String(contactUs.PhoneNumber),
      Message : contactUs.Messages,
    }    

    this.toastr.info('Please Wait.');
    this.http.post(this.URL + 'ContactU' , body).subscribe(R=>{
      this.toastr.success('Success');

    })
  }


  //---------------------------------------------------------------------------------------Category
  GetAllCategory(){
    this.http.get(this.URL+'Category/GetAll').subscribe(R=>{
      this.ListCategory = R as [];
    },E=>{});
  }


    //---------------------------------------------------------------------------------------Testimonial
    GetTrueTestimonial(){
      this.http.get(this.URL + 'Testimonial/GetTrueTestimonial').subscribe(R=>{
        this.ListTestimonial = R as [];
        
      })
    }


    //--------------------------------------------------------------------------------------------Trending
    GetAllTrendingProduct(){
      this.http.get(this.URL+'Product/GetAllTrendingProduct').subscribe(R=>{
        this.ListAllTrendingProduct = R as [];
      })
    }

    GetByCategoryIdTrendingProduct(Id : number){
      this.http.get(this.URL+'Product/GetByCategoryIdTrendingProduct/' + Id).subscribe(R=>{
        this.ListTrendingProductByCategory = R as [];
        
        this.dialog.open(TrendingproductsbycategoryComponent);
      })
    }
    TrendingProduct(){
      this.http.get(this.URL+'Product/TrendingProduct').subscribe(R=>{
        this.TrendingProductValue = R as any;
      })
    }
    TrendingProductTop3(){
      this.http.get(this.URL+'Product/TrendingProductTop3').subscribe(R=>{
        this.ListTrendingProductTop3 = R as any[];
      })
    }

    //--------------------------------------------------------------------------------------------Slider
    GetTopSlider(){
      this.http.get(this.URL + 'Slider/GetTopSlider').subscribe(R=>{
        this.ListSlider = R as any[];
      })
    }
    
      //--------------------------------------------------------------------------------------------About Us
    GetAboutUs(){
      this.http.get(this.URL + 'AboutUs/GetAboutUs').subscribe(R=>{
        this.AboutUs = R as any;        
      })
    }
}
