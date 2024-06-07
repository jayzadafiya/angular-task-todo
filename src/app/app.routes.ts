import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TastAddComponent } from './task/tast-add/tast-add.component';

export const routes: Routes = [
  {
    path: 'task',
    loadChildren: () => import('./task/task.route').then(m => m.TaskRouter),
  },
  {
    path:'',redirectTo:"task", pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouter {}
