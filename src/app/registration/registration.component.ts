import {Component, OnInit} from '@angular/core';
import {ApiError} from "../modelInterface/ApiError";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth-service.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JWTToken} from "../modelInterface/AccessToken";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../modelInterface/User";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  error: ApiError = {
    errorCode: "",
    errorMessage: ""
  }

  regForm: FormGroup = this.fb.group({
    name: [null],
    password: [null],
    repeatPassword: [null]
  });

  constructor(private service: AuthService, private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if ( this.regForm.get("password")?.value == this.regForm.get("repeatPassword")?.value) {
      this.register()
    } else {
      this.error.errorMessage = " Password and Password Repeat fields a not equal!";
    }
  }

  private register() {
    this.service.register(this.regForm.get("name")?.value, this.regForm.get("password")?.value)
      .subscribe({
        next: (user: User) => {
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
