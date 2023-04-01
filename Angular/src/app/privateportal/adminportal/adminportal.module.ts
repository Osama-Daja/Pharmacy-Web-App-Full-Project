import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminportalRoutingModule } from './adminportal-routing.module';
import { PortalComponent } from './portal/portal.component';
import { RegisteradminComponent } from './registeradmin/registeradmin.component';
import { RegisterbranchComponent } from './registerbranch/registerbranch.component';
import { UpdatebranchComponent } from './updatebranch/updatebranch.component';
import { UpdatebranchgeoComponent } from './updatebranchgeo/updatebranchgeo.component';
import { ListcustomerComponent } from './listcustomer/listcustomer.component';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { RegisterdeliveryComponent } from './registerdelivery/registerdelivery.component';
import { ListdeliveryComponent } from './listdelivery/listdelivery.component';
import { EditdeliveryComponent } from './editdelivery/editdelivery.component';
import { MapdeliveryComponent } from './mapdelivery/mapdelivery.component';
import { RegisterproductComponent } from './registerproduct/registerproduct.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { RegistercategoryComponent } from './registercategory/registercategory.component';
import { RegistercompanyoforiginComponent } from './registercompanyoforigin/registercompanyoforigin.component';
import { DetailsproductComponent } from './detailsproduct/detailsproduct.component';
import { DetailsbranchComponent } from './detailsbranch/detailsbranch.component';
import { ListtestimonialComponent } from './listtestimonial/listtestimonial.component';
import { ListcontactusComponent } from './listcontactus/listcontactus.component';
import { RegistersliderComponent } from './registerslider/registerslider.component';
import { DetailsstockComponent } from './detailsstock/detailsstock.component';
import { RegisterstockComponent } from './registerstock/registerstock.component';
import { DetailsbagorderlogComponent } from './detailsbagorderlog/detailsbagorderlog.component';
import { DetailsbagproductComponent } from './detailsbagproduct/detailsbagproduct.component';
import { ListbagComponent } from './listbag/listbag.component';
import { MapgetlocationbranchComponent } from './mapgetlocationbranch/mapgetlocationbranch.component';
import { ListreportComponent } from './listreport/listreport.component';
import { DetailsreportComponent } from './detailsreport/detailsreport.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MapaboutusComponent } from './mapaboutus/mapaboutus.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { HomesuperuserComponent } from './homesuperuser/homesuperuser.component';
import { DetailshomebagComponent } from './detailshomebag/detailshomebag.component';

@NgModule({
  declarations: [
    PortalComponent,
    RegisteradminComponent,
    RegisterbranchComponent,
    UpdatebranchComponent,
    UpdatebranchgeoComponent,
    ListcustomerComponent,
    EditcustomerComponent,
    RegisterdeliveryComponent,
    ListdeliveryComponent,
    EditdeliveryComponent,
    MapdeliveryComponent,
    RegisterproductComponent,
    ListproductComponent,
    EditproductComponent,
    RegistercategoryComponent,
    RegistercompanyoforiginComponent,
    DetailsproductComponent,
    DetailsbranchComponent,
    ListtestimonialComponent,
    ListcontactusComponent,
    RegistersliderComponent,
    DetailsstockComponent,
    RegisterstockComponent,
    DetailsbagorderlogComponent,
    DetailsbagproductComponent,
    ListbagComponent,
    MapgetlocationbranchComponent,
    ListreportComponent,
    DetailsreportComponent,
    AboutusComponent,
    MapaboutusComponent,
    HomeadminComponent,
    HomesuperuserComponent,
    DetailshomebagComponent,
  ],
  imports: [
    CommonModule,
    AdminportalRoutingModule,
    SharedModule,
  ],
})
export class AdminportalModule { }
