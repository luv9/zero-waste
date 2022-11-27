import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    address: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  registerBtnDisabled = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.registerBtnDisabled = true;
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.goToLogin({ fromSignUp: true });
      },
      (err) => {
        this.errorMessage = err.error;
        this.isSignUpFailed = true;
        this.registerBtnDisabled = false;
      }
    );
  }

  goToLogin(option?: object) {
    this.router.navigate(['/account/login', option ?? {}]);
  }
}
