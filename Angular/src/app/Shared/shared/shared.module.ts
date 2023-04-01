import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OurservicesprivateService } from 'src/app/Shared/shared/Services/ourservicesprivate.service';
import { Authenticationintercepter } from 'src/app/Authentication/Authentication.intercepter';
import { OurservicesdeliveryService } from 'src/app/Shared/shared/Services/ourservicesdelivery.service';
import { OurservicescustomerService } from 'src/app/Shared/shared/Services/ourservicescustomer.service';
import { OurservicesadminService } from 'src/app/Shared/shared/Services/ourservicesadmin.service';
import { OurservicespublicService } from 'src/app/Shared/shared/Services/ourservicespublic.service';

import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    OurservicesprivateService,OurservicescustomerService
    ,OurservicespublicService,OurservicesdeliveryService
    ,OurservicesadminService, {
    provide: HTTP_INTERCEPTORS,
    useClass: Authenticationintercepter,
    multi: true
  },
]
})
export class SharedModule { }
