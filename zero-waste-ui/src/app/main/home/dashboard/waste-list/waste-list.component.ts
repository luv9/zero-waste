import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { BinType, ListType } from '../types';

@Component({
  selector: 'app-waste-list',
  templateUrl: './waste-list.component.html',
  styleUrls: ['./waste-list.component.css'],
})
export class WasteListComponent {
  constructor() {}

  @Output() selectedBinId = new EventEmitter();

  @Input() binCollection: BinType[] = [];
  data: ListType[];
  show2ndComponent = false;

  binSelected(id: string) {
    this.selectedBinId.emit(id);
  }
}
