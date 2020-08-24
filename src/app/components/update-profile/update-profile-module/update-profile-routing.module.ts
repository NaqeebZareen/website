import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateProfileComponent } from '../update-profile.component';

const routes: Routes = [
  { path: 'update-profile', component: UpdateProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateProfileRoutingModule { }
