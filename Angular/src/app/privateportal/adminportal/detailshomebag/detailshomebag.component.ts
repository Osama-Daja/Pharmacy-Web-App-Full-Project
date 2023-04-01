import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';

@Component({
  selector: 'app-detailshomebag',
  templateUrl: './detailshomebag.component.html',
  styleUrls: ['./detailshomebag.component.css']
})
export class DetailshomebagComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public Bag: any,public OurservicesadminService : OurservicesadminService) { }

  ngOnInit(): void {
  }

}
