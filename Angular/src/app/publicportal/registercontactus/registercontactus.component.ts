import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ContactUs } from 'src/app/Shared/Models/ContactUs';
import { OurservicespublicService } from '../../Shared/shared/Services/ourservicespublic.service';
@Component({
  selector: 'app-registercontactus',
  templateUrl: './registercontactus.component.html',
  styleUrls: ['./registercontactus.component.css']
})
export class RegistercontactusComponent implements OnInit {

  FormContactusRegister = this.formBuilder.group({
    Id : new FormControl(0),
    Name : new FormControl('',[Validators.required]),
    Email : new FormControl('',[Validators.required,Validators.email]),
    PhoneNumber : new FormControl('',[Validators.required]),
    Message : new FormControl('',[Validators.required]),
  });

  ImageURL = [
    'benjamin-huggett-qa-5I65-FNc-unsplash.jpg',
    'markus-winkler-pOu_UmkOG-0-unsplash.jpg',
    'nathaniel-yeo-747NDboAWNY-unsplash.jpg',
    'nathaniel-yeo-gUZo-UA0VGQ-unsplash.jpg'
  ];
  CountForImage = 0;

  SetInterval : any;
  constructor(private OurservicespublicService :OurservicespublicService,private formBuilder : FormBuilder) { }
  Submit()
  {    
    var contactUs = new ContactUs();
    contactUs.Name = this.FormContactusRegister.controls.Name.value;
    contactUs.Email = this.FormContactusRegister.controls.Email.value;
    contactUs.PhoneNumber = this.FormContactusRegister.controls.PhoneNumber.value;
    contactUs.Messages = this.FormContactusRegister.controls.Message.value;
    
     this.OurservicespublicService.RegisterContactUs(contactUs);
  }
  ngOnInit(): void {
    this.SetInterval = setInterval(()=>
    {      
      if(this.CountForImage < 2){this.CountForImage++;} else {this.CountForImage = 0}
    },10000)
  }

  ngOnDestroy(){    
    clearInterval(this.SetInterval);
  }

}
