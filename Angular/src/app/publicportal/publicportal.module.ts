import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicportalRoutingModule } from './publicportal-routing.module';
import { PortalComponent } from './portal/portal.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PublicregisterComponent } from './publicregister/publicregister.component';
import { SharedModule } from '../Shared/shared/shared.module';
import { RegistercontactusComponent } from './registercontactus/registercontactus.component';
import { TrendingproductsbycategoryComponent } from './trendingproductsbycategory/trendingproductsbycategory.component';
import { DetailsproductComponent } from './detailsproduct/detailsproduct.component';
import { AboutusComponent } from './aboutus/aboutus.component';


@NgModule({
  declarations: [
    PortalComponent,
    HomeComponent,
    LoginComponent,
    PublicregisterComponent,
    RegistercontactusComponent,
    TrendingproductsbycategoryComponent,
    DetailsproductComponent,
    AboutusComponent
  ],
  imports: [
    CommonModule,
    PublicportalRoutingModule,
    SharedModule
  ],
})
export class PublicportalModule { }
