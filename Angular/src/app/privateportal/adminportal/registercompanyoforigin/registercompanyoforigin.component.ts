import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyOfOrigin } from 'src/app/Shared/Models/CompanyOfOrigin';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
@Component({
  selector: 'app-registercompanyoforigin',
  templateUrl: './registercompanyoforigin.component.html',
  styleUrls: ['./registercompanyoforigin.component.css']
})
export class RegistercompanyoforiginComponent implements OnInit {
  @Output() EditMain = new EventEmitter();

  MyForm = new FormGroup({
    Id:new FormControl(0),
    Name: new FormControl('',Validators.required),
    Description: new FormControl('',Validators.required),
  })

  constructor(public OurservicesadminService : OurservicesadminService,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetAllCompanyOfOrigin();
    setTimeout(() => {
      console.log(this.OurservicesadminService.ListCompanyOfOrigin);
    }, 1000);
  }

  Submit(){
    if(this.MyForm.controls.Id.value==0){
       var companyOfOrigin = new CompanyOfOrigin();
       companyOfOrigin.Name = this.MyForm.controls.Name.value;
       companyOfOrigin.Description = this.MyForm.controls.Description.value;
      this.OurservicesadminService.AddCompanyOfOrigin(companyOfOrigin);
    }else
    {
      var companyOfOrigin = new CompanyOfOrigin();
      companyOfOrigin.Id = Number(this.MyForm.controls.Id.value);
      companyOfOrigin.Name = this.MyForm.controls.Name.value;
      companyOfOrigin.Description = this.MyForm.controls.Description.value;
     this.OurservicesadminService.UpdateCompanyOfOrigin(companyOfOrigin);
    }
  }


  Edit(V: any){
    this.MyForm.setValue({
      Id : V.id,
      Name : V.name,
      Description : V.description
    })
    console.log(this.MyForm.value);
    
  }

  Delete(id:number){
    if(confirm('Are You Sure'))
    {
      this.OurservicesadminService.DeleteCompanyOfOrigin(id);
    }
  }

  Clear(){
    this.MyForm.reset();
    this.MyForm.patchValue({Id:0});
  }
}
