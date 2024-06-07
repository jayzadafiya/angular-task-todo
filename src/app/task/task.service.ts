import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable, from, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  fetchTasks() {
    return this.http.get<Task[]>(
      'https://angular-todo-93da9-default-rtdb.firebaseio.com/task.json'
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(
      `https://angular-todo-93da9-default-rtdb.firebaseio.com/task/${id}.json`
    );
  }

  getTop5Tasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(
        'https://angular-todo-93da9-default-rtdb.firebaseio.com/task.json?limit=5'
      )
      .pipe(
        map((tasks) => {
          return Object.entries(tasks)
            .slice(0, 5)
            .map((task) => ({ ...task[1], id: task[0] }));
        })
      );
  }

  addTodo(task: Task): Observable<Object> {
    const promise = this.http.post(
      'https://angular-todo-93da9-default-rtdb.firebaseio.com/task.json',
      task
    );

    return from(promise);
  }
}
