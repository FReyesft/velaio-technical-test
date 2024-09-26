import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { CreateTasksComponent } from './components/create-tasks/create-tasks.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';

@NgModule({
  declarations: [
    CreateTasksComponent,
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
