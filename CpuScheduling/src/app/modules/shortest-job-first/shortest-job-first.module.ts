import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjfInputFormComponent } from './components/forms/sjf-input-form/sjf-input-form.component';
import { SjfSimulationComponent } from './components/sjf-simulation/sjf-simulation.component';
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { GanttModule } from '../utils/gantt/gantt.module';

@NgModule({
  declarations: [SjfInputFormComponent, SjfSimulationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    GanttModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ]
})
export class ShortestJobFirstModule {}
