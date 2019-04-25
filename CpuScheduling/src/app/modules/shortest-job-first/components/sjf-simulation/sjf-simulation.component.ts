import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as distinctColors from 'distinct-colors';

@Component({
  selector: 'app-sjf-simulation',
  templateUrl: './sjf-simulation.component.html',
  styleUrls: ['./sjf-simulation.component.scss']
})
export class SjfSimulationComponent implements OnInit {
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
  gantt: { name: string; burst: number; color: string }[] = [];
  averageTurnaroundTime: number;
  averageWaitingTime: number;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.processes = params['processes']
        ? JSON.parse(params['processes']).map(
            (p: { name: string; burstTime: number; arrivalTime: number }) => ({
              ...p,
              waitingTime: 0,
              turnAroundTime: 0,
              color: ''
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
        const palette = distinctColors({
          count: this.processes.length,
          lightMin: 30
        });
        for (let i = 0; i < this.processes.length; i++) {
          this.processes[i].color = `rgb(${palette[i]._rgb[0]},${
            palette[i]._rgb[1]
          },${palette[i]._rgb[2]})`;
        }
        this.processesCopy = this.processes.map(process => ({ ...process }));
        this.sjf();
      }, 100);
    });
  }

  ngOnInit() {}

  sjf(): void {
    while (this.processes.some(process => !!process.burstTime)) {
      const minimumBurstTime = Math.min(
        ...this.processes
          .filter(p => !p.arrivalTime && p.burstTime)
          .map(p => p.burstTime)
      );
      const currentProcess = this.processes.find(
        p => p.burstTime === minimumBurstTime
      );
      let burst = this.getBurst();
      burst = burst !== -1 ? burst : currentProcess.burstTime;
      this.gantt.push({
        name: currentProcess.name,
        burst:
          currentProcess.burstTime > burst ? burst : currentProcess.burstTime,
        color: currentProcess.color
      });
      currentProcess.turnAroundTime +=
        currentProcess.burstTime > burst ? burst : currentProcess.burstTime;
      currentProcess.burstTime =
        currentProcess.burstTime > burst ? currentProcess.burstTime - burst : 0;
      for (const process of this.processes) {
        if (process.arrivalTime) {
          process.arrivalTime -= burst;
        } else if (
          !process.arrivalTime &&
          process.name !== currentProcess.name &&
          process.burstTime
        ) {
          process.waitingTime += burst;
        }
      }
    }
    let i = 0;
    for (const process of this.processes) {
      process.burstTime = this.processesCopy[i].burstTime;
      process.arrivalTime = this.processesCopy[i].arrivalTime;
      process.turnAroundTime += process.waitingTime;
      console.log(process.name, process.waitingTime, process.turnAroundTime);
      i++;
    }
    this.averageTurnaroundTime =
      this.processes.map(p => p.turnAroundTime).reduce((v1, v2) => v1 + v2) /
      this.processes.length;
    this.averageWaitingTime =
      this.processes.map(p => p.waitingTime).reduce((v1, v2) => v1 + v2) /
      this.processes.length;
    // Fix gantt diagram
    for (let j = 1; j < this.gantt.length; j++) {
      this.gantt[j].burst += this.gantt[j - 1].burst;
    }
  }

  getBurst(): number {
    if (this.processes.some(process => !!process.arrivalTime)) {
      const filteredProcesses = this.processes.filter(pc => pc.arrivalTime);
      return filteredProcesses[0].arrivalTime;
    } else {
      return -1;
    }
  }
}
