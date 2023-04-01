import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Shared/Models/Category';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
@Component({
  selector: 'app-registercategory',
  templateUrl: './registercategory.component.html',
  styleUrls: ['./registercategory.component.css']
})
export class RegistercategoryComponent implements OnInit {
  
  File : File | null = null;
  ImagePreview : any = '../assets/IMG/diagram.png';

  MyForm :FormGroup = new FormGroup({
    Id:new FormControl(0),
    Name: new FormControl('',Validators.required),
    Description: new FormControl('',Validators.required),
  })

  constructor(public OurservicesadminService : OurservicesadminService, private toastr : ToastrService,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetAllCategory();
  }
  Submit(){

      if(this.MyForm.controls.Id.value==''){
        if(this.File == null){
          this.toastr.warning('Make Sure Enter Image');
        }else
        {
          var category = new Category();
          category.Name = this.MyForm.controls.Name.value;
          category.Description = this.MyForm.controls.Description.value;
          category.Image = this.File;
         this.OurservicesadminService.AddCategory(category);
        }
    }else
    {
      var category = new Category();
      category.Id = Number(this.MyForm.controls.Id.value);
      category.Name = this.MyForm.controls.Name.value;
      category.Description = this.MyForm.controls.Description.value;
      category.Image = this.File;
     this.OurservicesadminService.UpdateCategory(category);
    }
  }

  Edit(V: any){
    this.MyForm.setValue({
      Id : V.id,
      Name : V.name,
      Description : V.description
    });
    this.ImagePreview = this.OurservicesadminService.URLIMG + V.image;
  }

  Delete(id:number){
    if(confirm('Are You Sure'))
    {
      this.OurservicesadminService.DeleteCategory(id);
    }
 
  }
  Clear(){
    this.MyForm.reset();
    this.MyForm.patchValue({Id:0});
    this.File = null;
  }


  fileProgress(fileInput: any) {
    this.File = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    if (this.File != null) {
      var extension =  this.File.name.split('.').pop();

      if(this.OurservicesadminService.ExtensionForImage.find(a=>a == extension?.toLowerCase()) == null){
        this.File = null;
        var AllExtension = '';
        this.OurservicesadminService.ExtensionForImage.forEach(element => {
          AllExtension += ' ' + element
        });
        this.toastr.warning('Should be Image : [' + AllExtension + ' ] ');
      }else
      {
        var reader = new FileReader();
        reader.readAsDataURL(this.File);
        reader.onload = (_event) => {
          this.ImagePreview = reader.result;
        }
      }
    }
  }
  
}
