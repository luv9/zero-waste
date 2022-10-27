import { Component, Input, OnInit } from '@angular/core';
import { ListType } from '../types';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-waste-details',
  templateUrl: './waste-details.component.html',
  styleUrls: ['./waste-details.component.css'],
})
export class WasteDetailsComponent implements OnInit {
  constructor() {}
  @Input() selectedBin: ListType;
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

  radioItems: Array<{ key: string; value: string }>;
  model = { option: 'past_10' };

  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.radioItems = [
      { value: 'Past 10 Days', key: 'past_10' },
      { value: 'Past 30 Days', key: 'past_30' },
    ];
    this.generateRandomData();
    this.showChart = true;
  }

  rangeSelected(radiobutton: { key: string; value: string }) {
    this.model.option = radiobutton.key;
    this.filterData(radiobutton.key);
  }

  filterData(range: string) {
    this.model.option = range;
    this.single = this.allData;
    this.single = this.single.slice(0, range == 'past_10' ? 9 : 30);
  }

  generateRandomData() {
    const data = [];
    for (let i = 0; i < 31; i++) {
      data.push({
        name: `${new Date(
          new Date().setDate(new Date().getDate() - i)
        ).toDateString()}`,
        value: Math.floor(Math.random() * 25),
      });
    }
    this.allData = data;
    this.filterData('past_10');
  }

  onSelect(event: any) {
    console.log(event);
  }
}
