import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/Shared/Models/User';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent implements OnInit {

  constructor(public OurservicesadminService : OurservicesadminService,public dialog: MatDialogRef<EditcustomerComponent>) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetBranch();
  }

  Submit(){
    var user = new User();

    user.Id = this.OurservicesadminService.FormCustomerUpdate.controls.Id.value;
    user.UserName = this.OurservicesadminService.FormCustomerUpdate.controls.UserName.value ;
    user.Email = this.OurservicesadminService.FormCustomerUpdate.controls.Email.value ;
    user.PhoneNumber = this.OurservicesadminService.FormCustomerUpdate.controls.PhoneNumber.value ;
    user.NickName = this.OurservicesadminService.FormCustomerUpdate.controls.NickName.value ;
    user.Gender = this.OurservicesadminService.FormCustomerUpdate.controls.Gender.value == 'True' ? true : false;
    user.BranchId = 0 ;

    this.OurservicesadminService.EditUser(user);

    this.dialog.close();
  }

}
