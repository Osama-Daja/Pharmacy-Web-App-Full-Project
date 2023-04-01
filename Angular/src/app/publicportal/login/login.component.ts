import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OurservicespublicService } from '../../Shared/shared/Services/ourservicespublic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //RememberMe = false;
  formLogin: FormGroup = new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    RememberMe : new FormControl(false)
  })

  constructor(public OurservicespublicService: OurservicespublicService, private toastr: ToastrService
    ,private dialog : MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    if(localStorage.getItem('UserName') != null){
      this.formLogin.controls.UserName.setValue(localStorage.getItem('UserName'));
      this.formLogin.controls.Password.setValue(localStorage.getItem('Password'));
      this.formLogin.controls.RememberMe.setValue(true);
    }
  }

  submit() {
    if (this.formLogin.value == '') {
      this.toastr.warning('Make Sure Enter UserName Or Email With Password.', 'Warning')
    }
    else {
      this.OurservicespublicService.login(this.formLogin.controls.UserName.value, this.formLogin.controls.Password.value
        ,this.formLogin.controls.RememberMe.value);

        this.dialog.close();
    }
  }
}
