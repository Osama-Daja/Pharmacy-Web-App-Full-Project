import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Shared/Models/User';
import { EditdeliveryComponent } from '../editdelivery/editdelivery.component';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { Router } from '@angular/router';
import { MapdeliveryComponent } from '../mapdelivery/mapdelivery.component';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-listdelivery',
  templateUrl: './listdelivery.component.html',
  styleUrls: ['./listdelivery.component.css']
})
export class ListdeliveryComponent implements OnInit {

  BranchIdSearch = new FormControl('',[Validators.required]);
  PhoneNumberSearch = new FormControl('',Validators.required);
  
  constructor(public OurservicesadminService : OurservicesadminService,private toastr: ToastrService
    ,private dialog:MatDialog,private router : Router,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetBranch();
  }

  SearchDeliveryByPhoneNumber()
  {
    this.OurservicesadminService.SearchDeliveryByPhoneNumber(this.PhoneNumberSearch.value);
  }

  SearchDeliveryByBranch()
  {
    this.OurservicesadminService.SearchDeliveryByBranch(Number(this.BranchIdSearch.value));
  }

  Edit(Delivery :Employee)
  {    
    this.OurservicesadminService.FormDeliveryUpdate.setValue({
      Id : Delivery.id,
      UserName : Delivery.userName,
      Email : Delivery.email,
      PhoneNumber : Delivery.phoneNumber,
      NickName : Delivery.nickName,
      Gender : Delivery.gender ? 'True' : 'False',
      BranchId : String(Delivery.branchId),
    });
    this.dialog.open(EditdeliveryComponent);
  }

  UpdateBlockUserForSuperUser(Id:number,Block:boolean)
  {
    this.OurservicesadminService.UpdateBlockUserForSuperUser(Id,Block);
  }

  DeleteDelivery(Id : number)
  {
    if(confirm('Are You Sure'))
    {
      this.OurservicesadminService.DeleteDelivery(Id);
    }
  }

  UpdateSalaryUser(Id:number,SalaryEdit:number)
  {
    if(SalaryEdit == 0 || SalaryEdit == undefined)
    {this.toastr.warning('Make Sure Enter Salary.')}
    else
    {
      this.OurservicesadminService.UpdateSalaryUser(Id,SalaryEdit);
    }
  }

  EditPasswordUser(Id : number,PasswordEdit:string)
  {
    if(PasswordEdit == '' || PasswordEdit == undefined){this.toastr.warning('Make Sure Enter Password.')}
    else
    {
      this.OurservicesadminService.EditPasswordUser(Id,PasswordEdit);
    }
  }

  GetDeliveryLocationById(Id : number)
  {
    this.OurservicesadminService.GetDeliveryLocationById(Id);
    setTimeout(() => {
      this.dialog.open(MapdeliveryComponent,{
        data: {
          Id: Id
        }
      });      
    }, 500);
  }

  ShowChangePassword(employee : Employee){
    employee.ShowChangePassword = !employee.ShowChangePassword; 
    employee.ShowChangeSalary = false;
    
  }
  ShowChangeSalary(employee : Employee){
    employee.ShowChangeSalary = !employee.ShowChangeSalary; 
    employee.ShowChangePassword = false;
  }
}
