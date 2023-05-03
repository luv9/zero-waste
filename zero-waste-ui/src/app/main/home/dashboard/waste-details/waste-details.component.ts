import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthService } from 'src/app/_services/auth.service';
import { BinType } from '../types';
import data from './sampleData';

@Component({
  selector: 'app-waste-details',
  templateUrl: './waste-details.component.html',
  styleUrls: ['./waste-details.component.css'],
})
export class WasteDetailsComponent implements OnInit {
  constructor(private authService: AuthService) {}
  @Input() selectedBin: BinType;
  view = [700, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  allData: {}[] = [];
  single: {}[] = [];
  showChart = false;
  gradient = false;
  showXAxis = false;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Weight in KG';
  wasteCollection: { _id?: string; date: string; totalWeight: number }[] = [];
  sampleCollection = data;
  isDataFetching = false;
  radioItems: Array<{ key: string; value: string }>;
  model = { option: 'past_10' };
  dimensions: [number, number] = [0, 0];
  innerWidth: any;
  innerHeight: any;
  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.dimensions = [this.innerWidth / 2, this.innerHeight / 2];
    this.radioItems = [
      { value: 'Past 10 Days', key: 'past_10' },
      { value: 'Past 30 Days', key: 'past_30' },
    ];
    if (this.selectedBin) this.getWasteDetailsByBinId(this.selectedBin);
    this.showChart = true;
  }

  getWasteDetailsByBinId(bin: BinType) {
    this.isDataFetching = true;
    this.wasteCollection = [...this.sampleCollection];
    this.wasteCollection.forEach(
      (waste) => (waste.date = new Date(waste.date).toDateString())
    );
    this.generateData();
    this.isDataFetching = false;
    return;
    this.authService
      .getWasteDetailsByBinId(
        bin._id,
        new Date(new Date().setDate(new Date().getDate() - 31)),
        new Date()
      )
      .subscribe(
        (data: any) => {
          this.wasteCollection = data;
          this.wasteCollection.forEach(
            (waste) => (waste.date = new Date(waste.date).toDateString())
          );
          this.generateData();
          this.isDataFetching = false;
        },
        (err) => {
          console.log(err);
          this.isDataFetching = false;
        }
      );
  }

  rangeSelected(radiobutton: { key: string; value: string }) {
    this.model.option = radiobutton.key;
    this.filterData(radiobutton.key);
  }

  filterData(range: string) {
    this.model.option = range;
    this.single = this.allData;
    this.single = this.single.slice(0, range == 'past_10' ? 10 : 31);
  }

  generateData() {
    const data: { name: string; value: number }[] = [];
    this.wasteCollection = [...this.sampleCollection];
    for (let i = 0; i < 31; i++) {
      const curDate = new Date(
        new Date().setDate(new Date().getDate() - i)
      ).toDateString();
      const waste = this.wasteCollection.find((waste) => waste.date);
      this.wasteCollection.shift();
      data.push({
        name: `${new Date(
          new Date().setDate(new Date().getDate() - i)
        ).toDateString()}`,
        value: waste ? waste.totalWeight : -0,
      });
    }
    this.allData = data;
    this.filterData('past_10');
  }

  onSelect(event: any) {
    console.log(event);
  }
}
