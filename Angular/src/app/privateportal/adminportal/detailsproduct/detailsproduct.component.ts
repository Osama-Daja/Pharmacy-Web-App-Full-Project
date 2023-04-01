import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { DetailsstockComponent } from '../detailsstock/detailsstock.component';

@Component({
  selector: 'app-detailsproduct',
  templateUrl: './detailsproduct.component.html',
  styleUrls: ['./detailsproduct.component.css']
})
export class DetailsproductComponent implements OnInit {

  constructor(private router : Router,public OurservicesadminService : OurservicesadminService, private matDialog : MatDialog,public MainPortal : MainportalComponent ) { }

  ngOnInit(): void {
    if(this.OurservicesadminService.DetailsProduct == null){
      this.router.navigateByUrl('');
    }
  }
  openStock(stock : any){
    this.matDialog.open(DetailsstockComponent,{
      data: stock
    
    });
  }
}
