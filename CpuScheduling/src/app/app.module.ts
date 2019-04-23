import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { AppComponent } from './components/home/app.component';
import { AlgorithmSelectionComponent } from './components/algorithm-selection/algorithm-selection.component';
import { ShortestJobFirstModule } from './modules/shortest-job-first/shortest-job-first.module';
import {
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconRegistry
} from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, AlgorithmSelectionComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShortestJobFirstModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (const icon of [
      'add',
      'close',
      'exit_to_app',
      'home',
      'more_horiz',
      'navigate_before',
      'navigate_next',
      'remove',
      'edit',
      'check',
      'help'
    ]) {
      iconRegistry.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/${icon}.svg`)
      );
    }
  }
}
