import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { OurservicesprivateService } from '../../Shared/shared/Services/ourservicesprivate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public OurservicesprivateService : OurservicesprivateService) { }

  MyRole : string = '';
  ngOnInit(): void {    
    var mytoken : any = localStorage.getItem('token');
    var TokenDecode : any = jwtDecode(mytoken);
    this.MyRole = TokenDecode.role;    
    this.OurservicesprivateService.GetMyDataAccount();
    
  }

}
