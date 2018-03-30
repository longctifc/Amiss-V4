import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { UserService } from '../services/user/user.service';

@Injectable()
export class MenuGuard implements CanActivate, CanActivateChild {
  constructor(private locate:Location,private user:UserService,private router:Router)
  {

  }
  canActivate(){
      //neu duong dan hien tai la trang login, cho phep truy cap
    if (this.locate.path() != "/pages/login") {
        if(this.user.checkLoggedIn())
        {
            //kiem tra neu dang nhap, cho phep truy cap duong dan
            return true;
        }
        else
        {
            //sonnt: neu chua dang nhap, khong cho phep truy cap
            this.router.navigate(['/pages/login']);
            return false;
        }
    }
    else
    {
        return true;
    }
    
  }
  canActivateChild() {
      //neu duong dan hien tai la trang login, cho phep truy cap
    if (this.locate.path() != "/pages/login") {
        if(this.user.checkLoggedIn())
        {
            //kiem tra neu dang nhap, cho phep truy cap duong dan
            return true;
        }
        else
        {
            //sonnt: neu chua dang nhap, khong cho phep truy cap
            window.alert("Hãy đăng nhập để truy cập trang này!");
            return false;
        }
    }
    else
    {
        return true;
    }
  }
}
