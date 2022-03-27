import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tasksAngular';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    let rawToken = localStorage.getItem("token")
    if (rawToken !== null) {
      const helper = new JwtHelperService();
      if (helper.isTokenExpired(rawToken)) {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
