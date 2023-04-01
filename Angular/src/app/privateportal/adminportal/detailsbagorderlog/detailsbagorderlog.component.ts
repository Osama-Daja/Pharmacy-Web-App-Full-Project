import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';

@Component({
  selector: 'app-detailsbagorderlog',
  templateUrl: './detailsbagorderlog.component.html',
  styleUrls: ['./detailsbagorderlog.component.css']
})
export class DetailsbagorderlogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public Bag: any,public OurservicesadminService:OurservicesadminService) { }

  ngOnInit(): void {    
  }

}
