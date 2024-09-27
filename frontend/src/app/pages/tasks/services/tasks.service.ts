import { Injectable } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() { }

  public getTasks() {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks'));
    return tasks;
  }

  public addTask(value: Task) {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
