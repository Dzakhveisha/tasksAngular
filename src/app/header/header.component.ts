import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isUserLogin(){
    let rawToken = localStorage.getItem("token")
    if (rawToken !== null) {
      const helper = new JwtHelperService();
      if (helper.isTokenExpired(rawToken)) {
        return false;
      }else {
        return true;
      }
    } else {
      return false
    }
  }

  getUserName(): string{
    let rawToken = localStorage.getItem("token")
    if (rawToken !== null) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(rawToken);
      return  decodedToken.sub;
    } else {
      return "";
    }
  }

  logout() {
    localStorage.removeItem("token");
  }
}
