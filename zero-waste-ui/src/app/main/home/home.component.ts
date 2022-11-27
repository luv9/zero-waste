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
  message: any;
  ngOnInit(): void {
    try {
      console.log(document.cookie);
      const cookie = document.cookie;
      const ws = new WebSocket(`ws://localhost:3000/binStatusChange`);
      ws.onmessage = ({data}) => {
        this.message =  data;
        console.log(this.message);
      }
      ws.onopen = (event) => {
        console.log("WebSocket connection established.");
    }
    } catch(err) {
      console.log('Error connecting websocket: ', err);
    }
  }
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
