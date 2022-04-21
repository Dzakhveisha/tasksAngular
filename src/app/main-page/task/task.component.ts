import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlannedTask} from "../../modelInterface/Task";
import {TaskApiService} from "../../services/task-api.service";
import {TaskStatus} from "../../modelInterface/TaskStatus";

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
      status: 0,
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
      this.task.status= TaskStatus.DONE;
    });

  }

  isNotDone() {
    return this.task.status != TaskStatus.DONE;
  }

  downloadFile(){
    this.taskService.getFile(this.task.id)
      .subscribe(
        (response: any) =>{
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          if (this.task.fileName)
            downloadLink.setAttribute('download', this.task.fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }
      )
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
    }
  }
}
