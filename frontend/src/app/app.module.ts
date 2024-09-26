import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { AppNavbarComponent } from './shared/app-navbar/app-navbar.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MuiModule } from './modules/mui/mui.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AppNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MuiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
