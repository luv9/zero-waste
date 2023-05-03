import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    alert(
      'Majority of this App features will not work on Netlify because of missing back-end apis. The data shown is for demo purpose only !'
    );
  }
}
