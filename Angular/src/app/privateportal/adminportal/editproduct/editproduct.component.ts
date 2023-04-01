import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  IMGProduct = new FormControl(null,Validators.required);
  URLForImage : any = '';

  constructor(public OurservicesadminService : OurservicesadminService,private toastr : ToastrService,private router : Router) { }

  ngOnInit(): void {
    if(this.OurservicesadminService.FormProductUpdate.controls.Id.value == 0){
      this.router.navigate(['']);
    }else
    {
      this.URLForImage = this.OurservicesadminService.URLIMG + this.OurservicesadminService.FormProductUpdate.controls.IMGProduct.value;      
    }
  }

  Submit(){
    this.OurservicesadminService.UpdateProduct()
    
  }

  fileProgress(fileInput: any) {
    this.IMGProduct.setValue(<File>fileInput.target.files[0]);
    this.preview();
  }

  preview() {

    var extension =  this.IMGProduct.value.name.split('.').pop();

      if(this.OurservicesadminService.ExtensionForImage.find(a=>a == extension.toLowerCase()) == null){
        this.IMGProduct.setValue (null);
        var AllExtension = '';
        this.OurservicesadminService.ExtensionForImage.forEach(element => {
          AllExtension += ' ' + element
        });
        this.toastr.warning('Should be Image : [' + AllExtension + ' ] ');
      }else
      {
    if (this.IMGProduct.value != null) {

      var reader = new FileReader();
      reader.readAsDataURL(this.IMGProduct.value);
      reader.onload = (_event) => {
        this.URLForImage = reader.result;
      }
    }
  }
  }

  UpdateProductImage(){
    if(this.IMGProduct.value == null)
    {
      this.toastr.warning('Make Sure Enter Image.');
    }else
    {
      this.OurservicesadminService.UpdateProductImage(this.IMGProduct.value);
    }
  }
}
