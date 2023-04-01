import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OurservicesprivateService } from 'src/app/Shared/shared/Services/ourservicesprivate.service';
import { OurservicesdeliveryService } from '../../../Shared/shared/Services/ourservicesdelivery.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { DetailsbagComponent } from '../detailsbag/detailsbag.component';
import { MapcustomerComponent } from '../mapcustomer/mapcustomer.component';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  LangValue = false;
  
  constructor(private router : Router,public OurservicesdeliveryService : OurservicesdeliveryService,
    public OurservicesprivateService : OurservicesprivateService ,private toastr: ToastrService
    ,private dialog :MatDialog,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicesprivateService.GetMyDataAccount();
    this.OurservicesdeliveryService.GetMyLastBagByDelivery();
    this.GetLocation();
    this.OurservicesprivateService.ConnectionWithSignalR();
  }

  
  GetLocation(){
    this.OurservicesdeliveryService.setIntervalDeliveryLocation = setInterval(()=>{
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((position) => {
          
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.OurservicesdeliveryService.AddDeliveryLocation(latitude,longitude);
        });
      } 
    },30000)
  }

  LogOut()
  {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    clearInterval(this.OurservicesdeliveryService.setIntervalDeliveryLocation);
  }

  AddMessage()
  {    
    if(this.OurservicesprivateService.MessageText == '' || this.OurservicesprivateService.UserId == 0)
    {
      if(this.OurservicesprivateService.UserId == 0){this.toastr.warning('Make Sure Select Customer.','Alert');}else
      {      this.toastr.warning('Make Sure Enter Message.','Alert');    }
    }else
    {
      this.OurservicesprivateService.InsertMyMessage(this.OurservicesprivateService.UserId,this.OurservicesprivateService.MessageText);
    }
  }

  ShowDetailsBag(Bag : any){
    this.OurservicesprivateService.DetailsBag = Bag;
    this.dialog.open(DetailsbagComponent,{
      maxHeight:'100vh',
      maxWidth:'100vh'
    });
  }

  ShowMap(){
    this.dialog.open(MapcustomerComponent,{
      maxHeight:700
    });
  }

    
  ChangeLanguage() {
    this.LangValue = !this.LangValue;
    if(this.LangValue){
      localStorage.setItem('lang', 'ar');
      this.MainPortal.ngOnInit();
    }else{
      localStorage.setItem('lang', 'en');
      this.MainPortal.ngOnInit();
    }
  }
}
