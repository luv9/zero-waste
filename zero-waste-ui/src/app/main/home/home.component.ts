import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

export interface WebTokenInterface {
  binId: string;
  name: string;
  status: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private dialogRef: MatDialog
  ) {}

  isDashboardActive = true;
  isProfileActive = false;
  message: WebTokenInterface;
  ngOnInit(): void {
    try {
      console.log(document.cookie);
      const cookie = document.cookie;
      const ws = new WebSocket(`ws://localhost:3000/binStatusChange`);
      ws.onmessage = ({ data }) => {
        this.message = JSON.parse(data);
        this.openAlertDialog(this.message);
      };
      ws.onopen = (event) => {
        console.log('WebSocket connection established.');
      };
    } catch (err) {
      console.log('Error connecting websocket: ', err);
    }
  }

  openAlertDialog(data: WebTokenInterface) {
    this.dialogRef.open(AlertDialogComponent, {
      height: '300px',
      width: '300px',
      data,
    });
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
