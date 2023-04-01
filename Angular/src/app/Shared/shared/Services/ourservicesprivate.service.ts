import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnectionBuilder } from '@aspnet/signalr';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { sortBy } from 'sort-by-typescript';
import { User } from 'src/app/Shared/Models/User';

@Injectable({
  providedIn: 'root'
})
export class OurservicesprivateService {


  URLIMG = 'https://localhost:44315/';
  URL = this.URLIMG + "api/";


  DetailsBag : any;

  //-------------------------------------------------------------------------------------Chat
  MessageText = '';
  List : any = [];
  ListOfEmployee : any[] = [];
  connection = new HubConnectionBuilder().withUrl(this.URLIMG + 'ChatHub').build();
  UserId = 0;

  ListOfNotifications : any[] =[];
  LatDelivery = 0;
  LongDelivery = 0;
  LatCustomer = 0;
  LongCustomer = 0;
  
  //-------------------------------------------------------------------------------------Check For Images
  ExtensionForImage = ['jpeg','jpg','png','svg'];

  //-------------------------------------------------------------------------------------My Account
  MyAccountData = new User;

  ProfileImageToUpload: File | null = null;
  ProfileImageURL: any = '/assets/IMG/CardUser.png';

  ConfirmCodePassword = '';

  constructor( private http: HttpClient, private router: Router,private toastr: ToastrService) {}

  GetMyDataAccount()
  {
    this.http.get(this.URL+'Shared/GetMyAccountData').subscribe(R=>{
      this.MyAccountData = R as User;
    })
  }

    UpdateUserNameUser(UserName : string)
    {
      var body = {
        UserName : UserName
      }

      this.http.put(this.URL + 'Shared/UpdateUserNameUser' ,body).subscribe(R=>{
        this.toastr.success('Success');
        this.GetMyDataAccount();
      },E=>{})
    }

    UpdateEmailUser(Email : string)
    {
      var body = {
        Email : Email
      }

      this.http.put(this.URL + 'Shared/UpdateEmailUser' ,body).subscribe(R=>{
        this.toastr.success('Success');
        this.GetMyDataAccount();
      },E=>{})
    }

    UpdateImageUser() {
      if(this.ProfileImageToUpload != null)
      {       
      const formData = new FormData();
      formData.append('IMG', this.ProfileImageToUpload);
    
      this.http.put(this.URL + 'Shared/UpdateImageUser', formData).subscribe(events => 
        {
          this.toastr.success('Success');
        this.GetMyDataAccount();
        }
      ); 
  }else
  {this.toastr.warning('Make Sure Enter Image.')}
  }

  GetConfirmCodePassword()
  {
    this.http.get(this.URL + 'Shared/GetConfirmCodePassword').subscribe(R=>{
      this.ConfirmCodePassword = R as string;
      this.toastr.info('Make Sure Your Email.');
    })
  }

  UpdatePasswordUser(Password : string)
  {
    var body = {
      Password : Password
    }

    return this.http.put(this.URL + 'Shared/UpdatePasswordUser' , body).subscribe(R=>{
      this.toastr.success('Success');
      this.ConfirmCodePassword = '';
    });
  }












    //------------------------------------------------------------------------------------------Message
    InsertMyMessage(ToId : number,Text:string)
    {
      var body = {
        Text : Text,
        ToId : ToId,
      }
      
      return this.http.post(this.URL+'Message/InsertMyMessage',body).subscribe(R=>{        
        var Check = null;
        for(var V of this.List)
        {
          if(V.userId == this.UserId){
            var Body = {Id : 0,text : this.MessageText,currentDate : new Date()}
            V.messages.push(Body)
            Check = V;
          }
        }        

        var mytoken : any = localStorage.getItem('token');
        var TokenDecode : any = jwtDecode(mytoken);
         const MyRole = TokenDecode.role;

        if(MyRole == 'Customer')
        {
          var AdminData = null;
          for(let A of this.ListOfEmployee){
            if(A.id == this.UserId){
              AdminData = A;
              break;
            }
          }
          
          if(Check == null){
            var NewUser = {
              email : AdminData.email,
              image : AdminData.image,
              nickName : AdminData.nickName,
              phoneNumber : AdminData.phoneNumber,
              userId : ToId,
              messages : [{Id : 0, text : this.MessageText,currentDate : new Date()}],
            }
  
            this.List.push(NewUser);            
          } 
        }
      });
    }

    GetEmployeesInBranch()
    {

     return this.http.get(this.URL+'Message/GetEmployeesInBranch').subscribe(R=>{
       this.ListOfEmployee = R as [];
     });
    }

    ConnectionWithSignalR(){
      
      this.connection.on('sendMessageToUser',(data)=>{
        
        var Check = null;
        for(var V of this.List)
        {
          if(V.userId == data.fromId){
            var Body = {text : data.text,currentDate : data.currentDate}
            V.messages.push(Body)
          Check = data;
          }
        }
        
        if(Check == null){
          var NewUser = {
            email : data.email,
            image : data.image,
            nickName : data.nickName,
            phoneNumber : data.phoneNumber,
            userId : data.userId,
            messages : [{text : data.text,currentDate : data.currentDate}],
          }

          this.List.push(NewUser);          
        }      
      });

      this.connection.on('SendLocationToCustomer',(data)=>{
        
        this.ListOfNotifications.length = 0;
        var NewNot = {
        Status : "Order"+data.delivery.phoneNumber,
        Bag : data.bag,
        Delivery : data.delivery
      }
      this.LatDelivery = data.delivery.latitude;
      this.LongDelivery = data.delivery.longitude;
      
      this.LatCustomer = data.bag.latitude;
      this.LongCustomer = data.bag.longitude;
  
      this.ListOfNotifications.push(NewNot);

      if(NewNot.Bag.status == 2){
        this.ListOfNotifications.length = 0;
        this.toastr.error('Order Canceled');
      }
                
      });
  
      this.connection.start().then(()=> 
      {
        this.Get();
      });
  
      var mytoken : any = localStorage.getItem('token');
      const MyRole = JSON.parse(window.atob(mytoken.split('.')[1])).role;
  
      switch(MyRole)
      {
        case ('SuperUser'):{this.router.navigateByUrl('/private/admin'); break;}
        case ('Admin'):{this.router.navigateByUrl('/private/admin'); break;}
        case ('Delivery'):{this.router.navigateByUrl('/private/delivery'); break;}
        case ('Customer'):{this.router.navigateByUrl('/private/customer'); break;}
      }
    }

    
  async Get()
  {
    var mytoken : any = localStorage.getItem('token');

    const MyId = JSON.parse(window.atob(mytoken.split('.')[1])).UserId;
    await this.connection.invoke('getConnectionId',MyId).then((M)=>{
      this.List = M;
    });    

for(var V of this.List)
{
  V.messages.sort(sortBy("currentDate"));
}
  
  }

}
