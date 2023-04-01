import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryportalRoutingModule } from './deliveryportal-routing.module';
import { PortalComponent } from './portal/portal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { DetailsbagComponent } from './detailsbag/detailsbag.component';
import { MapcustomerComponent } from './mapcustomer/mapcustomer.component';
import { HomeComponent } from './home/home.component';
import { DetailsbagproductComponent } from './detailsbagproduct/detailsbagproduct.component';
import { DetailsbagorderlogComponent } from './detailsbagorderlog/detailsbagorderlog.component';


@NgModule({
  declarations: [
    PortalComponent,
    DetailsbagComponent,
    MapcustomerComponent,
    HomeComponent,
    DetailsbagproductComponent,
    DetailsbagorderlogComponent,
  ],
  imports: [
    CommonModule,
    DeliveryportalRoutingModule,
    SharedModule,
  ]
})
export class DeliveryportalModule { }
