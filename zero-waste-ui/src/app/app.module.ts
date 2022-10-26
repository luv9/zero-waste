import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { WasteListComponent } from './main/dashboard/waste-list/waste-list.component';
import { WasteDetailsComponent } from './main/dashboard/waste-details/waste-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WasteListComponent,
    WasteDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
