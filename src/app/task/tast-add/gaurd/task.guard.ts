import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TastAddComponent } from '../tast-add.component';

@Injectable({
  providedIn: 'root',
})
export class TaskGuard implements CanDeactivate<TastAddComponent> {
  constructor(private snackBar: MatSnackBar) {}

  canDeactivate(component: TastAddComponent): boolean {
    if (!component.taskForm.pristine) {
      this.snackBar.open('You have unsaved changes!', 'Close', {
        duration: 3000,
      });
      return false;
    }
    return true;
  }
}
