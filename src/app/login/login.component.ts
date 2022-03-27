import {Component, OnInit} from '@angular/core';
import {User} from "../modelInterface/User";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth-service.service";
import {ApiError} from "../modelInterface/ApiError";
import {JWTToken} from "../modelInterface/AccessToken";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService ]
})
export class LoginComponent implements OnInit {

  error: ApiError = {
    errorCode: "",
    errorMessage: ""
  }

  loginForm: FormGroup = this.fb.group({
    name: [null],
    password: [null]
  });

  constructor(private service: AuthService, private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let rawToken = localStorage.getItem("token")
    if (rawToken !== null) {
      const helper = new JwtHelperService();
      if (!helper.isTokenExpired(rawToken)) {
        this.error = {errorCode: "", errorMessage: "You are authorised yet! Please, exit and try login again."}
      } else {
        this.login()
      }
    } else {
      this.login()
    }


  }

  private login() {
    this.service.login(this.loginForm.get("name")?.value, this.loginForm.get("password")?.value)
      .subscribe({
        next: (token: JWTToken) => {
          localStorage.setItem("token", token.access_token)
          this.error = {errorMessage: "", errorCode: ""}
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.error
        },
        complete: () => {
          this.router.navigate(['']);
        }
      });
  }

}
