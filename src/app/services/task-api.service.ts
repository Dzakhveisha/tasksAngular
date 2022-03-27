import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
// @ts-ignore
import {Observable} from "rxjs";
import {PlannedTask} from "../modelInterface/Task";

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  private readonly url = 'http://localhost:8080/api/v1/tasks';  // URL to web api for getting tasks
  private readonly statusParameter = '&status='
  private readonly userIdParameter = '&id='
  private readonly taskParameter = '&task='


  private readonly httpOptionsWithAuth = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")})
  };

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem("token")})
  };


  constructor(private http: HttpClient) {
  }

  getTasks(id: number): Observable<PlannedTask[]> {
    return this.http.get <PlannedTask[]>(this.url + '?' + this.userIdParameter + id, this.httpOptionsWithAuth);
  }

  getTasksByStatus(status: string, id: number) {
    return this.http.get <PlannedTask[]>(this.url + '?' + this.statusParameter + status
      + this.userIdParameter + id, this.httpOptionsWithAuth);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id.toString(10), this.httpOptionsWithAuth);
  }

  done(id: number): Observable<any> {
    return this.http.put(this.url + '/' + id.toString(10), "", this.httpOptionsWithAuth);
  }

  create(data: FormData, id: number): Observable<any> {
    return this.http.post(this.url  + '?' + this.userIdParameter + id,
      data, this.httpOptions);
  }

  getFile(id: number): Observable<Blob> {
    const headers = new HttpHeaders().set('authorization','Bearer '+ localStorage.getItem("token"));

    return this.http.get<Blob>(this.url + "/" + id + "/file",
    {headers, responseType: 'blob' as 'json'});
  }
}
