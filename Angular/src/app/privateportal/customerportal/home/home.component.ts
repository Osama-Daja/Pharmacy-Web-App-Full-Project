import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsproductComponent } from 'src/app/publicportal/detailsproduct/detailsproduct.component';
import { OurservicespublicService } from 'src/app/Shared/shared/Services/ourservicespublic.service';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public OurservicespublicService:OurservicespublicService
    ,private dialog:MatDialog,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicespublicService.GetAllCategory();
    this.OurservicespublicService.TrendingProductTop3();
    this.OurservicespublicService.GetAllTrendingProduct();
  }

  Details(P:any){
    this.OurservicespublicService.DetailsProduct = P;    
    this.dialog.open(DetailsproductComponent);
  }

}
