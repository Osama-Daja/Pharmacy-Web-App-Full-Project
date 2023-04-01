import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DetailsproductComponent } from 'src/app/publicportal/detailsproduct/detailsproduct.component';
import { OurservicespublicService } from 'src/app/Shared/shared/Services/ourservicespublic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor(private dialog:MatDialog,public OurservicespublicService :OurservicespublicService
    ,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.OurservicespublicService.GetAllCategory();
    this.OurservicespublicService.GetTrueTestimonial();
    this.OurservicespublicService.GetAllTrendingProduct();
    this.OurservicespublicService.GetTopSlider();
    this.OurservicespublicService.TrendingProduct();
  }


  
  GetByCategoryIdTrendingProduct(Id : number)
  {
    this.toastr.info('Please Wait.');
    this.OurservicespublicService.GetByCategoryIdTrendingProduct(Id);
  }

  Details(P:any){
    this.OurservicespublicService.DetailsProduct = P;    
    this.dialog.open(DetailsproductComponent);
  }

}
