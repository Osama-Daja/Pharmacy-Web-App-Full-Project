import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/Authentication/authentication.guard';
import { DetailsbagorderlogComponent } from './detailsbagorderlog/detailsbagorderlog.component';
import { DetailsbagproductComponent } from './detailsbagproduct/detailsbagproduct.component';
import { DetailsbranchComponent } from './detailsbranch/detailsbranch.component';
import { DetailsproductComponent } from './detailsproduct/detailsproduct.component';
import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ListbagComponent } from './listbag/listbag.component';
import { ListcontactusComponent } from './listcontactus/listcontactus.component';
import { ListcustomerComponent } from './listcustomer/listcustomer.component';
import { ListdeliveryComponent } from './listdelivery/listdelivery.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { ListtestimonialComponent } from './listtestimonial/listtestimonial.component';
import { MapdeliveryComponent } from './mapdelivery/mapdelivery.component';
import { PortalComponent } from './portal/portal.component';
import { RegisteradminComponent } from './registeradmin/registeradmin.component';
import { RegisterbranchComponent } from './registerbranch/registerbranch.component';
import { RegistercategoryComponent } from './registercategory/registercategory.component';
import { RegistercompanyoforiginComponent } from './registercompanyoforigin/registercompanyoforigin.component';
import { RegisterdeliveryComponent } from './registerdelivery/registerdelivery.component';
import { RegisterproductComponent } from './registerproduct/registerproduct.component';
import { RegistersliderComponent } from './registerslider/registerslider.component';
import { RegisterstockComponent } from './registerstock/registerstock.component';
import { UpdatebranchComponent } from './updatebranch/updatebranch.component';
import { UpdatebranchgeoComponent } from './updatebranchgeo/updatebranchgeo.component';
import { ListreportComponent } from './listreport/listreport.component';
import { DetailsreportComponent } from './detailsreport/detailsreport.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { HomesuperuserComponent } from './homesuperuser/homesuperuser.component';

const routes: Routes = [
  {path:'',component:PortalComponent,children:[
    {path:'homesuperuser',component:HomesuperuserComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'registeradmin',component:RegisteradminComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'registerbranch',component:RegisterbranchComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'updatebranch',component:UpdatebranchComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'updatebranchgeo',component:UpdatebranchgeoComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'listcustomer',component:ListcustomerComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'editcustomer',component:EditcustomerComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'listdelivery',component:ListdeliveryComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'editcustomer',component:EditcustomerComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'mapdelivery',component:MapdeliveryComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'registercategory',component:RegistercategoryComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'registercompanyoforigin',component:RegistercompanyoforiginComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'listtestimonial',component:ListtestimonialComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'listcontactus',component:ListcontactusComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'listreport',component :ListreportComponent, canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'detailsreport',component :DetailsreportComponent, canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'registerslider',component :RegistersliderComponent, canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},
    {path:'aboutus',component :AboutusComponent, canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser']}},

    {path:'detailsbranch',component:DetailsbranchComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin','SuperUser']}},
    {path:'registerstock',component :RegisterstockComponent, canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser','Admin']}},
    {path:'detailsproduct',component:DetailsproductComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin','SuperUser']}},

    {path:'homeadmin',component:HomeadminComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin']}},
    {path:'listproduct',component:ListproductComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin']}},
    {path:'editproduct',component:EditproductComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin']}},
    {path:'registerdelivery',component:RegisterdeliveryComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin']}},
    {path:'registerproduct',component:RegisterproductComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin']}},
    {path:'listbag',component:ListbagComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin']}},
    {path:'detailsbagorderlog',component:DetailsbagorderlogComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin']}},
    {path:'detailsbagproduct',component:DetailsbagproductComponent,canActivate:[AuthenticationGuard],data:{AllRoles:['Admin']}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminportalRoutingModule { }
