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

  selectedBinId: string;
  getNewBinDetails = false;
  addNewBinBtnDisabled = false;
  binCollection: BinType[] = [];

  form: any = {
    binName: null,
    productId: null,
  };

  ngOnInit(): void {
    this.getAllBins();
  }

  getAllBins() {
    this.authService.getAllBins().subscribe(
      (data: any) => {
        console.log(data);
        this.binCollection = data;
        this.selectedBinId = this.binCollection[0]._id;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeBin(id: any) {
    this.displayBinDetails(id);
  }

  displayBinDetails(id: string) {
    this.selectedBinId = id;
  }

  addNewBin() {
    this.getNewBinDetails = true;
  }

  onSubmit() {
    const { binName, productId } = this.form;
    this.authService.addNewBin(binName, productId).subscribe(
      (data) => {
        console.log(data);
        this.getNewBinDetails = false;
        this.getAllBins();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
