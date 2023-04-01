import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Shared/Models/Product';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-registerproduct',
  templateUrl: './registerproduct.component.html',
  styleUrls: ['./registerproduct.component.css']
})
export class RegisterproductComponent implements OnInit {

  FormRegisterProduct = new FormGroup({
    Id : new FormControl(0),
    Name : new FormControl('',[Validators.required]),
    CompanyOfOriginId : new FormControl('',[Validators.required]),
    Price : new FormControl('',[Validators.required]),
    Description : new FormControl('',[Validators.required]),
    CategoryId : new FormControl('',[Validators.required]),
    IMGProduct : new FormControl(null,[Validators.required]),
  })

  URLForImage : any = '/assets/IMG/CardUser.png';

  constructor(public OurservicesadminService : OurservicesadminService,private toastr : ToastrService,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetAllCategory();
    this.OurservicesadminService.GetAllCompanyOfOrigin();
  }

  Submit(){

    this.OurservicesadminService.CreateProduct(this.FormRegisterProduct.value)
    
  }

  Clear(){    
    this.FormRegisterProduct.reset();
    this.FormRegisterProduct.controls.Id.setValue(0);
  }

  
  fileProgress(fileInput: any) {
    this.FormRegisterProduct.controls.IMGProduct.setValue(<File>fileInput.target.files[0]);
    this.preview();
  }

  preview() {
    if (this.FormRegisterProduct.controls.IMGProduct.value != null) {

      var extension =  this.FormRegisterProduct.controls.IMGProduct.value.name.split('.').pop();

      if(this.OurservicesadminService.ExtensionForImage.find(a=>a == extension?.toLowerCase()) == null){
        this.FormRegisterProduct.controls.IMGProduct.setValue(null);
        var AllExtension = '';
        this.OurservicesadminService.ExtensionForImage.forEach(element => {
          AllExtension += ' ' + element
        });
        this.toastr.warning('Should be Image : [' + AllExtension + ' ] ');
      }else
      {

      var reader = new FileReader();
      reader.readAsDataURL(this.FormRegisterProduct.controls.IMGProduct.value);
      reader.onload = (_event) => {
        this.URLForImage = reader.result;
      }
    }
  }
}



}
