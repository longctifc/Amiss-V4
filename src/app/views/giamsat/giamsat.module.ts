import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiamsatRoutingModule } from './giamsat-routing.module';
import { DoctucthoidiemdoComponent } from './docdiemdo/doctucthoidiemdo.component';

@NgModule({
  imports: [
    CommonModule,
    GiamsatRoutingModule
  ],
  declarations: [DoctucthoidiemdoComponent]
})
export class GiamsatModule { }
