import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/Shared/Models/Branch';
import { Employee, User } from 'src/app/Shared/Models/User';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.css']
})
export class RegisteradminComponent implements OnInit {
  FormAdminRegiter = new FormGroup({
    Id : new FormControl(0),
    UserName : new FormControl('',[Validators.required]),
    Password : new FormControl(''),
    Email : new FormControl('',[Validators.required,Validators.email]),
    PhoneNumber : new FormControl('',[Validators.required]),
    NickName : new FormControl('',[Validators.required]),
    Gender : new FormControl('False',[Validators.required]),
    Salary : new FormControl(0),
    BranchId : new FormControl('',[Validators.required])
  })

  BranchIdSearch = new FormControl('',[Validators.required]);
  PhoneNumberSearch = new FormControl('',Validators.required);
  //Search
  //BranchIdSearch = 0;
  //PhoneNumberSearch = '';

  constructor(public OurservicesadminService : OurservicesadminService,private toastr: ToastrService,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    this.OurservicesadminService.GetBranch();
    
  }

  Submit(){

    var employee = new User();
    employee.UserName = this.FormAdminRegiter.controls.UserName.value;
    employee.Email = this.FormAdminRegiter.controls.Email.value;
    employee.Gender = this.FormAdminRegiter.controls.Gender.value == 'True' ? true : false;
    employee.PhoneNumber = this.FormAdminRegiter.controls.PhoneNumber.value;
    employee.NickName = this.FormAdminRegiter.controls.NickName.value;
    employee.BranchId = Number(this.FormAdminRegiter.controls.BranchId.value);

    if(this.FormAdminRegiter.controls.Id.value == 0)
    {
      if(this.FormAdminRegiter.controls.Password.value == '' || this.FormAdminRegiter.controls.Salary.value == 0
      || this.FormAdminRegiter.controls.Salary.value == undefined){
        this.toastr.warning('Make Sure Enter Password Or Salary.');
      }else
      {
        employee.Salary = Number(this.FormAdminRegiter.controls.Salary.value);
        employee.Password = this.FormAdminRegiter.controls.Password.value;        
    this.OurservicesadminService.RegisterAdmin(employee);
      }
    }else
    {
      
      employee.Id = Number(this.FormAdminRegiter.controls.Id.value);
      this.OurservicesadminService.EditUser(employee);
    }
  }

  Clear(){
    this.FormAdminRegiter.setValue({
      Id : 0,
      UserName : '',
      Password : '',
      Email : '',
      PhoneNumber : '',
      NickName : '',
      Gender : 'False',
      Salary : 0,
      BranchId : 0
    })
  }

  SearchAdminByPhoneNumber()
  {
    this.OurservicesadminService.SearchAdminByPhoneNumber(this.PhoneNumberSearch.value);
  }

  SearchAdminByBranch()
  {
    this.OurservicesadminService.SearchAdminByBranch(Number(this.BranchIdSearch.value));
  }

  UpdateBlockUserForSuperUser(Id:number,Block:boolean)
  {
    this.OurservicesadminService.UpdateBlockUserForSuperUser(Id,Block);
  }

  Edit(Admin :Employee)
  {    
    this.FormAdminRegiter.setValue({
      Id : Admin.id,
      UserName : Admin.userName,
      Password : '',
      Email : Admin.email,
      PhoneNumber : Admin.phoneNumber,
      NickName : Admin.nickName,
      Gender : Admin.gender ? 'True' : 'False',
      BranchId : String(Admin.branchId),
      Salary : Admin.salary,
    })
  }

  DeleteAdmin(Id : number)
  {
    if(confirm('Are You Sure'))
    {
      this.OurservicesadminService.DeleteAdmin(Id);
    }
  }

  UpdateSalaryUser(Admin :Employee)
  {        
    if(Admin.NewSalary == 0 || Admin.NewSalary == undefined)
    {this.toastr.warning('Make Sure Enter Salary.')}
    else
    {
      this.OurservicesadminService.UpdateSalaryUser(Admin.id, Number(Admin.NewSalary));
    }
  }

  EditPasswordUser(Admin : Employee)
  {
    
    if(Admin.NewPassword == '' || Admin.NewPassword == undefined){this.toastr.warning('Make Sure Enter Password.')}
    else
    {
      this.OurservicesadminService.EditPasswordUser(Admin.id,Admin.NewPassword);
    }
  }


  ShowChangeSalary(Admin : Employee){
    Admin.ShowChangeSalary = !Admin.ShowChangeSalary; 
    Admin.ShowChangePassword = false;
  }
  ShowChangePassword(Admin : Employee){
    Admin.ShowChangePassword = !Admin.ShowChangePassword; 
    Admin.ShowChangeSalary = false;
  }
}
