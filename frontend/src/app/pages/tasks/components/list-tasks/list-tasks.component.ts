import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];
  public filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(
    private tasksService: TasksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();
    this.filteredTasks = this.tasks;
  }

  toggleTaskCompletion(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.addFilter();
  }

  addFilter() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { status: this.filter },
      queryParamsHandling: 'merge',
    });
    if (this.filter === 'all') {
      this.filteredTasks = this.tasks;
    } else if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(
        (task) => task.isCompleted === true
      );
    } else if (this.filter === 'pending') {
      this.filteredTasks = this.tasks.filter(
        (task) => task.isCompleted === false
      );
    }
  }
}
