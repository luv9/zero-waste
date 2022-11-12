import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  redirectedFromSignUp = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const a = this.tokenStorage.getToken();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.route.params.subscribe(
      (params: Params) => (this.redirectedFromSignUp = params['fromSignUp'])
    );
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.user.id);
        this.tokenStorage.saveUser(data.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.goToHome();
      },
      (err) => {
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/account/register']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
