import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjfInputFormComponent } from './components/forms/sjf-input-form/sjf-input-form.component';
import { SjfSimulationComponent } from './components/sjf-simulation/sjf-simulation.component';
import { MatButtonModule, MatIconModule, MatTooltipModule, MatInputModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SjfInputFormComponent, SjfSimulationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    MatCardModule
  ]
})
export class ShortestJobFirstModule { }
