import { Component, Input, OnInit } from '@angular/core';
import { ListType } from '../types';

@Component({
  selector: 'app-waste-details',
  templateUrl: './waste-details.component.html',
  styleUrls: ['./waste-details.component.css']
})
export class WasteDetailsComponent implements OnInit {

  constructor() { }
 @Input()  selectedBin:ListType;

  ngOnChanges(){
    console.log("i am ONNNNNNNNN !!!!!!");
  }
  ngOnInit(): void {
    console.log("sdfgh");
  }

}
