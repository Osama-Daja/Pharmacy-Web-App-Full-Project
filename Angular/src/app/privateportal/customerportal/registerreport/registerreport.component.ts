import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/app/Shared/Models/Report';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';


@Component({
  selector: 'app-registerreport',
  templateUrl: './registerreport.component.html',
  styleUrls: ['./registerreport.component.css']
})
export class RegisterreportComponent implements OnInit {

  prodnum: any | undefined;
  reportForm: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Text: new FormControl('', [Validators.required]),
    Rating: new FormControl(''),
    OrderId: new FormControl('', [Validators.required]),

  });

  ///selecting stars 
  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }
  ];

  constructor(public customerService: OurservicescustomerService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reportForm.controls.OrderId = this.data.orderId;
    this.prodnum = this.data.orderId;
  }

  ngOnInit(): void {
  }

  Submit() {
    if(this.selectedRating == 0){
      this.toastr.warning('Please Rating');
    }
    
    else if(this.reportForm.controls.Id.value == '') {
      var report = new Report();

      report.OrderId = this.data.orderId;
      report.Rating = this.selectedRating;
      report.Text = this.reportForm.controls.Text.value;
      this.customerService.AddReport(report);

    }
  }

  selectStar(value: any): void {
    this.selectedRating = value;
    const q = document.querySelector('.fa-star');
    q?.classList.remove("active-fa");
    for (let index = 1; index <= value; index++) {
      q?.classList.add("active-fa");
    }
  }
}
