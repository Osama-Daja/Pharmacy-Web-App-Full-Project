import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerportalRoutingModule } from './customerportal-routing.module';
import { PortalComponent } from './portal/portal.component';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { ListbagComponent } from './listbag/listbag.component';
import { RegistertestimonialComponent } from './registertestimonial/registertestimonial.component';
import { MarketComponent } from './market/market.component';
import { DetailsbagComponent } from './detailsbag/detailsbag.component';
import { MapdeliveryComponent } from './mapdelivery/mapdelivery.component';
import { ListordersComponent } from './listorders/listorders.component';
import { DetailsproductComponent } from './detailsproduct/detailsproduct.component';
import { DetailsorderlogComponent } from './detailsorderlog/detailsorderlog.component';
import { RegisterreportComponent } from './registerreport/registerreport.component';
import { DetailsmarketproductComponent } from './detailsmarketproduct/detailsmarketproduct.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    PortalComponent,
    ListbagComponent,
    RegistertestimonialComponent,
    MarketComponent,
    DetailsbagComponent,
    MapdeliveryComponent,
    ListordersComponent,
    DetailsproductComponent,
    DetailsorderlogComponent,
    RegisterreportComponent,
    DetailsmarketproductComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CustomerportalRoutingModule,
    SharedModule,
  ],
})
export class CustomerportalModule { }
