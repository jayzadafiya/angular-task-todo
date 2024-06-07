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
  ],
  templateUrl: './tast-add.component.html',
  styleUrl: './tast-add.component.scss',
  providers: [TaskService],
})
export class TastAddComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  taskForm!: FormGroup;
  editMode: Boolean = false;
  displayedColumns: string[] = ['title', 'description', 'status'];

  task!: Task[];
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
    });

    this.subscription = this.taskService.getTop5Tasks().subscribe((data) => {
      this.task = data;
    });

    this.initForm();
  }

  private initForm() {
    if (this.editMode) {
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
    if (this.editMode) {
    } else {
      this.taskService
        .addTodo(this.taskForm.value)
        .subscribe((data) => console.log(data));

      this.initForm();
      this.router.navigate(['/task']);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
