import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Testimonial } from 'src/app/Shared/Models/Testimonial';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
@Component({
  selector: 'app-registertestimonial',
  templateUrl: './registertestimonial.component.html',
  styleUrls: ['./registertestimonial.component.css']
})
export class RegistertestimonialComponent implements OnInit {
  MyForm = new FormGroup({
    Id:new FormControl(0),
    Text: new FormControl('',[Validators.required,Validators.maxLength(150)]),
   
  })
  constructor(public OurservicesadminService : OurservicesadminService,private OurservicescustomerService:OurservicescustomerService) { }

  ngOnInit(): void {

  }

  Submit(){
    var testimonial = new Testimonial();
    testimonial.Text = this.MyForm.controls.Text.value;
    
   this.OurservicescustomerService.AddTestimonial(testimonial);
   this.Clear();
  }

  

  Clear(){
    this.MyForm.reset();
    this.MyForm.patchValue({Id:0});
  }

}
