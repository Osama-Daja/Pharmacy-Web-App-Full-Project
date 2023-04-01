import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LoginComponent } from '../login/login.component';
import { PublicregisterComponent } from '../publicregister/publicregister.component';
import { RegistercontactusComponent } from '../registercontactus/registercontactus.component';
import { OurservicespublicService } from 'src/app/Shared/shared/Services/ourservicespublic.service';
import { ToastrService } from 'ngx-toastr';
import { DetailsproductComponent } from '../detailsproduct/detailsproduct.component';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(private router: Router,private dialog:MatDialog,public OurservicespublicService :OurservicespublicService
    ,private toastr:ToastrService) { }

  ngOnInit(): void {
    var R = localStorage.getItem('token');
    if(R != null)
    {
      var TokenDecode : any = jwtDecode(R);
      const MyRole = TokenDecode.role;

      switch(MyRole)
      {
        case ('SuperUser'):{this.router.navigateByUrl('/private/admin'); break;}
        case ('Admin'):{this.router.navigateByUrl('/private/admin'); break;}
        case ('Delivery'):{this.router.navigateByUrl('/private/delivery'); break;}
        case ('Customer'):{this.router.navigateByUrl('/private/customer'); break;}
      }
    }
  }



  // GoToContactUs(){
  //   this.dialog.open(RegistercontactusComponent);
  // }

  GoToLogIn(){
    this.dialog.open(LoginComponent);
  }

  GoToRegister(){
    this.dialog.open(PublicregisterComponent);
  }

}
