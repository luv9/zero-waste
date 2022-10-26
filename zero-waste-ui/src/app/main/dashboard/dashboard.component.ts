import { Component, OnInit } from '@angular/core';
import { ListType } from './waste-list/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  selectedBin:ListType;

  ngOnInit(): void {
  }

  changeBin(x:ListType){
    console.log (x.key);
    this.displayBinDetails(x);
  }

  displayBinDetails(x:ListType){
    this.selectedBin=x;
  }

}
