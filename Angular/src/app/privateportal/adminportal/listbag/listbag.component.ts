import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { DetailsbagorderlogComponent } from '../detailsbagorderlog/detailsbagorderlog.component';
import { DetailsbagproductComponent } from '../detailsbagproduct/detailsbagproduct.component';

@Component({
  selector: 'app-listbag',
  templateUrl: './listbag.component.html',
  styleUrls: ['./listbag.component.css']
})
export class ListbagComponent implements OnInit {

  SearchDate = new FormGroup({
    start: new FormControl(new Date(),Validators.required),
    end: new FormControl(new Date(),Validators.required)
  });
  constructor(public OurservicesadminService:OurservicesadminService,private dialog:MatDialog,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
  }

  SearchOrdersByDateCustomer(){
    this.OurservicesadminService.SearchOrdersByDateAdmin(this.SearchDate.controls.start.value,this.SearchDate.controls.end.value);
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
