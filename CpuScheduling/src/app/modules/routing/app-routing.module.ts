import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlgorithmSelectionComponent } from 'src/app/components/algorithm-selection/algorithm-selection.component';
import { SjfInputFormComponent } from '../shortest-job-first/components/forms/sjf-input-form/sjf-input-form.component';
import { SjfSimulationComponent } from '../shortest-job-first/components/sjf-simulation/sjf-simulation.component';
import { FcfsInputFormComponent } from '../first-come-first-served/components/forms/fcfs-input-form/fcfs-input-form.component';
import { FcfsSimulationComponent } from '../first-come-first-served/components/fcfs-simulation/fcfs-simulation.component';
import { RoundRobinComponent } from '../round-robin/components/round-robin/round-robin.component';
import { RrInputFormComponent } from '../round-robin/components/forms/rr-input-form/rr-input-form.component';
import { PriorityInputFormComponent } from '../priority/components/forms/priority-input-form/priority-input-form.component';
import { PrioritySimulationComponent } from '../priority/components/priority-simulation/priority-simulation.component';

const routes: Routes = [
  {
    path: '',
    component: AlgorithmSelectionComponent
  },
  {
    path: 'sjf-input-form',
    component: SjfInputFormComponent
  },
  {
    path: 'sjf',
    component: SjfSimulationComponent
  },
  {
    path: 'fcfs-input-form',
    component: FcfsInputFormComponent
  },
  {
    path: 'fcfs',
    component: FcfsSimulationComponent
  },
  {
    path: 'round-robin',
    component: RoundRobinComponent
  },
  {
    path: 'rr-input-form',
    component: RrInputFormComponent
  },
  {
    path: 'priority-input-form',
    component: PriorityInputFormComponent
  },
  {
    path: 'priority',
    component: PrioritySimulationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
