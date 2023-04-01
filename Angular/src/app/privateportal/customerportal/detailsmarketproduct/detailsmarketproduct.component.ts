import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';

@Component({
  selector: 'app-detailsmarketproduct',
  templateUrl: './detailsmarketproduct.component.html',
  styleUrls: ['./detailsmarketproduct.component.css']
})
export class DetailsmarketproductComponent implements OnInit {
  productName: any | undefined;
  productPrice: any | undefined;
  productImage: any | undefined;

  productDescription: any | undefined;
  categoryImage: any | undefined;
  categoryDescription: any | undefined;

  categoryName: any | undefined;
  companyOfOriginName: any | undefined;
  companyOfOriginDescription: any | undefined;

  expiredDate: any | undefined;
  produceDate: any | undefined;
   quantityOrder: any | undefined;

  quantityStock: any | undefined;
  sumQuantity: any | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public customerService: OurservicescustomerService) {
    this.productName = this.data.name;
    this.productPrice = this.data.price;
    this.productImage = this.data.image;

    this.productDescription = this.data.description;
    this.categoryImage = this.data.categoryImage;
    this.categoryDescription = this.data.categoryDescription;

    this.categoryName = this.data.categoryName;
    this.companyOfOriginName = this.data.companyOfOriginName;
    this.companyOfOriginDescription = this.data.companyOfOriginDescription;

    this.produceDate = this.data.produceDate;
    this.expiredDate = this.data.expiredDate;
    this.quantityOrder = this.data.quantityOrder;

    this.quantityStock = this.data.quantityStock;
    this.sumQuantity = this.data.sumQuantity;
  }

  ngOnInit(): void {
  }

}
