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
    this.binCollection = [
      {
        _id: '63810b888401fd2ef5212381',
        name: 'Laundry Bin',
        status: 'Fillable',
      },
      {
        _id: '63810c128401fd2ef5212386',
        name: 'Outdoor Bin',
        status: 'Fillable',
      },
      {
        _id: '63810c748401fd2ef521238f',
        name: 'Lobby Bin',
        status: 'Full',
      },
    ];
    this.selectedBin = this.binCollection[0];
    return;
    this.authService.getAllBins().subscribe(
      (data: any) => {
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
