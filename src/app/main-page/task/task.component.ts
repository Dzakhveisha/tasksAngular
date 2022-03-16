import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlannedTask} from "../../model/Task";
import {TaskApiService} from "../../services/task-api.service";
import {TaskStatus} from "../../model/TaskStatus";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  task: PlannedTask;

  @Output()
  deleteTaskEvent = new EventEmitter<PlannedTask>();

  constructor(private taskService: TaskApiService) {
    this.task = {
      id: 0,
      name: "",
      fileName: "",
      description: "",
      deadline: "",
      statusId: 0,
    }
  }

  ngOnInit(): void {
  }

  hasFile(): boolean {
    return this.task.fileName != null
  }

  delete() {
    this.taskService.delete(this.task.id).subscribe(() => {
      this.deleteTaskEvent.emit(this.task);
    });

  }

  done() {
    this.taskService.done(this.task.id).subscribe(() => {
      this.task.statusId = TaskStatus.DONE;
    });

  }

  isNotDone() {
    return this.task.statusId != TaskStatus.DONE;
  }

  getStatusName(status: TaskStatus): String {
    return TaskStatus[status];
  }
}
