import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanlyComponent } from './nguoidung/quanly.component';
import {NgAutoCompleteModule} from "ng-auto-complete";
import {QuanlyRoutingModule} from '../quanly/quanly-routing.module'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { EmailDirective } from '../../../app/directives/validcomponent/email.directive';
import { CompareDirective } from '../../../app/directives/validcomponent/compare.directive';
import { UsernameDirective } from '../../../app/directives/validcomponent/username.directive';
import { SelectdefautDirective } from '../../../app/directives/validcomponent/selectdefaut.directive';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {CalendarModule} from 'primeng/calendar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { PhoneDirective } from '../../directives/validcomponent/phone.directive';
import { ProgressBarModule } from 'primeng/progressbar';
import {CheckboxModule} from 'primeng/checkbox';
import { IsrequiredDirective } from '../../directives/validcomponent/isrequired.directive';



@NgModule({
  imports: [
    CommonModule,
    QuanlyRoutingModule,
    BsDropdownModule,
    FormsModule,
    NgAutoCompleteModule,
    TabsModule.forRoot(),
    CalendarModule,
    MessageModule,
    MessagesModule,
    ProgressBarModule,
    CheckboxModule
  ],
  declarations: [QuanlyComponent, EmailDirective,CompareDirective,UsernameDirective,PhoneDirective, SelectdefautDirective,IsrequiredDirective],
  schemas:[
  ],
})
export class QuanlyModule { }
