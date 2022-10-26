import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { ListType } from './types';

@Component({
  selector: 'app-waste-list',
  templateUrl: './waste-list.component.html',
  styleUrls: ['./waste-list.component.css']
})
export class WasteListComponent implements OnInit {

  constructor() { }
  
  @Output() selectedBin = new EventEmitter();

  ngOnInit(): void {
    console.log("Hii iam first!!!");
    this.initUI();
  }

  ngAfterContentInit(){
    console.log("hi iam second!!!");
  }

  data: ListType[];
  show2ndComponent=false;

  abc(){
    this.show2ndComponent=!this.show2ndComponent;
  }

  initUI(){
    this.data=[{
      key:"sarvesh",
    },{
      key:"soni",
      value:89
    }]
  }

  binSelected(x:ListType){
    this.selectedBin.emit(x);
  }

}
