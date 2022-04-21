import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TaskApiService} from "../services/task-api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.css']
})
export class CreateTaskFormComponent implements OnInit {

  newTaskForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    deadline: [null, Validators.required],
    file: [null],
    fileSource: [null],
    description: [null],
  });

  errorMessage: String = "";

  constructor(private fb: FormBuilder, private  taskService: TaskApiService, private router: Router) {
  }

  ngOnInit(): void {
  }


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newTaskForm.patchValue({
        fileSource: file
      });
    }
  }

  onFormChange() {
    if (this.newTaskForm.status == 'VALID') {
      this.errorMessage = "";
    } else {
      this.errorMessage = "Not enough data!";
    }
  }

  onSubmit() {
    if (this.newTaskForm.status == 'VALID') {
      const formData = new FormData();
      formData.append('name', this.newTaskForm.get('name')?.value);
      formData.append('deadline', this.newTaskForm.get('deadline')?.value);

      if (this.newTaskForm.get('description')?.value != null) {
        formData.append('description', this.newTaskForm.get('description')?.value);
      } else {
        formData.append('description', "");

      }

      if (this.newTaskForm.get('fileSource')?.value != null) {
        formData.append('file', this.newTaskForm.get('fileSource')?.value);
      } else {
        formData.append('file', new File([], ""));
      }
      this.createTask(formData)
    }
  }


  private createTask(formData: FormData) {
    this.taskService.create(formData, 1)
      .subscribe(
        {
          next: (newUser: Task) => {

          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = error.message;
          },
          complete: () => {
            this.router.navigate(['/tasks']);
          }
        }
      )
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
