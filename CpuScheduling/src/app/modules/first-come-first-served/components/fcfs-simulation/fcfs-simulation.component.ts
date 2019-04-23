import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fcfs-simulation',
  templateUrl: './fcfs-simulation.component.html',
  styleUrls: ['./fcfs-simulation.component.scss']
})
export class FcfsSimulationComponent implements OnInit {
  processes: {
    name: string;
    burstTime: number;
    arrivalTime: number;
    waitingTime: number;
    turnAroundTime: number;
  }[];
  processesCopy: {
    name: string;
    burstTime: number;
    arrivalTime: number;
    waitingTime: number;
    turnAroundTime: number;
  }[];
  gantt: { name: string; burst: number }[] = [];
  averageTurnaroundTime: number;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.processes = params['processes']
        ? JSON.parse(params['processes']).map(
            (p: { name: string; burstTime: number; arrivalTime: number }) => ({
              ...p,
              waitingTime: 0,
              turnAroundTime: 0
            })
          )
        : [];

      setTimeout(() => {
        this.processes = this.processes.sort((process1, process2) => {
          if (process1.arrivalTime > process2.arrivalTime) {
            return 1;
          }

          if (process1.arrivalTime < process2.arrivalTime) {
            return -1;
          }

          return 0;
        });
        this.processesCopy = this.processes.map(process => ({ ...process }));
        for (let i = 0; i < this.processes.length; i++) {
          for (let j = 0; j < i; j++) {
            this.processes[i].waitingTime += this.processes[j].burstTime;
          }
          this.processes[i].waitingTime -= this.processes[i].arrivalTime;
          this.processes[i].turnAroundTime =
            this.processes[i].waitingTime + this.processes[i].burstTime;
          this.gantt.push({
            name: this.processes[i].name,
            burst: this.processes[i].burstTime
          });
        }
        // Fix gantt diagram
        for (let j = 0; j < this.gantt.length; j++) {
          if (j === 0) {
            continue;
          }
          this.gantt[j].burst += this.gantt[j - 1].burst;
        }
        this.averageTurnaroundTime =
          this.processes
            .map(p => p.turnAroundTime)
            .reduce((v1, v2) => v1 + v2) / this.processes.length;
      }, 100);
    });
  }

  ngOnInit(): void {}
}
