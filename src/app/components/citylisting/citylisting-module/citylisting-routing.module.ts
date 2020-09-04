import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitylistingComponent } from '../citylisting.component';


const routes: Routes = [
  {
    path: '', component: CitylistingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitylistingRoutingModule { }
