import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FcfsSimulationComponent } from './components/fcfs-simulation/fcfs-simulation.component';
import { FcfsInputFormComponent } from './components/forms/fcfs-input-form/fcfs-input-form.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FcfsSimulationComponent, FcfsInputFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule
  ]
})
export class FirstComeFirstServedModule {}
