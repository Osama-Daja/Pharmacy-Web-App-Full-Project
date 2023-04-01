import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-detailsreport',
  templateUrl: './detailsreport.component.html',
  styleUrls: ['./detailsreport.component.css']
})
export class DetailsreportComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public adminService: OurservicesadminService) {     
  }

  ngOnInit(): void {
  }

}
