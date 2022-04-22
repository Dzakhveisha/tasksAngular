import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
// @ts-ignore
import {map, Observable} from "rxjs";
import {PlannedTask} from "../modelInterface/Task";
import {Apollo, gql} from "apollo-angular";

const homePageQuery = gql
  `query{
    tasks{
        id
        name
        description
        deadline
        status
        fileName
    }
}`;

const getTaskByStatusQuery = gql
  `query($status: TaskStatus!) {
    tasksByStatus( status: $status){
        id
        name
        description
        deadline
        status
        fileName
    }
}`;

const createTaskMutation = gql
  `mutation($name: String!,
     $description: String,
     $deadline: String!) {
    createTask( name: $name, deadline: $deadline,
    description: $description){
        id
        name
        description
        deadline
        status
        fileName
    }
}`;

const deleteTaskMutation = gql
  `mutation deleteTask($id: ID!) {
    deleteTask( id: $id){
        id
        name
        description
        deadline
        status
        fileName
    }
}`;

const doneTaskMutation = gql
  `mutation doneTask($id: ID!) {
    doneTask( id: $id){
        id
        status
    }
}`;

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  private readonly url = 'http://localhost:8080/tasks';  // URL to web api for getting tasks

  private readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private apollo: Apollo) {
  }

  getTasks(): Observable<PlannedTask[]> {
    return this.apollo
      .watchQuery({query: homePageQuery})
      .valueChanges
      // @ts-ignore
      .pipe(map(result => result['data']['tasks']));
  }

  getTasksByStatus(status: string) {
    return this.apollo
      .watchQuery({query: getTaskByStatusQuery, variables: {status: status}})
      .valueChanges
      // @ts-ignore
      .pipe(map(result => result['data']['tasksByStatus']));
  }

  delete(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: deleteTaskMutation, variables:
        {id: id}
    })
      // @ts-ignore
      .pipe(map(result => result['data']['deleteTask']));
  }

  done(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: doneTaskMutation, variables:
        {id: id}
    })
      // @ts-ignore
      .pipe(map(result => result['data']['doneTask']));
  }

  create(data: FormData): Observable<any> {
    return this.apollo.mutate({
      mutation: createTaskMutation, variables: {
        name: data.get("name"),
        description: data.get("description"), deadline: data.get("deadline"), filename: data.get("file")
      }
    })
      // @ts-ignore
      .pipe(map(result => result['data']['createTask']));
  }

  uploadFile(id: number, data: FormData): Observable<any> {
    return this.http.post(this.url + '/' + id.toString(10) + '/file', data);
  }

  getFile(id: number): Observable<Blob> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem("token"));

    return this.http.get<Blob>(this.url + "/" + id + "/file",
      {headers, responseType: 'blob' as 'json'});
  }
}
