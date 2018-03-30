import { Component } from '@angular/core';
import { Http,Response, ResponseType, Jsonp } from '@angular/http';
import { Router } from '@angular/router';
import {UserService} from '../../services/index';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  dataRet: any;
  // items:any;
  // min:any;
  constructor(private userService: UserService,private http:Http,private router:Router) {
    //this.getData();
  }

  loginClick(username, password) {
    this.userService.login(username,password).subscribe(response => {
      this.dataRet = JSON.parse(response);
      if(this.dataRet.data.length ===1)
      {
        localStorage.setItem("UserInfo", JSON.stringify(this.dataRet.data[0]));
        this.router.navigate(['/dashboard']);
      }
      else
      {
        alert("Đăng nhập thất bại");
      }
    });
  }
}
