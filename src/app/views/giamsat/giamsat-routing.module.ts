import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctucthoidiemdoComponent } from './docdiemdo/doctucthoidiemdo.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Giám sát các thông số điện'
    },
    children: [
      {
        path: 'docdiemdo',
        component: DoctucthoidiemdoComponent,
        data: {
          title: 'Đọc tức thời điểm đo'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiamsatRoutingModule { }
