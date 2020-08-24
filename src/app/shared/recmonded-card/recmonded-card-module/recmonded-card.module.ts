import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RecmondedCardComponent } from '../recmonded-card.component';
import { RecmondedCardRoutingModule } from './recmonded-card-routing.module';

@NgModule({
  declarations: [RecmondedCardComponent],
  imports: [
    CommonModule,
    RecmondedCardRoutingModule
  ],
  exports: [RecmondedCardComponent]
})
export class RecmondedCardModule { }
