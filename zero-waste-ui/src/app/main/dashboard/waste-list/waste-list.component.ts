import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ListType } from '../types';

@Component({
  selector: 'app-waste-list',
  templateUrl: './waste-list.component.html',
  styleUrls: ['./waste-list.component.css'],
})
export class WasteListComponent {
  constructor() {}

  @Output() selectedBin = new EventEmitter();

  data: ListType[];
  show2ndComponent = false;

  binSelected(x?: ListType) {
    this.selectedBin.emit(x ?? { key: 'test' });
  }
}
