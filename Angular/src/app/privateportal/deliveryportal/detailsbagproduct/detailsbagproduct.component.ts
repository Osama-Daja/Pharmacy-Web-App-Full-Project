import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OurservicesdeliveryService } from 'src/app/Shared/shared/Services/ourservicesdelivery.service';

@Component({
  selector: 'app-detailsbagproduct',
  templateUrl: './detailsbagproduct.component.html',
  styleUrls: ['./detailsbagproduct.component.css']
})
export class DetailsbagproductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public Bag: any,public OurservicesdeliveryService:OurservicesdeliveryService) { }

  ngOnInit(): void {
  }

}
