import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';

@Component({
  selector: 'app-detailsorderlog',
  templateUrl: './detailsorderlog.component.html',
  styleUrls: ['./detailsorderlog.component.css']
})
export class DetailsorderlogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public Bag: any,public OurservicescustomerService:OurservicescustomerService) { }

  ngOnInit(): void {
    
  }

}
