import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rr-input-form',
  templateUrl: './rr-input-form.component.html',
  styleUrls: ['./rr-input-form.component.scss']
})
export class RrInputFormComponent implements OnInit {
  processes: { name: string; burstTime: number; arrivalTime: number }[] = [
    {
      name: 'P1',
      arrivalTime: 0,
      burstTime: 1
    }
  ];
  quantum = 1;

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

  rr() {
    this.router.navigate(['round-robin'], {
      queryParams: {
        processes: JSON.stringify(this.processes),
        quantum: this.quantum
      }
    });
  }
}
