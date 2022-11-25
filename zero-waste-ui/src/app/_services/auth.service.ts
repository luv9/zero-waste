import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API_USER = '/user/';
const AUTH_API_BIN = '/bin/';
const AUTH_API_WASTE = '/dashboard/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  getWasteDetailsByBinId(binId: string, fromDate: Date, toDate: Date) {
    return this.http.post(
      AUTH_API_WASTE,
      {
        binId,
        fromDate,
        toDate,
      },
      httpOptions
    );
  }

  getAllBins() {
    return this.http.post(
      AUTH_API_BIN,
      {
        userId: this.tokenStorage.getToken(),
      },
      httpOptions
    );
  }

  addNewBin(name: string, productId: string) {
    return this.http.post(
      AUTH_API_BIN + 'save',
      {
        name,
        pid: productId,
        userId: this.tokenStorage.getToken(),
      },
      { responseType: 'text' }
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API_USER + 'login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API_USER + 'signup',
      {
        name: username,
        email,
        password,
      },
      { responseType: 'text' }
    );
  }

  isLoggedIn() {
    return this.http.post(AUTH_API_USER + 'loggedInOrNot', httpOptions);
  }
}
