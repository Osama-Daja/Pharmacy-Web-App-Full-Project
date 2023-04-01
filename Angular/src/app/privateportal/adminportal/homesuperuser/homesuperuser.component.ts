import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { DetailshomebagComponent } from '../detailshomebag/detailshomebag.component';

@Component({
  selector: 'app-homesuperuser',
  templateUrl: './homesuperuser.component.html',
  styleUrls: ['./homesuperuser.component.css']
})
export class HomesuperuserComponent implements OnInit {

  SearchDate = new FormGroup({
    start: new FormControl(new Date(),Validators.required),
    end: new FormControl(new Date(),Validators.required)
  });

  SearchDateBranch = new FormGroup({
    start: new FormControl(new Date(),Validators.required),
    end: new FormControl(new Date(),Validators.required),
  });
  
  BranchId = new FormControl('',Validators.required);
  constructor(public OurservicesadminService:OurservicesadminService,private dialog : MatDialog,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetBranch();
  }

  TrendingProductByDate(){
    this.OurservicesadminService.TrendingProductByDate(this.SearchDate.controls.start.value.toISOString().slice(0,10)
    ,this.SearchDate.controls.end.value.toISOString().slice(0,10));
  }

  TrendingBranchByDateAdmin(){    
    console.log(this.SearchDateBranch);
    
    this.OurservicesadminService.TrendingBranchByDateAdmin(
      this.SearchDateBranch.controls.start.value.toISOString().slice(0,10)
    ,this.SearchDateBranch.controls.end.value.toISOString().slice(0,10));
  }

  GetActiveDeliveries(){
    this.OurservicesadminService.GetActiveDeliveries(this.BranchId.value)
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
