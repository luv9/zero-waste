import { Component, OnInit } from '@angular/core';
import { BinType, ListType } from './types';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  selectedBin: BinType;
  getNewBinDetails = false;
  addNewBinBtnDisabled = false;
  binCollection: BinType[] = [];

  ngOnInit(): void {
    this.getAllBins();
  }

  getAllBins() {
    this.authService.getAllBins().subscribe(
      (data: any) => {
        console.log(data);
        this.binCollection = data;
        this.selectedBin = this.binCollection[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeBin(bin: any) {
    this.displayBinDetails(bin);
  }

  displayBinDetails(bin: BinType) {
    this.selectedBin = bin;
  }

  addNewBin() {
    this.getNewBinDetails = true;
  }
}
