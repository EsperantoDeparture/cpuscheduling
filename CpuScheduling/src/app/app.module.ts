import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { AppComponent } from './components/home/app.component';
import { AlgorithmSelectionComponent } from './components/algorithm-selection/algorithm-selection.component';
import { ShortestJobFirstModule } from './modules/shortest-job-first/shortest-job-first.module';
import { MatCardModule, MatGridListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AlgorithmSelectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShortestJobFirstModule,
    MatCardModule,
    MatGridListModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
