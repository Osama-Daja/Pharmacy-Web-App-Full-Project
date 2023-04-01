import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OurservicespublicService } from 'src/app/Shared/shared/Services/ourservicespublic.service';

@Component({
  selector: 'app-detailsproduct',
  templateUrl: './detailsproduct.component.html',
  styleUrls: ['./detailsproduct.component.css']
})
export class DetailsproductComponent implements OnInit {
  //imgstr : string = "../../../assets/IMG/out-of-stock.png";
  constructor(public OurservicespublicService : OurservicespublicService,private dialog :MatDialogRef<DetailsproductComponent>) { }

  ngOnInit(): void {
    console.log(this.OurservicespublicService.DetailsProduct);
    
    if(this.OurservicespublicService.DetailsProduct == null){
      this.dialog.close();
    }
  }

}
