import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../Authentication/authentication.guard';
import { AdminportalModule } from './adminportal/adminportal.module';
import { CustomerportalModule } from './customerportal/customerportal.module';
import { DeliveryportalModule } from './deliveryportal/deliveryportal.module';
import { MainportalComponent } from './portal/Mainportal.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateaccountComponent } from './updateaccount/updateaccount.component';

const routes: Routes = [
  {path:'',component:MainportalComponent,children:[
    {path:'profile',component:ProfileComponent},
    {path:'updateaccount',component:UpdateaccountComponent},
    {path:'admin',loadChildren:()=>AdminportalModule,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser','Admin']}},
    {path:'delivery',loadChildren:()=>DeliveryportalModule,canActivate:[AuthenticationGuard],data:{AllRoles:['Delivery']}},
    {path:'customer',loadChildren:()=>CustomerportalModule,canActivate:[AuthenticationGuard],data:{AllRoles:['Customer']}}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateportalRoutingModule { }
