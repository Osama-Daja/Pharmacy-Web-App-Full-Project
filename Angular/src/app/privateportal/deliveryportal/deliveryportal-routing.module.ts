import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  {path:'',component:PortalComponent,children:[
    {path:'',component:HomeComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryportalRoutingModule { }
