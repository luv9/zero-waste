import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WasteDetailsComponent } from './main/home/dashboard/waste-details/waste-details.component';
import { WasteListComponent } from './main/home/dashboard/waste-list/waste-list.component';
import { DashboardComponent } from './main/home/dashboard/dashboard.component';
import { HomeComponent } from './main/home/home.component';
import { ProfileComponent } from './main/home/profile/profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    WasteListComponent,
    WasteDetailsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
