import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { TastAddComponent } from './tast-add/tast-add.component';
import { TaskGuard } from './tast-add/gaurd/task.guard';

export const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
  },
  {
    path: 'task-add',
    component: TastAddComponent,
    canDeactivate: [TaskGuard],
  },
  {
    path: ':id',
    component: TastAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRouter {}
