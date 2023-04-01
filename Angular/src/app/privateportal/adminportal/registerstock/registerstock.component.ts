import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Stock } from 'src/app/Shared/Models/Stock';

import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';

@Component({
  selector: 'app-registerstock',
  templateUrl: './registerstock.component.html',
  styleUrls: ['./registerstock.component.css']
})
export class RegisterstockComponent implements OnInit {

  prodnum:any|undefined;
  stockForm: FormGroup = new FormGroup({
    Id: new FormControl(0),
    ProduceDate : new FormControl('',[Validators.required]),
    ExpiredDate : new FormControl('',Validators.required),
    ProductId : new FormControl ('',Validators.required),
    Quantity : new FormControl('',Validators.required)   
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public adminService: OurservicesadminService, private toastr: ToastrService) {
    this.stockForm.controls.ProductId = this.data.productId;
    this.prodnum = this.data.productId;
   }

  ngOnInit(): void {
    this.adminService.GetAllStock();
  }

  Submit(){
    if( this.stockForm.controls.Id.value == ''){
      var stock = new Stock();
      stock.ProduceDate = this.stockForm.controls.ProduceDate.value;
      stock.ExpiredDate = this.stockForm.controls.ExpiredDate.value;
      stock.ProductId = this.data.productId;
      stock.Quantity = this.stockForm.controls.Quantity.value;
      this.adminService.CreateStock(stock);

    }
    else {
      var stock = new Stock();
      stock.Id = Number(this.stockForm.controls.Id.value);
      stock.ProduceDate = this.stockForm.controls.ProduceDate.value;
      stock.ExpiredDate = this.stockForm.controls.ExpiredDate.value;
      stock.ProductId = this.data.productId;
      stock.Quantity = this.stockForm.controls.Quantity.value;
      this.adminService.UpdateStock(stock);
    }
    this.Clear();
  }

  Edit(obj:any){
    this.stockForm.setValue({
      Id : obj.id,
      ProduceDate : obj.ProduceDate,
      ExpiredDate : obj.ExpiredDate,
      ProductId : obj.ProductId,
      Quantity : obj.Quantity,
    });    
  }

  Delete(id: number) {
    if (confirm('Are You Sure')) {
      this.adminService.DeleteStock(id);
    }
  }

  Clear(){
    this.stockForm.reset();
    this.stockForm.patchValue({ Id: 0 });
  }



}
