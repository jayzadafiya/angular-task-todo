import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { MatTableModule } from '@angular/material/table';
import { Task } from './task.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TastAddComponent } from './tast-add/tast-add.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule, TastAddComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private taskService: TaskService) {}

  displayedColumns: string[] = [
    'title',
    'description',
    'status',
    'edit',
    'remove',
  ];

  task!: Task[];

  ngOnInit(): void {
    const fetchSubscription = this.taskService
      .fetchTasks()
      .subscribe((data) => {
        if (data) {
          this.task = Object.entries(data).map((task) => ({
            ...task[1],
            id: task[0],
          }));
        }
      });
    this.subscriptions.push(fetchSubscription);
  }

  removeTask(id: string) {
    const removeSubscription = this.taskService.removeTask(id).subscribe(() => {
      this.task = this.task.filter((task) => task.id !== id);
    });
    this.subscriptions.push(removeSubscription);
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  }
}
