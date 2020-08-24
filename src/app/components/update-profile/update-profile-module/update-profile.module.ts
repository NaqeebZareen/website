import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProfileRoutingModule } from './update-profile-routing.module';
import { UpdateProfileComponent } from '../update-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateProfileComponent],
  imports: [
    CommonModule,
    UpdateProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdateProfileModule { }
