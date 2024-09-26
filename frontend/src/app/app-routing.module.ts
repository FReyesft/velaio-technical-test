import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateTasksComponent } from './pages/tasks/components/create-tasks/create-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: CreateTasksComponent
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./pages/tasks/tasks.module').then((m) => m.TasksModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
