import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fcfs-input-form',
  templateUrl: './fcfs-input-form.component.html',
  styleUrls: ['./fcfs-input-form.component.scss']
})
export class FcfsInputFormComponent implements OnInit {
  processes: { name: string; burstTime: number; arrivalTime: number }[] = [
    {
      name: 'P1',
      arrivalTime: 0,
      burstTime: 1
    }
  ];
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

  fcfs() {
    this.router.navigate(['fcfs'], {
      queryParams: {
        processes: JSON.stringify(this.processes)
      }
    });
  }
}
