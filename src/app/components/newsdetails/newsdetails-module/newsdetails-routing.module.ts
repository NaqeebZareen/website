import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsdetailsComponent } from '../newsdetails.component';

const routes: Routes = [
  {
    path: '', component: NewsdetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsdetailsRoutingModule { }
