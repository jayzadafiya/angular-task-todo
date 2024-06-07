import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { TastAddComponent } from './tast-add/tast-add.component';

export const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
  },
  {
    path: 'task-add',
    component: TastAddComponent,
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
