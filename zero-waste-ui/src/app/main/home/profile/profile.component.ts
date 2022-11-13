import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private tokenStorage: TokenStorageService) {}
  userDetails: {
    fullName: string;
    email: string;
  };
  email: string;
  username: string;

  ngOnInit(): void {
    const { fullName, email } = this.tokenStorage.getUser();
    this.email = email;
    this.username = fullName;
  }
}
