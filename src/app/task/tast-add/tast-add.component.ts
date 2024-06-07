import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../task.model';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-tast-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './tast-add.component.html',
  styleUrl: './tast-add.component.scss',
  providers: [TaskService],
})
export class TastAddComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  taskForm!: FormGroup;
  editMode: Boolean = false;
  taskId!: string;
  displayedColumns: string[] = ['title', 'description', 'status'];
  task!: Task[];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params['id'];
      this.editMode = params['id'] != null;
    });

    if (!this.editMode) {
      const getSubscription = this.taskService
        .getTop5Tasks()
        .subscribe((data) => {
          if (data) {
            this.task = data;
          }
        });
      this.subscriptions.push(getSubscription);
    }

    this.initForm();
  }

  private initForm() {
    if (this.editMode) {
      const editSubsription = this.taskService
        .getTaskById(this.taskId)
        .subscribe((task) => {
          if (task) {
            this.taskForm = this.fb.group(
              {
                title: [task.title, Validators.required],
                description: [task.description, Validators.required],
                status: [task.status, Validators.required],
              },
              {
                updateOn: 'blur',
              }
            );
          }

          // this.taskForm.(task);
          this.subscriptions.push(editSubsription);
        });
    } else {
      this.taskForm = this.fb.group(
        {
          title: ['', Validators.required],
          description: ['', Validators.required],
          status: ['', Validators.required],
        },
        {
          updateOn: 'blur',
        }
      );
    }
  }

  onSubmit() {
    let submitSubscription: Subscription;
    if (this.editMode) {
      submitSubscription = this.taskService
        .editTask(this.taskId, this.taskForm.value)
        .subscribe((data) => data && this.router.navigate(['/task']));
    } else {
      submitSubscription = this.taskService
        .addTodo(this.taskForm.value)
        .subscribe((data) => {
          if (data) {
            this.initForm();
            this.router.navigate(['/task']);
          }
        });
    }
    this.subscriptions.push(submitSubscription);
  }

  reset() {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  }
}
