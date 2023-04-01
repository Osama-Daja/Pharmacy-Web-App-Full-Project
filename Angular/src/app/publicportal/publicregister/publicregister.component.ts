import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Shared/Models/User';
import { OurservicespublicService } from '../../Shared/shared/Services/ourservicespublic.service';

@Component({
  selector: 'app-publicregister',
  templateUrl: './publicregister.component.html',
  styleUrls: ['./publicregister.component.css']
})
export class PublicregisterComponent implements OnInit {

  FormCustomerRegister = this.formBuilder.group({
    Id : new FormControl(0),
    UserName : new FormControl('',[Validators.required]),
    Email : new FormControl('',[Validators.required,Validators.email]),
    PhoneNumber : new FormControl('',[Validators.required]),
    NickName : new FormControl('',[Validators.required]),
    Gender : new FormControl('False',[Validators.required]),
    Latitude : new FormControl('',Validators.required),
    Longitude : new FormControl('',Validators.required),
    BirthDay : new FormControl('',Validators.required),
    Passwords: this.formBuilder.group({
      Password: ['',Validators.required],
      ConfirmPassword: ['',Validators.required]
    }, {validators : this.ComparePsswords})
  });

  ConfirmCode = new FormControl('',Validators.required);

  ComparePsswords (fb:any)
  {
    let ComfirmPass = fb.get('ConfirmPassword')
    if (ComfirmPass.errors == null || 'passwordMismatch' in ComfirmPass.errors)
    {
      if (fb.get('Password').value != ComfirmPass.value)
      {
        ComfirmPass.setErrors({passwordMismatch : true});
      }else
      {
        ComfirmPass.setErrors(null);
      }
    }
  }

  constructor(public OurservicespublicService :OurservicespublicService,private formBuilder : FormBuilder
    ,private dialog:MatDialogRef<PublicregisterComponent>,private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  Submit()
  {
    console.log(this.FormCustomerRegister.value);
    
    var customer = new Customer();
    customer.UserName = this.FormCustomerRegister.controls.UserName.value;
    customer.Email = this.FormCustomerRegister.controls.Email.value;
    customer.PhoneNumber = this.FormCustomerRegister.controls.PhoneNumber.value;
    customer.NickName = this.FormCustomerRegister.controls.NickName.value;
    customer.Gender = this.FormCustomerRegister.controls.Gender.value == 'True' ? true : false;
    customer.Latitude = this.FormCustomerRegister.controls.Latitude.value;
    customer.Longitude = this.FormCustomerRegister.controls.Longitude.value;
    customer.BirthDay = this.FormCustomerRegister.controls.BirthDay.value;
    customer.Password = this.FormCustomerRegister.controls.Passwords.get('Password')?.value;

    console.log(customer);
    
    this.OurservicespublicService.RegisterCustomer(customer);
    this.dialog.close();
  }

  getLocation(): void {

    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( position => {
      this.FormCustomerRegister.patchValue({
        Longitude : position.coords.latitude,
        Latitude : position.coords.longitude,
      })
      });
    }
  }


  GetConfirmCodePassword() {
    this.toastr.info('Please Wait.');
    this.OurservicespublicService.GetConfirmCode(this.FormCustomerRegister.controls.Email.value);
  }

  CheckCode(){
    if (this.ConfirmCode.value == this.OurservicespublicService.ConfirmCode) {
      this.Submit();
      this.ConfirmCode.setValue('');
    } else {
      this.toastr.warning('Code Is Mistake.');
    }
  }

}
