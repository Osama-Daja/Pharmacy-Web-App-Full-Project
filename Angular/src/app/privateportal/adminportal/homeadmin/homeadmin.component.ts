import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { DetailshomebagComponent } from '../detailshomebag/detailshomebag.component';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.css']
})
export class HomeadminComponent implements OnInit {

  
  constructor(public OurservicesadminService:OurservicesadminService,private dialog:MatDialog,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    
    this.OurservicesadminService.GetDetailsMyBranch();
  }


  GetActiveDeliveriesAdmin(){
    this.OurservicesadminService.GetActiveDeliveriesAdmin();
  }

  Details(Bag : any){
    this.dialog.open(DetailshomebagComponent,{
      width: '60vh',
      height: '40vh',
      data:{
        Bag
      }
    })
  }
}
