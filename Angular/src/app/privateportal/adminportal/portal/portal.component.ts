import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { OurservicesprivateService } from 'src/app/Shared/shared/Services/ourservicesprivate.service';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  MyRole = '';
  LangValue = false;

  constructor( private router: Router,public OurservicesprivateService:OurservicesprivateService
    ,private toastr: ToastrService,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {

    if(localStorage.getItem('lang') == 'ar')
    {
      this.LangValue = true;
    }else{this.LangValue = false;}

    this.OurservicesprivateService.GetMyDataAccount();

    this.OurservicesprivateService.ConnectionWithSignalR();

    var mytoken : any = localStorage.getItem('token');
    var TokenDecode : any = jwtDecode(mytoken);
    this.MyRole = TokenDecode.role;    

    if(this.MyRole == 'Admin'){
      this.router.navigateByUrl('/private/admin/homeadmin');
    }else{
      this.router.navigateByUrl('/private/admin/homesuperuser');
    }
    

  }


  LogOut()
  {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    this.OurservicesprivateService.connection.stop();
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
