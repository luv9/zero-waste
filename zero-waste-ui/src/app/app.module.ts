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
import { APP_BASE_HREF } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from './main/home/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    WasteListComponent,
    WasteDetailsComponent,
    ProfileComponent,
    AlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    NgxChartsModule,
    HttpClientModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: 'ui' }],
  bootstrap: [AppComponent],
  entryComponents: [AlertDialogComponent],
})
export class AppModule {}
