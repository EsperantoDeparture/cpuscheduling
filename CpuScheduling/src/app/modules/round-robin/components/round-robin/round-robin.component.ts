import { Component, OnInit } from '@angular/core';
import * as distinctColors from 'distinct-colors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-round-robin',
  templateUrl: './round-robin.component.html',
  styleUrls: ['./round-robin.component.scss']
})
export class RoundRobinComponent implements OnInit {
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
  quantum: number;
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
      this.quantum = parseFloat(params['quantum']);

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
        this.rr();
      }, 100);
    });
  }

  ngOnInit() {}

  rr(): void {
    let i: number;
    let j = 0;
    while (this.processes.some(process => !!process.burstTime) && j < 20) {
      const readyProcesses = this.processes.filter(p => !p.arrivalTime);
      i = j % readyProcesses.length;
      console.log(i, j, readyProcesses.length, this.quantum);
      const currentProcess = this.processes.find(
        p => p.name === readyProcesses[i].name
      );
      console.log(readyProcesses[i].name);
      let burst = this.quantum;
      burst =
        burst < currentProcess.burstTime ? burst : currentProcess.burstTime;
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
          if (process.arrivalTime > burst) {
            process.arrivalTime -= burst;
          } else {
            process.waitingTime += burst - process.arrivalTime;
            process.arrivalTime = 0;
          }
        } else if (process.name !== currentProcess.name && process.burstTime) {
          process.waitingTime += burst;
        }
      }
      j++;
    }
    i = 0;
    for (const process of this.processes) {
      process.burstTime = this.processesCopy[i].burstTime;
      process.arrivalTime = this.processesCopy[i].arrivalTime;
      process.turnAroundTime += process.waitingTime;
      i++;
    }
    this.averageTurnaroundTime =
      this.processes.map(p => p.turnAroundTime).reduce((v1, v2) => v1 + v2) /
      this.processes.length;
    // Fix gantt diagram
    for (j = 1; j < this.gantt.length; j++) {
      this.gantt[j].burst += this.gantt[j - 1].burst;
    }
  }
}
