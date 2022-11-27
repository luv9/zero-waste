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
export class WasteListComponent implements OnChanges {
  constructor(private authService: AuthService) {}

  @Output() selectedBin = new EventEmitter();

  @Input() binCollection: BinType[] = [];
  data: ListType[];
  form: any = {
    binName: null,
    productId: null,
  };
  getNewBinDetails = false;
  selectedBinDetails: BinType;
  addNewBinBtnDisabled = false;

  ngOnChanges() {
    this.selectedBinDetails = this.binCollection[0];
  }

  closeAddBinMenu() {
    this.getNewBinDetails = false;
  }

  addNewBin() {
    this.getNewBinDetails = true;
  }

  binSelected(bin: BinType) {
    this.selectedBinDetails = bin;
    this.selectedBin.emit(bin);
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

  getAllBins() {
    this.authService.getAllBins().subscribe(
      (data: any) => {
        console.log(data);
        this.binCollection = data;
        this.selectedBinDetails = this.binCollection[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
