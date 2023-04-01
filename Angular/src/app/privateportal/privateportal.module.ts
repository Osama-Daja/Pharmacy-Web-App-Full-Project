import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateportalRoutingModule } from './privateportal-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UpdateaccountComponent } from './updateaccount/updateaccount.component';
import { MainportalComponent } from './portal/Mainportal.component';
import { SharedModule } from '../Shared/shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateaccountComponent,
    MainportalComponent
  ],
  imports: [
    CommonModule,
    PrivateportalRoutingModule,
    SharedModule

  ],
})
export class PrivateportalModule { }
