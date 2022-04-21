import {Component, OnInit} from '@angular/core';
import {TaskApiService} from "../services/task-api.service";
import {PlannedTask} from "../modelInterface/Task";
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  tasks: PlannedTask[] = [];
  status: string | null = null;

  constructor(private taskService: TaskApiService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          if (params['status'] != null) {
            this.status = params['status'];
            this.updateTasksByStatus(params['status']);
          } else {
            this.getAllTasks()
          }
        }
      );
  }

  getAllTasks() {
    this.taskService.getTasks()
      .subscribe((result: PlannedTask[]) => {
        this.tasks = result
      });
  }

  updateTasksByStatus(status: string) {
    this.taskService.getTasksByStatus(status)
      .subscribe((result: PlannedTask[]) =>
        this.tasks = result);
  }

  deleteTask(task: PlannedTask) {
    this.tasks.forEach((el, i) => {
      if (el.id == task.id) this.tasks.splice(i, 1)
    })
  }
}
