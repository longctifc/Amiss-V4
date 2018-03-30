import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, DatePipe, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { NgAutoCompleteModule } from "ng-auto-complete";
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular5-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES,
  UsernameDirective,
  PhoneDirective,
  EmailDirective,
  CompareDirective

} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES,
  UsernameDirective,
  PhoneDirective,
  EmailDirective,
  CompareDirective
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
//import service
import { ApiService } from '../app/services/common/api.service';
import { DanhMucService } from '../app/services/danhmuc/danhmuc.service';
import { UserService } from '../app/services/user/user.service';
import { MenuGuard } from './guard/menu.guard';
import { DatetimeService, TreeService } from './services';
import { Browser } from 'selenium-webdriver';
// import { TreeModule } from 'primeng/tree';
// import { TreeNode } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SukienService } from './services/sukien/sukien.service';
import { QuyenService } from './services/quyen/quyen.service';
import { CaythumucComponent } from './components/app-sidebar-nav/caythumuc/caythumuc.component';
import { SelectdefautDirective } from './directives/valid/selectdefaut.directive';
import { IsrequiredDirective } from './directives/valid/isrequired.directive';

import { jqxDropDownButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxCheckBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcheckbox';
import { jqxExpanderComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxexpander";
import { jqxInputComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxinput";
import { jqxComboBoxComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [jqxInputComponent, jqxDropDownButtonComponent, jqxTreeComponent, jqxComboBoxComponent],
  exports: [jqxInputComponent, jqxDropDownButtonComponent, jqxTreeComponent, jqxComboBoxComponent]
})
export class jqxModule { }



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    NgAutoCompleteModule,
    ModalModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    ProgressBarModule,
    MessageModule,
    MessagesModule,
    CommonModule,
    jqxModule
  ],
  exports: [
    ModalModule,
    jqxModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    SelectdefautDirective,
    IsrequiredDirective,
    CaythumucComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  },
    ApiService,
    MenuGuard,
    DanhMucService,
    UserService,
    ToasterService,
    DatetimeService,
    DatePipe,
    TreeService,
    SukienService,
    QuyenService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

