import { Component, Inject, Input, OnInit } from '@angular/core';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-detailsstock',
  templateUrl: './detailsstock.component.html',
  styleUrls: ['./detailsstock.component.css']
})
export class DetailsstockComponent implements OnInit {

  stockId: number | undefined;
  ProduceDate: any | undefined;
  ExpiredDate: any | undefined;
  ProductId: number | undefined;
  Quantity: any | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public adminService: OurservicesadminService) {
    this.stockId = this.data.stockId;
    this.ProduceDate = this.data.produceDate;
    this.ExpiredDate = this.data.expiredDate;
    
    this.ProductId = this.data.productId;
    this.Quantity = this.data.quantity;
    


  }

  ngOnInit(): void {

  }


 
}
