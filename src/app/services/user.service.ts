import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import User from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl: string = "http://localhost:3000/users/";

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.baseUrl);
  }

  getUserById(id: string) {
    return this.http.get(this.baseUrl + id);
  }

  addUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + user._id, user);
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
