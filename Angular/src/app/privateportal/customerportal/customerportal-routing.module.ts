import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListordersComponent } from './listorders/listorders.component';
import { MarketComponent } from './market/market.component';
import { PortalComponent } from './portal/portal.component';
import { RegistertestimonialComponent } from './registertestimonial/registertestimonial.component';

const routes: Routes = [
  {path:'',component:PortalComponent,children:[
    {path:'',component:HomeComponent},
    {path:'registertestimonial',component:RegistertestimonialComponent},
    {path:'market',component:MarketComponent},
    {path:'listorders',component:ListordersComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerportalRoutingModule { }
