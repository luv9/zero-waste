import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-waste-details',
  templateUrl: './waste-details.component.html',
  styleUrls: ['./waste-details.component.css'],
})
export class WasteDetailsComponent implements OnInit {
  constructor(private authService: AuthService) {}
  @Input() selectedBinId: string;
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
  wasteCollection: { date: string; totalWeight: number }[] = [];

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
    if (this.selectedBinId) this.getWasteDetailsByBinId(this.selectedBinId);
    this.showChart = true;
  }

  getWasteDetailsByBinId(binId: string) {
    this.authService
      .getWasteDetailsByBinId(
        binId,
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
        },
        (err) => {
          console.log(err);
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

    for (let i = 0; i < 31; i++) {
      const curDate = new Date(
        new Date().setDate(new Date().getDate() - i)
      ).toDateString();
      const waste = this.wasteCollection.find(
        (waste) => waste.date === curDate
      );
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
