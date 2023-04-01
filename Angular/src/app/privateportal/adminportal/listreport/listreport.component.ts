import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { DetailsreportComponent } from '../detailsreport/detailsreport.component';

@Component({
  selector: 'app-listreport',
  templateUrl: './listreport.component.html',
  styleUrls: ['./listreport.component.css']
})
export class ListreportComponent implements OnInit {

  SearchReport = new FormGroup({
    StartDate: new FormControl(new Date(),Validators.required),
    EndDate: new FormControl(new Date(),Validators.required)
  });
  constructor(public adminService:OurservicesadminService,private router : Router,public matDialog: MatDialog,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
  }

  SearchReportByDate(){
    this.adminService.SearchReportByDate(this.SearchReport.controls.StartDate.value,this.SearchReport.controls.EndDate.value)
  }

  ViewDetails(id :number){
    console.log(id);
    this.adminService.GetReportDeatailsByReportId(id);
    
    setTimeout(() => {
      this.matDialog.open(DetailsreportComponent,{
        data:{
          reportId : id
        }
      });
    }, 500);
  }
}
