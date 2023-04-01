import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-detailsbagproduct',
  templateUrl: './detailsbagproduct.component.html',
  styleUrls: ['./detailsbagproduct.component.css']
})
export class DetailsbagproductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public Bag: any,public OurservicesadminService:OurservicesadminService) { }

  ngOnInit(): void {
    
  }

}
