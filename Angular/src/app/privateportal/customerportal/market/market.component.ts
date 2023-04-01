import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsmarketproductComponent } from '../detailsmarketproduct/detailsmarketproduct.component';
import { MainportalComponent } from '../../portal/Mainportal.component';
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  FormSearch = new FormGroup({
    Name : new FormControl(''),
    CategoryId : new FormControl(0),
    CompanyOfOriginId : new FormControl(0)
  })

  constructor(public OurservicesadminService: OurservicesadminService,public OurservicescustomerService : OurservicescustomerService
    ,private toastr : ToastrService,private matDialog : MatDialog,public MainPortal : MainportalComponent ) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetAllCategory();
    this.OurservicesadminService.GetAllCompanyOfOrigin();
  }


  Submit(){
    this.OurservicescustomerService.SearchProductByCustomer(this.FormSearch.value);
  }

  Clear(){
    this.FormSearch.reset();
  }

  AddOrder(Product : any){
    var Check = this.OurservicescustomerService.OrderList.find(a=>a.id == Product.id);

    if(Check != null)
    {
      this.toastr.warning('You Have Already That Product.');
    }else{
      Product.Quantity = 0;
      Product.ProductId = Product.id;
      this.OurservicescustomerService.OrderList.push(Product);
    }
  }

  MarketProductDetails(product: any){
    this.matDialog.open(DetailsmarketproductComponent,{
      data: product
    });
  }
}
