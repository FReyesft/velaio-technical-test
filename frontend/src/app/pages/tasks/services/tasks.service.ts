import { Injectable } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _tasks: Task[] = [];
  constructor() { }

  public get tasks() {
    return this._tasks;
  }

  public addTask(value: Task) {
    this._tasks.push(value);
  }
}
