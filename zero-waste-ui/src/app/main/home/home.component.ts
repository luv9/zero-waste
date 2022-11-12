import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  isDashboardActive = true;
  isProfileActive = false;
  ngOnInit(): void {}
  changeToDashboard() {
    this.isProfileActive = false;
    this.isDashboardActive = true;
  }
  changeToProfileSection() {
    this.isDashboardActive = false;
    this.isProfileActive = true;
  }
  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/account/login']);
  }
}
