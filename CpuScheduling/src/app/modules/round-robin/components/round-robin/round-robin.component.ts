import { Component, OnInit } from '@angular/core';
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
    color: string;
  }[];
  loading = true;
  gantt: { name: string; end: number; color: string; width: number }[] = [];
  averageTurnaroundTime: number;
  averageWaitingTime: number;
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
        this.processesCopy = this.processes.map(process => ({ ...process }));
        this.rr();
      }, 100);
    });
  }

  ngOnInit() {}

  rr(): void {
    let i: number;
    let j = 0;
    this.processes = this.processesCopy.map(process => ({ ...process }));
    this.gantt = [];
    this.loading = true;
    setTimeout(() => {
      while (this.processes.some(process => !!process.burstTime)) {
        const readyProcesses = this.processes.filter(p => !p.arrivalTime);
        i = j % readyProcesses.length;
        const currentProcess = this.processes.find(
          p => p.name === readyProcesses[i].name
        );
        if (!currentProcess.burstTime) {
          j++;
          continue;
        }
        let burst = this.quantum;
        burst =
          burst < currentProcess.burstTime ? burst : currentProcess.burstTime;
        this.gantt.push({
          name: currentProcess.name,
          end:
            currentProcess.burstTime > burst ? burst : currentProcess.burstTime,
          color: currentProcess.color,
          width: 0
        });
        currentProcess.turnAroundTime +=
          currentProcess.burstTime > burst ? burst : currentProcess.burstTime;
        currentProcess.burstTime =
          currentProcess.burstTime > burst
            ? currentProcess.burstTime - burst
            : 0;
        for (const process of this.processes) {
          if (process.arrivalTime) {
            if (process.arrivalTime > burst) {
              process.arrivalTime -= burst;
            } else {
              process.waitingTime += burst - process.arrivalTime;
              process.arrivalTime = 0;
            }
          } else if (
            process.name !== currentProcess.name &&
            process.burstTime
          ) {
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
      this.averageWaitingTime =
        this.processes.map(p => p.waitingTime).reduce((v1, v2) => v1 + v2) /
        this.processes.length;
      const burstSum = this.gantt.map(g => g.end).reduce((v1, v2) => v1 + v2);
      for (const g of this.gantt) {
        g.width = (g.end / burstSum) * 100;
      }
      // Fix gantt diagram
      for (j = 1; j < this.gantt.length; j++) {
        this.gantt[j].end += this.gantt[j - 1].end;
      }
      this.loading = false;
    }, 100);
  }

  updateColors(colors: any) {
    for (const process of this.processes) {
      process.color = colors[process.name];
    }
  }
}
