import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FcfsSimulationComponent } from './components/fcfs-simulation/fcfs-simulation.component';
import { FcfsInputFormComponent } from './components/forms/fcfs-input-form/fcfs-input-form.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { GanttModule } from '../utils/gantt/gantt.module';

@NgModule({
  declarations: [FcfsSimulationComponent, FcfsInputFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    GanttModule,
    MatProgressSpinnerModule
  ]
})
export class FirstComeFirstServedModule {}
