import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-priority-input-form',
  templateUrl: './priority-input-form.component.html',
  styleUrls: ['./priority-input-form.component.scss']
})
export class PriorityInputFormComponent implements OnInit {
  processes: { name: string; burstTime: number; arrivalTime: number; priority: number }[] = [
    {
      name: 'P1',
      arrivalTime: 0,
      burstTime: 1,
      priority: 1
    }
  ];
  preemtive = false;
  constructor(private router: Router) {}

  ngOnInit() {}

  add() {
    this.processes.push({
      name: `P${this.processes.length + 1}`,
      arrivalTime: 0,
      burstTime: 1,
      priority: 1
    });
  }

  remove(i: number) {
    this.processes.splice(i, 1);
  }

  priority() {
    this.router.navigate(['priority'], {
      queryParams: {
        processes: JSON.stringify(this.processes),
        preemtive: this.preemtive
      }
    });
  }
}
