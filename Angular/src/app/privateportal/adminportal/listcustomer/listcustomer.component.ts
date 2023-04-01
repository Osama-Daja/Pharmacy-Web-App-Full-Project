import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditcustomerComponent } from '../editcustomer/editcustomer.component';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { Customer } from 'src/app/Shared/Models/User';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-listcustomer',
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.css']
})
export class ListcustomerComponent implements OnInit {

  SearchUserName = new FormControl('',Validators.required);
  SearchPhoneNumber=  new FormControl('',Validators.required);
  SearchEmail = new FormControl('',[Validators.required,Validators.email]);
  BranchIdSearch = new FormControl('',Validators.required);
  SearchStartBirthDay= new FormControl('',Validators.required)

  SearchBirthDay = new FormGroup({
    start: new FormControl(new Date(),Validators.required),
    end: new FormControl(new Date(),Validators.required)
  });

  constructor(public OurservicesadminService:OurservicesadminService,private router : Router,public dialog: MatDialog,public MainPortal : MainportalComponent) { 
  }

  
  ngOnInit(): void {
    this.OurservicesadminService.GetBranch();
  }

  SearchCustomerByUserName()
  {
    this.OurservicesadminService.SearchCustomerByUserName(this.SearchUserName.value);
  }

  SearchCustomerByPhoneNumber()
  {
    this.OurservicesadminService.SearchCustomerByPhoneNumber(this.SearchPhoneNumber.value);
  }

  SearchCustomerByEmail()
  {
    this.OurservicesadminService.SearchCustomerByEmail(this.SearchEmail.value);
  }

  SearchCustomerByBranch()
  {
    
    this.OurservicesadminService.SearchCustomerByBranch(Number(this.BranchIdSearch.value));
  }

  SearchCustomerByBirthDay()
  {
    
    this.OurservicesadminService.SearchCustomerByBirthDay(this.SearchBirthDay.controls.start.value,this.SearchBirthDay.controls.end.value);
  }

  EditPasswordUser(Id : number,PasswordEdit:string)
  {
    this.OurservicesadminService.EditPasswordUser(Id,PasswordEdit);
  }

  UpdateBlockUserForSuperUser(Id:number,Block:boolean)
  {
    this.OurservicesadminService.UpdateBlockUserForSuperUser(Id,Block);
  }

  GoToEdit(Customer : any){

    this.OurservicesadminService.FormCustomerUpdate.patchValue({
      Id : Customer.id,
      UserName : Customer.userName,
      Email : Customer.email,
      PhoneNumber : Customer.phoneNumber,
      NickName : Customer.nickName,
      Gender : Customer.gender ? 'True' : 'False',
    })

    this.dialog.open(EditcustomerComponent);
  }

  DeleteCustomer(Id : number){
    if(confirm('Are Tou Sure'))
    {
      this.OurservicesadminService.DeleteCustomer(Id);
    }
  }

  ShowChangePassword(customer : Customer){
    customer.ShowChangePassword = !customer.ShowChangePassword; 
    
  }
}
