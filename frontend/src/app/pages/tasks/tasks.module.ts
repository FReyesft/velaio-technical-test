import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { CreateTasksComponent } from './components/create-tasks/create-tasks.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MuiModule } from 'src/app/modules/mui/mui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    CreateTasksComponent,
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MuiModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ]
})
export class TasksModule { }
