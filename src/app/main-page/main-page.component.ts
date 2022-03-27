import {Component, OnInit} from '@angular/core';
import {TaskApiService} from "../services/task-api.service";
import {PlannedTask} from "../modelInterface/Task";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../modelInterface/User";
import {AuthService} from "../services/auth-service.service";
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  tasks: PlannedTask[] = [];
  status: string | null = null;

  constructor(private taskService: TaskApiService, private userService: AuthService,
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
    let rawToken = localStorage.getItem("token")
    if (rawToken !== null) {
      const helper = new JwtHelperService();
      if (helper.isTokenExpired(rawToken)) {
        this.router.navigate(['/login']);
      } else {
        var decodedToken = helper.decodeToken(rawToken);
        const name = decodedToken.sub;
        this.userService.getUserByName(name).subscribe((user: User) => {
          if (user.id != null) {
            this.taskService.getTasks(user.id)
              .subscribe((result: PlannedTask[]) =>
                this.tasks = result);
          } else {
            this.router.navigate(['/login']);
          }
        })
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateTasksByStatus(status: string) {
    let rawToken = localStorage.getItem("token")
    if (rawToken !== null) {
      const helper = new JwtHelperService();
      if (helper.isTokenExpired(rawToken)) {
        this.router.navigate(['/login']);
      } else {
        var decodedToken = helper.decodeToken(rawToken);
        const name = decodedToken.sub;
        this.userService.getUserByName(name).subscribe((user: User) => {
          if (user.id != null) {
            this.taskService.getTasksByStatus(status, user.id)
              .subscribe((result: PlannedTask[]) =>
                this.tasks = result);
          } else {
            this.router.navigate(['/login']);
          }
        })
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  deleteTask(task: PlannedTask) {
    this.tasks.forEach((el, i) => {
      if (el.id == task.id) this.tasks.splice(i, 1)
    })
  }
}
