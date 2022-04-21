import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {CreateTaskFormComponent} from "./create-task-form/create-task-form.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'tasks', component: MainPageComponent},
  {path: 'tasks/new', component: CreateTaskFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
