import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { OurservicesdeliveryService } from 'src/app/Shared/shared/Services/ourservicesdelivery.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { DetailsbagorderlogComponent } from '../detailsbagorderlog/detailsbagorderlog.component';
import { DetailsbagproductComponent } from '../detailsbagproduct/detailsbagproduct.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  SearchDate = new FormGroup({
    start: new FormControl(new Date(),Validators.required),
    end: new FormControl(new Date(),Validators.required)
  });
  
  constructor(public OurservicesdeliveryService:OurservicesdeliveryService,private dialog : MatDialog,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
  }

  SearchOrdersByDateDelivery(){
    this.OurservicesdeliveryService.SearchOrdersByDateDelivery(
      this.SearchDate.controls.start.value.toISOString().slice(0,10)
    ,this.SearchDate.controls.end.value.toISOString().slice(0,10));
  }


  ShowOrderLog(Bag : any[]){
    this.dialog.open(DetailsbagorderlogComponent,{
      width: '80vh',
      height: '40vh',
      data: {
        Bag: Bag
      }
    });
  }

  ShowProduct(Bag: any){
    
    this.dialog.open(DetailsbagproductComponent,{
      width: '80vh',
      height: '75vh',
      data: {
        Bag: Bag
      }
    });
  }
}
