import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListUserComponent } from "./user/list-user/list-user.component";
import { EditUserComponent } from "./user/edit-user/edit-user.component";
import { AddUserComponent } from "./user/add-user/add-user.component";

const routes: Routes = [
  {
    path: "users",
    component: ListUserComponent,
  },
  {
    path: "add-user",
    component: AddUserComponent,
  },
  {
    path: "user/:id",
    component: EditUserComponent,
  },
  {
    path: "",
    redirectTo: "/users",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
