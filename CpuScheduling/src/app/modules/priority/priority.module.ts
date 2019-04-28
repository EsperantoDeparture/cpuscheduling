import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriorityInputFormComponent } from './components/forms/priority-input-form/priority-input-form.component';
import { PrioritySimulationComponent } from './components/priority-simulation/priority-simulation.component';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { GanttModule } from '../utils/gantt/gantt.module';

@NgModule({
  declarations: [PriorityInputFormComponent, PrioritySimulationComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    GanttModule,
    MatProgressSpinnerModule
  ]
})
export class PriorityModule {}
