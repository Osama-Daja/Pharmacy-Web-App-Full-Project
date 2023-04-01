import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
import { RegisterstockComponent } from '../registerstock/registerstock.component';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  SearchByName = new FormControl('',Validators.required);
  SearchByCompanyOfOriginId = new FormControl(0,Validators.required);
  SearchByCategoryId = new FormControl(0,Validators.required);
  
  SearchByStartPrice = new FormControl(0,Validators.required);
  SearchByEndPrice = new FormControl(0,Validators.required);

  constructor(public OurservicesadminService : OurservicesadminService,private toastr : ToastrService,private router : Router, private matDialog : MatDialog,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetAllCategory();
    this.OurservicesadminService.GetAllCompanyOfOrigin();
  }

  SearchProductByName(){
    this.toastr.info('Please Wait ...');
    this.OurservicesadminService.SearchProductByName({Name : this.SearchByName.value})
  }

  SearchProductByCompanyOfOrigin(){
    this.toastr.info('Please Wait ...');
    this.OurservicesadminService.SearchProductByCompanyOfOrigin({CompanyOfOriginId : Number(this.SearchByCompanyOfOriginId.value)})
  }

  SearchProductByCategory(){
    this.toastr.info('Please Wait ...');
    this.OurservicesadminService.SearchProductByCategory({CategoryId : Number(this.SearchByCategoryId.value)})
  }

  SearchProductByPrice(){
    this.toastr.info('Please Wait ...');
    this.OurservicesadminService.SearchProductByPrice({StartPrice : this.SearchByStartPrice.value,EndPrice : this.SearchByEndPrice.value})
  }

  DeleteProduct(Id : number){
    if(confirm('Are You Sure')){
      this.OurservicesadminService.DeleteProduct(Id);
    }
  }

  UpdateProduct(Product : any){
    this.OurservicesadminService.FormProductUpdate.patchValue({
      Id : Product.id,
      Name : Product.name,
      CompanyOfOriginId : Product.companyOfOriginId,
      Price : Product.price,
      Description : Product.description,
      CategoryId : Product.categoryId,
      IMGProduct : Product.image
    })

    this.router.navigateByUrl('/private/admin/editproduct');
  }

  UpdateProductStatus(Id : number,Status : boolean){
    this.toastr.info('Please Wait ...');    
    this.OurservicesadminService.UpdateProductStatus(Id,!Status);
  }

  GetProductDetails(Id : number){
    this.OurservicesadminService.GetProductDetails(Id);
  }

  RegisterStock(id :number){
    this.matDialog.open(RegisterstockComponent,{
      data:{
        productId : id
      }

    });

  }

}
