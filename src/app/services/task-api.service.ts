import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import {Observable} from "rxjs";
import {PlannedTask} from "../model/Task";

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  private readonly url = 'http://localhost:8080/tasks';  // URL to web api for getting tasks
  private  readonly statusParamenter = '&status='

  constructor(private http: HttpClient) { }

  getTasks(): Observable<PlannedTask[]> {
    return this.http.get <PlannedTask[]>(this.url);
  }

  getTasksByStatus(status: string) {
    return this.http.get <PlannedTask[]>(this.url + '?' + this.statusParamenter + status);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.url + '/' + id.toString(10));
  }


  done(id: number): Observable<any> {
    return this.http.put(this.url + '/' + id.toString(10), "");
  }
}
