import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';
@Component({
  selector: 'app-listcontactus',
  templateUrl: './listcontactus.component.html',
  styleUrls: ['./listcontactus.component.css']
})
export class ListcontactusComponent implements OnInit {
  Email = new FormControl('',Validators.required);
  PhoneNumber = new FormControl('',Validators.required);
  constructor(public OurservicesadminService : OurservicesadminService, private toastr: ToastrService,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
  }


  SearchContactUsEmail(){
    this.OurservicesadminService.SearchContactUsEmail(this.Email.value);
  }

  SearchContactUsPhoneNumber(){
    this.OurservicesadminService.SearchContactUsPhoneNumber(this.PhoneNumber.value);
  }
  Delete(id:number){
    if(confirm('Are You Sure'))
    {
      this.OurservicesadminService.DeleteContactUs(id);
    }
  }
}
