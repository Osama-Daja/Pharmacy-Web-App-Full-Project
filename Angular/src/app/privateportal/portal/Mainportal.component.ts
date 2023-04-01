import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { OurservicesprivateService } from '../../Shared/shared/Services/ourservicesprivate.service';

@Component({
  selector: 'app-Mainportal',
  templateUrl: './Mainportal.component.html',
  styleUrls: ['./Mainportal.component.css']
})
export class MainportalComponent implements OnInit {

  Lang : any;
  
  constructor(public OurservicesprivateService : OurservicesprivateService,private router:Router) { }

  MyRole = '';
  ngOnInit(): void {
    
    let lang = localStorage.getItem('lang');

    if (lang == null) { lang = "en"; }
    
    fetch('../../assets/Lang/' + lang + '.json')
      .then(response => response.json())
      .then(jsonResponse => this.Lang = jsonResponse);

    var mytoken : any = localStorage.getItem('token');
    var TokenDecode : any = jwtDecode(mytoken);
    this.MyRole = TokenDecode.role;

    switch(this.MyRole)
    {
      case ('SuperUser'):{this.router.navigateByUrl('/private/admin/homesuperuser'); break;}
      case ('Admin'):{this.router.navigateByUrl('/private/admin/homeadmin'); break;}
      case ('Delivery'):{this.router.navigateByUrl('/private/delivery'); break;}
      case ('Customer'):{this.router.navigateByUrl('/private/customer'); break;}
    }
  }


}
