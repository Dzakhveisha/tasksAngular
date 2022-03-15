import {Component, Input, OnInit} from '@angular/core';
import {PlannedTask} from "../../model/Task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  task: PlannedTask;


  constructor() {
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
}
