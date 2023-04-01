import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OurservicespublicService } from 'src/app/Shared/shared/Services/ourservicespublic.service';
import { DetailsproductComponent } from '../detailsproduct/detailsproduct.component';

@Component({
  selector: 'app-trendingproductsbycategory',
  templateUrl: './trendingproductsbycategory.component.html',
  styleUrls: ['./trendingproductsbycategory.component.css']
})
export class TrendingproductsbycategoryComponent implements OnInit {

  constructor(public OurservicespublicService:OurservicespublicService,private dialog:MatDialog) { }

  ngOnInit(): void {
  }


  Details(P:any){
    this.OurservicespublicService.DetailsProduct = P;    
    this.dialog.open(DetailsproductComponent);
  }
}
