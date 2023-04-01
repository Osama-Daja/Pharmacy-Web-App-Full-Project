import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee, User } from 'src/app/Shared/Models/User';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-registerdelivery',
  templateUrl: './registerdelivery.component.html',
  styleUrls: ['./registerdelivery.component.css']
})
export class RegisterdeliveryComponent implements OnInit {

  FormDeliveryRegiter = new FormGroup({
    Id : new FormControl(0),
    UserName : new FormControl('',[Validators.required]),
    Password : new FormControl(''),
    Email : new FormControl('',[Validators.required,Validators.email]),
    PhoneNumber : new FormControl('',[Validators.required]),
    NickName : new FormControl('',[Validators.required]),
    Gender : new FormControl('False',[Validators.required]),
    Salary : new FormControl(0),
  })
  
  constructor(public OurservicesadminService:OurservicesadminService,private toastr: ToastrService,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetDeliveryByBranchId();
  }

  Submit(){
    console.log(this.FormDeliveryRegiter);
    //debugger;
    var employee = new User();
    employee.UserName = this.FormDeliveryRegiter.controls.UserName.value;
    employee.Email = this.FormDeliveryRegiter.controls.Email.value;
    employee.Gender = this.FormDeliveryRegiter.controls.Gender.value == 'True' ? true : false;
    employee.PhoneNumber = String(this.FormDeliveryRegiter.controls.PhoneNumber.value);
    employee.NickName = this.FormDeliveryRegiter.controls.NickName.value;

    if(this.FormDeliveryRegiter.controls.Id.value == 0)
    {
      if(this.FormDeliveryRegiter.controls.Password.value == '' || this.FormDeliveryRegiter.controls.Salary.value == 0
      || this.FormDeliveryRegiter.controls.Salary.value == undefined){
        this.toastr.warning('Make Sure Enter Password Or Salary.');
      }else
      {
        employee.Salary = Number(this.FormDeliveryRegiter.controls.Salary.value);
        employee.Password = this.FormDeliveryRegiter.controls.Password.value;

        console.log(employee);
        
    this.OurservicesadminService.RegisterDelivery(employee);
      }
    }else
    {
      
      employee.Id = Number(this.FormDeliveryRegiter.controls.Id.value);
      console.log(employee);
      this.OurservicesadminService.EditUser(employee);
      this.OurservicesadminService.GetDeliveryByBranchId();
    }
  }

  Clear(){
    this.FormDeliveryRegiter.reset();
    console.log(this.FormDeliveryRegiter.value);
    
  }

  UpdateBlockUserForAdmin(Id:number,Block:boolean)
  {
    this.OurservicesadminService.UpdateBlockUserForAdmin(Id,Block);
  }

  DeleteDelivery(Id : number){
    if(confirm('Are You Sure'))
    {
      this.OurservicesadminService.DeleteDelivery(Id);
    }
  }

  Edit(Admin :Employee)
  {    
    this.FormDeliveryRegiter.setValue({
      Id : Admin.id,
      UserName : Admin.userName,
      Password : '',
      Email : Admin.email,
      PhoneNumber : Admin.phoneNumber,
      NickName : Admin.nickName,
      Gender : Admin.gender ? 'True' : 'False',
      Salary : 0,
    })
  }
}
