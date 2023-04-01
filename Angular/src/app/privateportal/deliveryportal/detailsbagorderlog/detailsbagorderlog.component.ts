import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OurservicesdeliveryService } from 'src/app/Shared/shared/Services/ourservicesdelivery.service';

@Component({
  selector: 'app-detailsbagorderlog',
  templateUrl: './detailsbagorderlog.component.html',
  styleUrls: ['./detailsbagorderlog.component.css']
})
export class DetailsbagorderlogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public Bag: any,public OurservicesdeliveryService:OurservicesdeliveryService) { }

  ngOnInit(): void {
  }

}
