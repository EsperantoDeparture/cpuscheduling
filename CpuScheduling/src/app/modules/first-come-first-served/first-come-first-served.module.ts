import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FcfsSimulationComponent } from './components/fcfs-simulation/fcfs-simulation.component';
import { FcfsInputFormComponent } from './components/forms/fcfs-input-form/fcfs-input-form.component';

@NgModule({
  declarations: [FcfsSimulationComponent, FcfsInputFormComponent],
  imports: [
    CommonModule
  ]
})
export class FirstComeFirstServedModule { }
