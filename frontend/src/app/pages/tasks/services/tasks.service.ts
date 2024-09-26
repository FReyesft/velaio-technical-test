import { Injectable } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _tasks: Task[] = [];
  constructor() { }

  public getTasks() {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks'));
    return tasks;
  }

  public addTask(value: Task) {
    this._tasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
  }
}
