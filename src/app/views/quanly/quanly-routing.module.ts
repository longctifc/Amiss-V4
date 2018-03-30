import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanlyComponent } from '../quanly/nguoidung/quanly.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý'
    },
    children: [
      {
        path: 'nguoidung',
        component: QuanlyComponent,
        data: {
          title: 'Người dùng'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlyRoutingModule { }
