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
      'https://angular-todo-a8f53-default-rtdb.firebaseio.com/task.json'
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(
      `https://angular-todo-a8f53-default-rtdb.firebaseio.com/task/${id}.json`
    );
  }

  getTop5Tasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(
        'https://angular-todo-a8f53-default-rtdb.firebaseio.com/task.json?limit=5'
      )
      .pipe(
        map((tasks) => {
          return (
            tasks &&
            Object.entries(tasks)
              .slice(0, 5)
              .map((task) => ({ ...task[1], id: task[0] }))
          );
        })
      );
  }

  addTodo(task: Task): Observable<Object> {
    const promise = this.http.post(
      'https://angular-todo-a8f53-default-rtdb.firebaseio.com/task.json',
      task
    );

    return from(promise);
  }

  editTask(id: string, task: Task): Observable<Object> {
    const promise = this.http.put(
      `https://angular-todo-a8f53-default-rtdb.firebaseio.com/task/${id}.json`,
      task
    );

    return from(promise);
  }

  removeTask(id: string): Observable<Object> {
    const promise = this.http.delete(
      `https://angular-todo-a8f53-default-rtdb.firebaseio.com/task/${id}.json`
    );

    return from(promise);
  }
}
