import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarRoutingModule } from './side-bar-routing.module';

import { SiderBarComponent } from '../sider-bar.component';


@NgModule({
  declarations: [SiderBarComponent],
  imports: [
    CommonModule,
    SideBarRoutingModule
  ]
  ,
  exports: [SiderBarComponent]
})
export class SideBarModule { }
