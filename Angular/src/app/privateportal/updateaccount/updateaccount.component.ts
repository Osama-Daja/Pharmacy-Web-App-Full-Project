import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { OurservicesadminService } from '../../Shared/shared/Services/ourservicesadmin.service';
import { OurservicescustomerService } from '../../Shared/shared/Services/ourservicescustomer.service';
import { OurservicesdeliveryService } from '../../Shared/shared/Services/ourservicesdelivery.service';
import { OurservicesprivateService } from '../../Shared/shared/Services/ourservicesprivate.service';
import { MainportalComponent } from '../portal/Mainportal.component';

@Component({
  selector: 'app-updateaccount',
  templateUrl: './updateaccount.component.html',
  styleUrls: ['./updateaccount.component.css']
})
export class UpdateaccountComponent implements OnInit {

  NewUserName = new FormControl('',Validators.required);
  NewEmail = new FormControl('',[Validators.required,Validators.email]);
  //NewPassword = new FormControl('',[Validators.required,Validators.minLength(6)]);
  Passwords= this.formBuilder.group({
    Password: ['',Validators.required],
    ConfirmPassword: ['',Validators.required]
  }, {validators : this.ComparePsswords});
  NewConfirmCodePassword = new FormControl('',Validators.required);

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

  MyRole = '';

  FormUpdate = new FormGroup({
    PhoneNumber : new FormControl('',Validators.required),
    NickName : new FormControl('',Validators.required),
    Gender : new FormControl('',Validators.required),
    BirthDay : new FormControl(''),
  })
  
  // PhoneNumber = '';
  // NickName = '';
  // Gender = '';
  // BirthDay: Date | null = null;

  constructor(public OurservicesprivateService: OurservicesprivateService, 
    private formBuilder : FormBuilder,
    private OurservicescustomerService: OurservicescustomerService,
    private OurservicesadminService: OurservicesadminService,
    private OurservicesdeliveryService:OurservicesdeliveryService,
    private toastr: ToastrService,public MainPortal : MainportalComponent) {
  }

  ngOnInit(): void {
    var mytoken: any = localStorage.getItem('token');
    var TokenDecode : any = jwtDecode(mytoken);
    
    this.MyRole = TokenDecode.role;
    this.OurservicesprivateService.GetMyDataAccount();

    setTimeout(() => {
      this.FormUpdate.setValue({
        PhoneNumber :  this.OurservicesprivateService.MyAccountData.phoneNumber,
        NickName :  this.OurservicesprivateService.MyAccountData.nickName,
        Gender :  this.OurservicesprivateService.MyAccountData.gender ? 'True' : 'False',
        BirthDay :  this.OurservicesprivateService.MyAccountData.birthDay,
      })
    }, 1000);
  }

  UpdateUserNameUser() {
    if (confirm('Are You Sure ? ')) {
      this.OurservicesprivateService.UpdateUserNameUser(this.NewUserName.value);
    }
  }

  UpdateEmailUser() {
    if (confirm('Are You Sure ? ')) {
      this.OurservicesprivateService.UpdateEmailUser(this.NewEmail.value);
    }
  }

  GetConfirmCodePassword() {
    this.toastr.info('Please Wait.');
    this.OurservicesprivateService.GetConfirmCodePassword();
  }

  UpdatePasswordUser() {
    if (this.NewConfirmCodePassword.value == this.OurservicesprivateService.ConfirmCodePassword) {
      this.OurservicesprivateService.UpdatePasswordUser(this.Passwords.get('Password')?.value);
      this.NewConfirmCodePassword.reset();
      this.Passwords.reset();
    } else {
      this.toastr.warning('Code Is Mistake.');
    }
  }

  UpdateImageUser() {
    if(this.OurservicesprivateService.ProfileImageToUpload == null){
      this.toastr.warning('Make Sure Enter Image');
    }else
    {
      this.OurservicesprivateService.UpdateImageUser();
    }
  }

  fileProgress(fileInput: any) {
    this.OurservicesprivateService.ProfileImageToUpload = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    if (this.OurservicesprivateService.ProfileImageToUpload != null) {

      var extension =  this.OurservicesprivateService.ProfileImageToUpload.name.split('.').pop();

      if(this.OurservicesadminService.ExtensionForImage.find(a=>a == extension?.toLowerCase()) == null){
        this.OurservicesprivateService.ProfileImageToUpload = null;
        var AllExtension = '';
        this.OurservicesadminService.ExtensionForImage.forEach(element => {
          AllExtension += ' ' + element
        });
        this.toastr.warning('Should be Image : [' + AllExtension + ' ] ');
      }else
      {
  
        var reader = new FileReader();
        reader.readAsDataURL(this.OurservicesprivateService.ProfileImageToUpload);
        reader.onload = (_event) => {
          this.OurservicesprivateService.ProfileImageURL = reader.result;
        }
      }
    }
  }


  getLocation(): void {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.OurservicescustomerService.UpdateMyLocation(latitude, longitude)
      });
    } 
  }

  Update() {
    switch (this.MyRole) {
      case 'Customer':
        {          
          if (this.FormUpdate.controls.BirthDay.value == '0001-01-01T00:00:00') { this.toastr.warning('Make Sure Enter BirthDay') } else {
            this.OurservicescustomerService.UpdateCustomer(this.FormUpdate.controls.PhoneNumber.value, 
              this.FormUpdate.controls.NickName.value, this.FormUpdate.controls.Gender.value, 
              this.FormUpdate.controls.BirthDay.value)
          }
          break;
        }
      case 'Admin':
        {
            this.OurservicesadminService.UpdateAdmin(this.FormUpdate.controls.PhoneNumber.value, 
              this.FormUpdate.controls.NickName.value, this.FormUpdate.controls.Gender.value,)
          break;
        }
      case 'Delivery':
        {
            this.OurservicesdeliveryService.UpdateDelivery(this.FormUpdate.controls.PhoneNumber.value, 
              this.FormUpdate.controls.NickName.value, this.FormUpdate.controls.Gender.value,)
          break;
        }
        case 'SuperUser':
          {
              this.OurservicesadminService.UpdateSuperUser(this.FormUpdate.controls.PhoneNumber.value, 
                this.FormUpdate.controls.NickName.value, this.FormUpdate.controls.Gender.value,)
            break;
          }
    }
  }

}
