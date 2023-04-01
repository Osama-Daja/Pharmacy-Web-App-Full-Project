import { Component, OnInit } from '@angular/core';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DetailsmarketproductComponent } from '../detailsmarketproduct/detailsmarketproduct.component';
@Component({
  selector: 'app-listbag',
  templateUrl: './listbag.component.html',
  styleUrls: ['./listbag.component.css']
})
export class ListbagComponent implements OnInit {

  Status = false;
  constructor(public OurservicescustomerService : OurservicescustomerService,private dialog:MatDialogRef<DetailsmarketproductComponent>) { }

  ngOnInit(): void {
  }

  Pluss(O : any){
    if(O.Quantity < O.quantityStock - O.quantityOrder)
    {
      O.Quantity++;
      this.OurservicescustomerService.TotalPrice += O.price
    }
  }

  minus(O : any){
    if(O.Quantity > 0){
      O.Quantity--;
      this.OurservicescustomerService.TotalPrice -= O.price
    }
  }

  Submit(){
    if(confirm('Are You Sure')){
      this.OurservicescustomerService.CreateBagByCustomerId(this.Status);
      this.dialog.close();
    }
  }

  ChangeStatus(){
    this.Status = !this.Status;
  }

  Delete(O : any,Index : number){
    this.OurservicescustomerService.TotalPrice -= (O.price * O.Quantity);

    
    if (Index == 0) {
      this.OurservicescustomerService.OrderList.splice(O, 1);
    } else {
    if (Index + 1 == this.OurservicescustomerService.OrderList.length) {
      this.OurservicescustomerService.OrderList.pop();
    } else {
      var LastIndex= this.OurservicescustomerService.OrderList.length-1;
      for (let i = Index; i <= this.OurservicescustomerService.OrderList.length - 1 ; i++) {
        this.OurservicescustomerService.OrderList[i] = this.OurservicescustomerService.OrderList[i + 1];
      }      
      this.OurservicescustomerService.OrderList.pop();
    }
    }
  }
}
