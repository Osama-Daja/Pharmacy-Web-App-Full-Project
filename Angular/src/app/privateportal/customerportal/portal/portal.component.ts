import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';
import { OurservicesprivateService } from 'src/app/Shared/shared/Services/ourservicesprivate.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { DetailsbagComponent } from '../detailsbag/detailsbag.component';
import { ListbagComponent } from '../listbag/listbag.component';
import { MapdeliveryComponent } from '../mapdelivery/mapdelivery.component';
import { RegistertestimonialComponent } from '../registertestimonial/registertestimonial.component';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {


  LangValue = false;

  constructor( private router: Router,public OurservicesprivateService:OurservicesprivateService,
    public OurservicescustomerService:OurservicescustomerService,private dialog :MatDialog,private toastr: ToastrService
    ,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicescustomerService.GetMyLastBagByCustomer();
    this.OurservicesprivateService.GetMyDataAccount();
    this.OurservicesprivateService.ConnectionWithSignalR();
    this.OurservicesprivateService.GetEmployeesInBranch();
  }

  LogOut()
  {
    if(localStorage.getItem('lang') == 'ar')
    {
      this.LangValue = true;
    }else{this.LangValue = false;}

    this.router.navigate(['']);
    localStorage.removeItem('token');    
    this.OurservicesprivateService.connection.stop();
  }

  ShowBagDialog(){
    this.dialog.open(ListbagComponent,{
      maxHeight:'100vh',
      maxWidth:'100vh'
    });
  }

  AddMessage()
  {    
    if(this.OurservicesprivateService.MessageText == '' || this.OurservicesprivateService.UserId == 0)
    {
      if(this.OurservicesprivateService.UserId == 0){this.toastr.warning('Make Sure Select Admin.','Alert');}else
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
    this.dialog.open(MapdeliveryComponent,{
      maxHeight:700
    });
  }

  openTestamonial(){

    this.dialog.open(RegistertestimonialComponent,{
      maxHeight:700,
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
