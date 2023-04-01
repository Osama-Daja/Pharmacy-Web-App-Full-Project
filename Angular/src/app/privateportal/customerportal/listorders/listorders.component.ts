import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { DetailsorderlogComponent } from '../detailsorderlog/detailsorderlog.component';
import { DetailsproductComponent } from '../detailsproduct/detailsproduct.component';

@Component({
  selector: 'app-listorders',
  templateUrl: './listorders.component.html',
  styleUrls: ['./listorders.component.css']
})
export class ListordersComponent implements OnInit {

  SearchDate = new FormGroup({
    start: new FormControl(new Date(),Validators.required),
    end: new FormControl(new Date(),Validators.required)
  });
  constructor(public OurservicescustomerService:OurservicescustomerService,private dialog:MatDialog,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
  }

  SearchOrdersByDateCustomer(){
    this.OurservicescustomerService.SearchOrdersByDateCustomer(this.SearchDate.controls.start.value,this.SearchDate.controls.end.value);
  }

  ShowOrderLog(Bag : any[]){
    this.dialog.open(DetailsorderlogComponent,{
      width: '80vh',
      height: '40vh',
      data: {
        Bag: Bag
      }
    });
  }

  ShowProduct(Bag: any){
    
    this.dialog.open(DetailsproductComponent,{
      width: '80vh',
      height: '75vh',
      data: {
        Bag: Bag
      }
    });
  }

}
