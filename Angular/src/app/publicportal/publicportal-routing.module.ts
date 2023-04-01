import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { PublicregisterComponent } from './publicregister/publicregister.component';
import { RegistercontactusComponent } from './registercontactus/registercontactus.component';
import { TrendingproductsbycategoryComponent } from './trendingproductsbycategory/trendingproductsbycategory.component';

const routes: Routes = [
  {path:'',component:PortalComponent,children:[
     {path:'',component:HomeComponent},
     {path:'login',component:LoginComponent},
     {path:'publicregister',component:PublicregisterComponent},
     {path:'registercontactus',component:RegistercontactusComponent},
     {path:'Trendingproductsbycategory',component:TrendingproductsbycategoryComponent},
     {path:'aboutus',component:AboutusComponent}
    ]}
  // {path:'',component:PortalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicportalRoutingModule { }
