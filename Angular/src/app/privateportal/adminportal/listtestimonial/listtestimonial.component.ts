import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OurservicesadminService } from '../../../Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';


@Component({
  selector: 'app-listtestimonial',
  templateUrl: './listtestimonial.component.html',
  styleUrls: ['./listtestimonial.component.css']
})
export class ListtestimonialComponent implements OnInit {

  text = new FormControl('',Validators.required);

  searchbydate = new FormGroup({
    start: new FormControl(new Date(),Validators.required),
    end: new FormControl(new Date(),Validators.required)
  });
  

  constructor(public OurservicesadminService : OurservicesadminService, private toastr: ToastrService,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
  }

  Delete(id:number){
    if(confirm('Are You Sure'))
    {
      this.OurservicesadminService.DeleteTestimonial(id);
    }
  }

  SearchTestamonialText(){
    this.OurservicesadminService.SearchTestamonialText(this.text.value);
  }

  SearchDate(){
    this.toastr.info('Please Wait ...');
    
    this.OurservicesadminService.SearchDateTestamonial(this.searchbydate.controls.start.value,this.searchbydate.controls.end.value)
  }

  ChangeStatus(Testimonial : any){
    this.OurservicesadminService.ChangeStatus(Testimonial);
  }

}
