import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isUsernameValid: boolean = true;
  isPasswordValid: boolean = true;
  isFormValid: boolean = true;
  loginErrorMessage: string;

  isLoading: boolean = false;

  alreadyLoggedIn: boolean = false;
  loggedInUsername: string;

  constructor(private apiService: ApiService) {
    this.alreadyLoggedIn = apiService.isLoggedIn();
    if (this.alreadyLoggedIn)
      this.loggedInUsername = apiService.getUserData().username;
  }

  submit(form: NgForm) {
    this.isFormValid = true;

    const val = form.value;
    this.isUsernameValid = val.username != "";
    this.isPasswordValid = val.password != "";

    if (form.valid && val.username && val.password) {
      this.isLoading = true;

      this.apiService.login(val.username, val.password)
        .then(() => { this.isLoading = false; })
        .catch((err) => {
          this.isLoading = false;
          this.isFormValid = false;
          this.loginErrorMessage
            = "BACKEND MAY BE OFFLINE :(";
            // = err.message;
        });
    }
  }

  ngOnInit() { }

}
