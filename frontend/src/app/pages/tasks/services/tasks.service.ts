import { Injectable } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() { }

  public getTasks(): Task[] {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks.map(task => ({
      ...task,
      taskLimitDate: new Date(task.taskLimitDate),
    }));
  }

  public addTask(value: Task) {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public updateTask(id: number, isCompleted: boolean) {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex].isCompleted = isCompleted;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
}
