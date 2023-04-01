import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './Authentication/authentication.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PrivateportalModule } from './privateportal/privateportal.module';
import { PublicportalModule } from './publicportal/publicportal.module';

const routes: Routes = [
  {path:'',loadChildren:()=>PublicportalModule},
  {path:'private',loadChildren:()=>PrivateportalModule,canActivate:[AuthenticationGuard],data:{AllRoles:['SuperUser','Admin','Delivery','Customer']}},
  {path:'forbidden',component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
