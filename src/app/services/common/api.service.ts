import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http,Response, ResponseType } from '@angular/http';
import { Router } from '@angular/router';
//import {UserService} from '../user/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const ROOT_URL = environment.apiUrl;

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    //private user:UserService,
    private router:Router
  ) { 

  }

  public Excute(apiURL,todo: any): Observable<any> {
    if (localStorage.getItem("UserInfo") == null || localStorage.getItem("UserInfo") == undefined) {
      this.router.navigate(['/pages/login']);
    }
    return this.http
      .post(ROOT_URL + apiURL, todo)
      .map(res=>res.json());
  }
}
