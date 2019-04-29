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
    color: string;
  }[];
  processesCopy: {
    name: string;
    burstTime: number;
    arrivalTime: number;
    waitingTime: number;
    turnAroundTime: number;
  }[];
  gantt: { name: string; end: number; color: string; width: number }[] = [];
  averageTurnaroundTime: number;
  averageWaitingTime: number;
  loading = true;
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
    });
  }

  ngOnInit(): void {
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
          end: this.processes[i].burstTime,
          color: this.processes[i].color,
          width: 0
        });
      }
      // Fix gantt diagram
      for (let j = 0; j < this.gantt.length; j++) {
        if (j === 0) {
          continue;
        }
        this.gantt[j].end += this.gantt[j - 1].end;
      }
      this.averageTurnaroundTime =
        this.processes.map(p => p.turnAroundTime).reduce((v1, v2) => v1 + v2) /
        this.processes.length;
      this.averageWaitingTime =
        this.processes.map(p => p.waitingTime).reduce((v1, v2) => v1 + v2) /
        this.processes.length;
      this.loading = false;
    }, 100);
  }

  updateColors(colors: any) {
    for (const process of this.processes) {
      process.color = colors[process.name];
    }
  }
}
