import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { MainportalComponent } from '../../portal/Mainportal.component';

@Component({
  selector: 'app-detailsbranch',
  templateUrl: './detailsbranch.component.html',
  styleUrls: ['./detailsbranch.component.css']
})
export class DetailsbranchComponent implements OnInit {

  constructor(private router : Router,public OurservicesadminService : OurservicesadminService,public MainPortal : MainportalComponent) { }

  ngOnInit(): void {
    if(this.OurservicesadminService.DetailsBranch == null){
      this.router.navigateByUrl('');
    }
  }
  

}
