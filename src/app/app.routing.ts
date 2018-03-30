import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuGuard } from '../app/guard/menu.guard';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    //canActivate:[MenuGuard],
    //canActivateChild:[MenuGuard]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    //canActivate:[MenuGuard],
    //canActivateChild:[MenuGuard],
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule',
        //canActivateChild:[MenuGuard],
        //canActivate:[MenuGuard]
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule',
        //canActivateChild:[MenuGuard],
        //canActivate:[MenuGuard]
      },
      {
        path: 'quanly',
        loadChildren: './views/quanly/quanly.module#QuanlyModule',
        //canActivateChild:[MenuGuard],
        //canActivate:[MenuGuard]
      },
      {
        path: 'giamsat',
        loadChildren: './views/giamsat/giamsat.module#GiamsatModule',
        //canActivateChild:[MenuGuard],
        //canActivate:[MenuGuard]
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        //canActivateChild:[MenuGuard],
        canActivate:[MenuGuard]
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule',
        //canActivateChild:[MenuGuard],
        //canActivate:[MenuGuard]
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule',
        //canActivateChild:[MenuGuard],
        //canActivate:[MenuGuard]
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule',
        //canActivateChild:[MenuGuard],
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule',
       // canActivateChild:[MenuGuard],
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    //canActivate:[MenuGuard],
   // canActivateChild:[MenuGuard],
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
        //canActivate:[MenuGuard],
        //canActivateChild:[MenuGuard],
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {


}
