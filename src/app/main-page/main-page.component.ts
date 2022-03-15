import {Component, OnInit} from '@angular/core';
import {TaskApiService} from "../services/task-api.service";
import {PlannedTask} from "../model/Task";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  tasks: PlannedTask[] = [];

  constructor(private taskService: TaskApiService) {
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getTasks()
      .subscribe((result: PlannedTask[]) =>
        this.tasks = result);
  }

  updateTasksByStatus(status: string){
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
