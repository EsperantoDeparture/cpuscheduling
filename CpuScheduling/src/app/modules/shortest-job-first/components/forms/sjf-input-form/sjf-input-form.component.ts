import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sjf-input-form',
  templateUrl: './sjf-input-form.component.html',
  styleUrls: ['./sjf-input-form.component.scss']
})
export class SjfInputFormComponent implements OnInit {
  processes: { name: string; burstTime: number; arrivalTime: number }[] = [
    {
      name: 'P1',
      arrivalTime: 0,
      burstTime: 1
    }
  ];
  preemptive = true;
  constructor(private router: Router) {}

  ngOnInit() {}

  add() {
    this.processes.push({
      name: `P${this.processes.length + 1}`,
      arrivalTime: 0,
      burstTime: 1
    });
  }

  remove(i: number) {
    this.processes.splice(i, 1);
  }

  sjf() {
    this.router.navigate(['sjf'], {
      queryParams: {
        processes: JSON.stringify(this.processes),
        preemptive: this.preemptive
      }
    });
  }
}
