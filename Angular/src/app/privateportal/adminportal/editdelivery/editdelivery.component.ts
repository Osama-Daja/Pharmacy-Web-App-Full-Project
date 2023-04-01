import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/Shared/Models/User';
import { EditcustomerComponent } from '../editcustomer/editcustomer.component';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';

@Component({
  selector: 'app-editdelivery',
  templateUrl: './editdelivery.component.html',
  styleUrls: ['./editdelivery.component.css']
})
export class EditdeliveryComponent implements OnInit {

  constructor(public OurservicesadminService : OurservicesadminService,public dialog: MatDialogRef<EditcustomerComponent>) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetBranch();
  }

  Submit(){
    var user = new User();

    user.Id = this.OurservicesadminService.FormDeliveryUpdate.controls.Id.value;
    user.UserName = this.OurservicesadminService.FormDeliveryUpdate.controls.UserName.value ;
    user.Email = this.OurservicesadminService.FormDeliveryUpdate.controls.Email.value ;
    user.PhoneNumber = this.OurservicesadminService.FormDeliveryUpdate.controls.PhoneNumber.value ;
    user.NickName = this.OurservicesadminService.FormDeliveryUpdate.controls.NickName.value ;
    user.Gender = this.OurservicesadminService.FormDeliveryUpdate.controls.Gender.value == 'True' ? true : false;
    user.BranchId = Number(this.OurservicesadminService.FormDeliveryUpdate.controls.BranchId.value);

    this.OurservicesadminService.EditUser(user);

    this.dialog.close();
  }

}
