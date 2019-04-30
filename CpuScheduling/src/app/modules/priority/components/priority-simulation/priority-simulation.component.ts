import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-priority-simulation',
  templateUrl: './priority-simulation.component.html',
  styleUrls: ['./priority-simulation.component.scss']
})
export class PrioritySimulationComponent implements OnInit {
  processes: {
    name: string;
    burstTime: number;
    arrivalTime: number;
    waitingTime: number;
    turnAroundTime: number;
    color: string;
    priority: number;
  }[];
  processesCopy: {
    name: string;
    burstTime: number;
    arrivalTime: number;
    waitingTime: number;
    turnAroundTime: number;
    priority: number;
  }[];
  gantt: { name: string; end: number; color: string; width: number }[] = [];
  averageTurnaroundTime: number;
  averageWaitingTime: number;
  loading = true;
  preemptive = false;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.preemptive = params['preemptive'] === 'true';
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
      this.processes = this.processes.sort(function(a, b) {
        const at1 = a.arrivalTime;
        const at2 = b.arrivalTime;
        const p1 = a.priority;
        const p2 = b.priority;

        if (at1 === at2) {
          return p1 < p2 ? -1 : p1 > p2 ? 1 : 0;
        } else {
          return at1 < at2 ? -1 : 1;
        }
      });
      this.processesCopy = this.processes.map(process => ({ ...process }));

      let i = 0;
      if (this.preemptive) {
        while (this.processes.some(process => !!process.burstTime)) {
          const maxPriority = Math.max(
            ...this.processes
              .filter(p => !p.arrivalTime && p.burstTime)
              .map(p => p.priority)
          );
          const currentProcess = this.processes.find(
            p => p.priority === maxPriority && !!p.burstTime
          );
          let burst = this.getBurst();
          burst = burst !== -1 ? burst : currentProcess.burstTime;
          this.gantt.push({
            name: currentProcess.name,
            end:
              currentProcess.burstTime > burst
                ? burst
                : currentProcess.burstTime,
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
        i = 0;
        for (const process of this.processes) {
          process.burstTime = this.processesCopy[i].burstTime;
          process.arrivalTime = this.processesCopy[i].arrivalTime;
          process.turnAroundTime += process.waitingTime;
          i++;
        }
      } else {
        for (i = 0; i < this.processes.length; i++) {
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

  getBurst(): number {
    if (this.processes.some(process => !!process.arrivalTime)) {
      const filteredProcesses = this.processes.filter(pc => pc.arrivalTime);
      return filteredProcesses[0].arrivalTime;
    } else {
      return -1;
    }
  }
}
